import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";

export async function uploadUserAvatar(file) {
    if (!auth.currentUser) throw new Error("Not logged in");

    //basic client-side verificaiton
    if (!file || !file.type.startsWith("image/")) {
        throw new Error("Please choose an image file");
    }

    if (file.size> 2 * 1024 * 1024) {
        throw new Error("image toolarge (max 2MB)");
    }

    const uid = auth.currentUser.uid;
    const objectPath = `avatars/${uid}/profile.jpg`;
    const storageRef = ref(storage, objectPath);

    //Upload with progress (resumable)
    const task = uploadBytesResumable(storageRef, file);

    await new Promise((resolve, reject) => {
        task.on(
            "state_changed",
            // progress => you can read task.snapshot.bytesTransferred / totalBytes
            null,
            reject,
            resolve
        );
    });

    const photoURL = await getDownloadURL(storageRef);

    //Link to Firebase Auth profile
    await updateProfile(auth.currentUser, { photoURL });

    return photoURL;
}