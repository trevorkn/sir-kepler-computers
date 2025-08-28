export default function UserAvator({ user }) {
    const initial = user?.displayName ? user.displayName.charAt(0).toUpperCase() : "?";

    return (
        <div className="flex flex-col items-center">
            {user?.photoURL ? (
                <img
                src={user.photoURL}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
                />
            ) : (
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg font-bold">
                    {initial}
                    </div>
            )}
            <span className="mt-2 text-sm font-medium text-gray-800">
                {user?.displayName || "Guest"}
            </span>
        </div>
    );
}