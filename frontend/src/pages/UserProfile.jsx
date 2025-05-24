import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../components/UserContext";

export default function UserProfile() {
  const { id } = useParams();
  const { user: currentUser } = useUser();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [profileUser, setProfileUser] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedAvatar, setUpdatedAvatar] = useState("");

  const fetchUsersReviews = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/users/${id}/reviews`);
      const data = await res.json();
      if (res.ok) setUserReviews(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const userRes = await fetch(`${apiUrl}/api/users/${id}`);
      if (!userRes.ok) throw new Error("Failed to fetch user data.");
      const userData = await userRes.json();
      setProfileUser(userData);
      setUpdatedName(userData.name || "");
      setUpdatedEmail(userData.email || "");
      setUpdatedAvatar(userData.avatar || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedName,
          email: updatedEmail,
          avatar: updatedAvatar,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile.");
      setProfileUser(data);
      setEditMode(false);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUsersReviews();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!profileUser) return <div className="p-6 text-center text-gray-500">User not found.</div>;

  const isCurrentUser = currentUser && currentUser._id === id;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={profileUser.avatar || "/default-avatar.png"}
          alt={profileUser.name}
          className="w-32 h-32 rounded-full object-cover border"
        />

        <div className="flex-1 text-center md:text-left space-y-2">
          {editMode ? (
            <>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                placeholder="Name"
                className="border rounded px-3 py-1 w-full md:w-2/3"
              />
              <input
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                placeholder="Email"
                className="border rounded px-3 py-1 w-full md:w-2/3"
              />
              <input
                type="text"
                value={updatedAvatar}
                onChange={(e) => setUpdatedAvatar(e.target.value)}
                placeholder="Avatar URL"
                className="border rounded px-3 py-1 w-full md:w-2/3"
              />
              <div className="space-x-2 mt-2">
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold">{profileUser.name || "Unnamed User"}</h2>
              <p className="text-gray-600"><strong>Email:</strong> {profileUser.email || "N/A"}</p>
              <p className="text-gray-500 text-sm"><strong>User ID:</strong> {profileUser._id}</p>

              {isCurrentUser && (
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* User Reviews */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-2xl font-semibold mb-4">Reviews by {profileUser.name || "this user"}</h3>
        {userReviews.length === 0 ? (
          <p className="text-gray-600">No reviews written yet.</p>
        ) : (
          <div className="space-y-4">
            {userReviews.map((rev, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm">
                <div className="text-yellow-500 text-lg mb-1">
                  {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                </div>
                <p className="text-gray-800 mb-2">{rev.comment}</p>
                <p className="text-sm text-gray-500">
                  <strong>Book:</strong> {rev.book?.title || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}





