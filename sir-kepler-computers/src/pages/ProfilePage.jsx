import { useState } from "react";
import { Pencil, X, Check, Trash2 } from "lucide-react";
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  // 🔹 Show clearer message if no user (not just loading)
  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-lg font-semibold">You are not logged in.</p>
        <a
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Login
        </a>
      </div>
    );
  }

  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    photoURL: user.photoURL || "", // 🔹 Track photoURL locally
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Save updates (name & password only now)
  const handleSave = async (field) => {
    setLoading(true);
    try {
      if (field === "displayName") {
        await updateProfile(auth.currentUser, { displayName: formData.displayName });
        await updateDoc(doc(db, "users", user.uid), {
          displayName: formData.displayName,
        });
      }

      if (field === "password") {
        if (!formData.currentPassword) throw new Error("Enter current password");
        if (formData.newPassword.length < 6) {
          throw new Error("Password must be at least 6 characters long"); // ✅ Password validation
        }
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          formData.currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);

        await updatePassword(auth.currentUser, formData.newPassword);
      }

      alert("Profile updated successfully ✅");
      setEditingField(null);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  // 🔹 Upload profile picture
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const storageRef = ref(storage, `avatars/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      await updateDoc(doc(db, "users", user.uid), { photoURL: downloadURL });

      // ✅ Avoid full page reload - just update state
      setFormData((prev) => ({ ...prev, photoURL: downloadURL }));

      alert("Profile picture updated ✅");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  // 🔹 Delete Account
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This will permanently delete your account.")) return;

    setLoading(true);
    try {
      const avatarRef = ref(storage, `avatars/${user.uid}/profile.jpg`);
      try {
        await deleteObject(avatarRef);
      } catch (_) {
        // ignore if not exists
      }

      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(auth.currentUser);

      alert("Your account has been deleted permanently.");
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        alert("Please log in again and retry deleting your account.");
      } else {
        alert(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        {formData.photoURL ? ( // ✅ Use local state instead of user.photoURL
          <img
            src={formData.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold">
            {user.displayName?.charAt(0).toUpperCase()}
          </div>
        )}

        <label className="mt-3 text-sm text-blue-600 hover:underline cursor-pointer">
          Change Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </label>
      </div>

      {/* Name */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Name:</span>
          {editingField === "displayName" ? (
            <div className="flex gap-2">
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm"
              />
              <button
                onClick={() => handleSave("displayName")}
                disabled={loading}
                className="text-green-600"
              >
                <Check size={18} />
              </button>
              <button onClick={() => setEditingField(null)} className="text-red-600">
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <span>{user.displayName}</span>
              <button onClick={() => setEditingField("displayName")}>
                <Pencil size={18} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Email:</span>
          <div className="flex gap-3 items-center">
            <span>{user.email}</span>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Password:</span>
          {editingField === "password" ? (
            <div className="flex flex-col gap-2 w-full max-w-sm">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password (min 6 chars)"
                value={formData.newPassword}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => handleSave("password")}
                  disabled={loading}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingField(null)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <span>********</span>
              <button onClick={() => setEditingField("password")}>
                <Pencil size={18} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={handleDeleteAccount}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <Trash2 size={18} />
          Delete Account
        </button>
      </div>
    </div>
  );
}
