import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore"; // Import Zustand store

const Profile = () => {
  const { authUser, updateUser } = useAuthStore(); // Get user & update function from Zustand
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  // Set initial values when component mounts
  useEffect(() => {
    if (authUser) {
      setName(authUser.name || "");
      setUsername(authUser.username || "");
    }
  }, [authUser]);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent form reload

    const res = await updateUser(name, username);
    if (res.success) {
      setMessage("✅ Profile updated successfully!");
    } else {
      setMessage("❌ Update failed. Try again.");
    }
  };

  if (!authUser) {
    return (
      <div className="text-center text-lg mt-10">
        🔒 Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-md mt-28 mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Profile
      </h2>

      <div className="mt-4">
        <p className="text-gray-700 font-medium">
          <strong>Email:</strong> {authUser.email}
        </p>
      </div>

      {/* Update Form */}
      <form onSubmit={handleUpdate} className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Name:
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Username:
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-300"
        >
          Update Profile
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center font-semibold ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Profile;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import { useAuthStore } from "../../store/useAuthStore";
// import { ChangePassword } from "./ChangePassword";
// const Profile = () => {
//   const { authUser, updateProfile } = useAuthStore();
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedImg, setSelectedImg] = useState(null);
//   const [profileData, setProfileData] = useState({
//     name: authUser?.data?.name || "",
//     email: authUser?.data?.email || "",
//   });

//   // get file from user to upload file
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       const base64Image = reader.result;
//       setSelectedImg(base64Image);
//       // await updateProfile({ profilePic: base64Image });
//     };
//   };

//   // const handleEdit = async (e) => {
//   //   setIsEditing(true);
//   //   await updateProfile({ name: name, email: email });
//   // };

//   const handleChange = (e) => {
//     setProfileData({
//       ...profileData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handlePasswordChange = () => {
//     console.log("Changing password...");
//   };

//   const handleUpdateProfile = async (e) => {
//     // updateProfile(profileData);
//     await updateProfile({ name: profileData.name, email: profileData.email });
//     setIsEditing(false);
//   };

//   return (
//     <div className="pt-16">
//       <div className="min-h-screen flex flex-col items-center py-6 bg-gray-100">
//         <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 space-y-6">
//           {/* Centered User Profile Heading */}
//           <h2 className="text-2xl font-bold text-gray-800 text-center">
//             User Profile
//           </h2>

//           {/* Profile Section */}
//           {/* <div className="flex items-center gap-4">
//             <div className="flex justify-center items-center bg-blue-500 text-white p-3 rounded-full w-16 h-16">
//               <FaUser size={30} />
//             </div>
//             <div className="flex flex-col">
//               <h2 className="text-2xl font-semibold">{authUser?.data?.name}</h2>
//               <span className="text-sm text-gray-500">
//                 {authUser?.data?.email}
//               </span>
//             </div>
//           </div> */}

//           {/* Profile Section */}
//           <div className="flex items-center gap-4">
//             <label htmlFor="profile-upload" className="cursor-pointer">
//               {selectedImg ? (
//                 <img
//                   src={selectedImg}
//                   alt="Profile"
//                   className="w-16 h-16 rounded-full object-cover"
//                 />
//               ) : (
//                 <div className="flex justify-center items-center bg-blue-500 text-white p-3 rounded-full w-16 h-16">
//                   <FaUser size={30} />
//                 </div>
//               )}
//             </label>
//             <input
//               type="file"
//               id="profile-upload"
//               className="hidden"
//               accept="image/*"
//               onChange={handleImageUpload}
//             />

//             <div className="flex flex-col">
//               <h2 className="text-2xl font-semibold">{authUser?.data?.name}</h2>
//               <span className="text-sm text-gray-500">
//                 {authUser?.data?.email}
//               </span>
//             </div>
//           </div>

//           {/* Name & Email Edit Form */}
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={profileData.name}
//                 onChange={handleChange}
//                 className="input input-bordered w-full mt-2 text-white placeholder-white bg-gray-800"
//                 placeholder="Enter your name"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={profileData.email}
//                 onChange={handleChange}
//                 className="input input-bordered w-full mt-2 text-white placeholder-white bg-gray-800"
//                 placeholder="Enter your email"
//                 disabled={!isEditing}
//               />
//             </div>
//           </div>

//           {/* Edit Button */}
//           {!isEditing && (
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="btn btn-secondary"
//               >
//                 Edit Profile
//               </button>
//             </div>
//           )}

//           {/* Account Information */}
//           <div className="p-4 bg-gray-50 rounded-lg border mt-6">
//             <h3 className="font-semibold text-lg mb-4">Account Information</h3>
//             <div className="space-y-2">
//               <div className="flex justify-between items-center border-b border-gray-300 py-2">
//                 <span className="font-medium">Date of Creation: </span>
//                 <span className="text-gray-600 text-right w-full">
//                   {authUser?.data?.createdAt || "N/A"}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center border-b border-gray-300 py-2">
//                 <span className="font-medium">Account Status: </span>
//                 <span className="text-gray-600 text-right w-full">
//                   {authUser?.data?.isActive ? "Active" : "Inactive"}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center border-b border-gray-300 py-2">
//                 <span className="font-medium">Email Verified: </span>
//                 <span className="text-gray-600 text-right w-full">
//                   {authUser?.data?.isEmailVerified
//                     ? "Verified"
//                     : "Not Verified"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Save Changes Button */}
//           {isEditing && (
//             <div className="flex justify-end mt-6">
//               <button onClick={handleUpdateProfile} className="btn btn-primary">
//                 Save Changes
//               </button>
//             </div>
//           )}

//           {/* Change Password Button */}
//           <div>
//             <Link to="/profile/change_password">
//               <button
//                 className="w-full btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
//                 onClick={handlePasswordChange}
//               >
//                 Change Password
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
