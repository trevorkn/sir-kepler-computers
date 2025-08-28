// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FiPlus } from 'react-icons/fi';


export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const navigate = useNavigate();

   const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); // preview image
    }; 

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

            let photoURL = null;

            //Upload avatar if exists
            if (avatarFile) {
              const storageRef = ref(storage, `avatars/${user.uid}/profile.jpg`);
              await uploadBytes(storageRef, avatarFile);
              photoURL = await getDownloadURL(storageRef);
            }

            //Update displayName and photoURL
            await updateProfile(user, {
              displayName: name,
              photoURL: photoURL || null,
            });

        //AuthContext will automatically pick up the new user
        navigate('/store'); // redirect after successful registration
    } catch (err) {
        console.error(err.message);
        setError(err.message); // show Firebase error (like email already in use) 
    }
    };
    

    const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 font-sofia" style={{color: '#00027B'}}>
          Create an Account
        </h1>

        {/* Avatar Circle */}
        <div className='flex justify-center mb-6 relative'>
          <div className='w-20 h-20 rounded-full bg-blue-600 text-white text-3xl flex items-center justify-center'>
            {avatarPreview ? (
            <img src={avatarPreview} alt="avatar" className='w-full h-full rounded-full object-cover' />
            ):( initial
            )}
          </div>
          <label className='absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer border border-gray-300'>
            <FiPlus className='text-blue-600' />
            <input type="file" accept='image/*' onChange={handleAvatarChange} className='hidden' />
          </label>
        </div>

        { /* Error message */}
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white p-3 rounded-md font-semibold hover:bg-blue-800 transition"
            disabled={!email || !password || !name}
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
