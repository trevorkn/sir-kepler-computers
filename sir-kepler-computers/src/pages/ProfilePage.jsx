import { useState, useEffect } from "react";
import { Pencil, X, Check, Trash2 } from "lucide-react";
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { useRef } from "react";
import { countiesAndTowns } from "../data/locations";

export default function ProfilePage() {
  const { user } = useAuth();
  const recaptchaVerifierRef = useRef(null);

  
  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    photoURL: user?.photoURL || "", // 🔹 Track photoURL locally
    mobile: user?.mobile || "",
    isMobileVerified: false,

    addresses: [],
    newCounty: "",
    newTown: "",
    newDetails: "",
  });

   const [otpCode, setOtpCode] = useState("");  //Track OTP input
   const [confirmationResult, setConfirmationResult] = useState(null);  // Store firebase confirmation
   const [otpStep, setOtpStep] = useState(false);  //Control showing OTP input UI.


    useEffect (() => {
    const fetchUserData = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        
        setFormData((prev) => ({
          ...prev,
          displayName: userData.displayName || user.displayName || "",
          photoURL: userData.photoURL || user.photoURL || "",
          mobile: userData.mobile || "",
          isMobileVerified: userData.isMobileVerified ?? false,

          addresses: userData.addresses || [],
        }));
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  fetchUserData();
  
}, [user]);

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

      if (field === "mobile") {
        await updateDoc(doc(db, "users", user.uid), {
          mobile: formData.mobile,
          isMobileVerified: false, // reset verification when changing
        });

    // Update UI immediately without re-fetching from Firestore
        setFormData((prev) => ({
          ...prev,
          mobile: formData.mobile,
          isMobileVerified: false, // reset verification state locally too
        }));

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

      // Avoid full page reload: just update the state
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

    setDeleteLoading(true);
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
    setDeleteLoading(false);
  };


        // set up reCAPTCHA and send OTP
    const handleVerifyPhone = async () => {
      if (formData.isMobileVerified) return; // already verified, do nothing.
     
      try {
         setVerifyLoading(true);

         if (!recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
              size: "normal",
              callback: (response) => console.log("reCAPTCHA solved !!", response),
              "expired-callback": () => alert("reCAPTCHA expired. Please try again."),
            });
            await recaptchaVerifierRef.current.render();
           }

         const result = await signInWithPhoneNumber(
          auth,
          formData.mobile,
          recaptchaVerifierRef.current
         );

         setConfirmationResult(result);
         setOtpStep(true);  //show OTP input
         alert(`OTP sent to ${formData.mobile}`);
        }catch (err) {
          alert(`Error sending OTP: ${err.message}`);
        } finally {
          setVerifyLoading(false);
        }
        };

        // * Confirm OTP

        const handleConfirmOtp = async () => {
          if (!otpCode) return alert("Enter the OTP first.");
          try {
            setLoading(true);
            await confirmationResult.confirm(otpCode);
            await updateDoc(doc(db, "users", user.uid), { isMobileVerified: true });

            setFormData((prev) => ({ ...prev, isMobileVerified: true }))
            setOtpStep(false);
            setOtpCode("");
            alert("Phone number verified successfully");
          } catch (err) {
            alert("Invalid OTP. Please try again.")
          } finally {
            setLoading(false);
          }
        };

        // * Address Management
        
        const handleAddAddress = async () => {
          if (!formData.newCounty || !formData.newTown || !formData.newDetails) {
            return alert("Please fill in all address fields.");
          }

          const newAddress = {
            county: formData.newCounty,
            town: formData.newTown,
            details: formData.newDetails,
          };

          try {
            const updateAddressess = [...formData.addresses, newAddress];

            await updateDoc(doc(db, "users", user.uid), {
              addresses: updateAddressess,
            })

            setFormData((prev) => ({
              ...prev,
              addresses: updateAddressess,
              newCounty: "",
              newTown: "",
              newDetails: "",
            }));

            setEditingField(null);
            alert("Address added successfully ✅");
          } catch (err) {
            alert(err.message);
          }
        }

        const handleDeleteAddress = async (index) => {
          const updated = formData.addresses.filter((_, i) => i !== index);

          try {
            await updateDoc(doc(db, "users", user.uid), {
               addresses: updated,
            });

            setFormData((prev) => ({ ...prev, addresses: updated }));
            alert("Address deleted successfully ✅");
          } catch (err) {
            alert(err.message); 
          }
        }


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
              <span>{formData.displayName || "Not set"}</span>
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

        {/* Phone Number */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Phone Number:</span>
            {editingField === "mobile" ? (
              <div className="flex gap-2 items-center">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+254712345678"
                  className="border rounded px-2 py-1 text-sm"
                />
                <button
                  onClick={() => handleSave("mobile")}
                  disabled={loading}
                  className="text-green-600"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={() => setEditingField(null)}
                  className="text-red-600"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex gap-3 items-center">
                  <span>{formData.mobile || "Not set"}</span>
                  <button onClick={() => setEditingField("mobile")}>
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>

                  {!formData.isMobileVerified && formData.mobile && (
                    <button
                      onClick={handleVerifyPhone}
                      disabled={verifyLoading || !/^\+254\d{9}$/.test(formData.mobile)}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                    >
                      {verifyLoading ? "Sending..." : "Verify"}
                    </button>
                  )}

                  {formData.mobile && formData.isMobileVerified && (
                    <span className="text-green-600 text-sm font-semibold">
                      ✅ Verified
                    </span>
                  )}
                </div>

                {/* OTP Input Step */}
                {otpStep && (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter OTP"
                      className="border rounded px-2 py-1 text-sm w-32"
                    />
                    <button
                      onClick={handleConfirmOtp}
                      disabled={loading || otpCode.length === 0}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? "Verifying..." : "Submit OTP"}
                    </button>
                  </div>
                )}
              </div>
            )}
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
          disabled={deleteLoading}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <Trash2 size={18} />
          {deleteLoading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
      <div id="recaptcha-container"></div>

      <div className="pt-12">
  <div className="border p-6 rounded-lg">
    <p className="text-lg font-semibold mb-4">Shipping Addresses</p>

    {/* Existing Saved Addresses */}
    {formData.addresses.length > 0 ? (
      <ul className="mb-4">
        {formData.addresses.map((addr, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-medium">
                {addr.county} - {addr.town}
              </p>
              <p className="text-sm text-gray-600">{addr.details}</p>
            </div>

            <button
              className="text-red-600"
              onClick={() => handleDeleteAddress(index)}
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-600 mb-4">No addresses added yet.</p>
    )}

    {/* Add Button */}
    {editingField !== "newAddress" && (
      <button
        onClick={() => setEditingField("newAddress")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Address
      </button>
    )}

    {/* Add Address Form */}
    {editingField === "newAddress" && (
      <div className="flex flex-col gap-3 mt-4">
        
        <select
  value={formData.newCounty}
  onChange={(e) => {
    const county = e.target.value;
    setFormData({
      ...formData,
      newCounty: county,
      newTown: "",   // reset town when county changes
    });
  }}
  className="border rounded px-2 py-1 text-sm"
>
  <option value="">Select County</option>
  {Object.keys(countiesAndTowns).map((county) => (
    <option key={county} value={county}>{county}</option>
  ))}
</select>


        <select
  value={formData.newTown}
  onChange={(e) =>
    setFormData({ ...formData, newTown: e.target.value })
  }
  className="border rounded px-2 py-1 text-sm"
  disabled={!formData.newCounty}
>
  <option value="">Select Town</option>

  {formData.newCounty &&
    countiesAndTowns[formData.newCounty].map((town) => (
      <option key={town} value={town}>{town}</option>
    ))
  }
</select>

        <input
          type="text"
          placeholder="Address Details (Estate, Building, House No...)"
          value={formData.newDetails}
          onChange={(e) => setFormData({ ...formData, newDetails: e.target.value })}
          className="border rounded px-2 py-1 text-sm"
        />

        <div className="flex gap-3">
          <button
            onClick={handleAddAddress}
            className="px-3 py-1 bg-green-600 text-white rounded"
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
    )}
  </div>
</div>
    </div>
  );
}
