import React from 'react';
import { uploadUserAvatar } from "../lib/uploadAvatar";

export default function ProfilePictureUpload() {
    const [file, setFIle ] = React.useState(null);
    const [preview, setPreview] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");

    function onPick(e) {
        const f = e.target.files?.[0];
        setFIle(f || null);
        setSuccess("");
        setError("");
        if (f) setPreview(URL.createObjectURL(f));
        else setPreview(null);
    }

    async function onUpload() {
        if(!file) return;
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const url = await uploadUserAvatar(file);
            setSuccess("profile picture updated!");
            //revoke preview URL to free memory
            if (preview) URL.revokeObjectURL(preview);
            setPreview(null);
            setFIle(null);
            // Refresh of Auth context
        } catch (e) {
            setError(e.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='space-y-3'>
            <input type="file" accept="image/*" onChange={onPick} />
            {preview && (
                <img
                src={preview}
                alt='preview'
                className='w-24 h-24 rounded-full object-cover'
                />
            )}
            <button
                disabled={!file || loading}
                onClick={onUpload}
                className='px-4 py-rounded bg-blue-600 text-white disabled:opacity-50'
                >
                    {loading ? "uploading..." : "uploading"}
                </button>
                {error && <p className='text-red-600 text-sm'>{error}</p>}
                {success && <p className='text-green-700 text-sm'>{success}</p>}
        </div>
    )
}