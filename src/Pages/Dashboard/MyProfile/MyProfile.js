import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthProvider";
import uploadImageToImbbAndGetLink from "../../../utils/uploadImageToImbbAndGetLink";
import ChangePasswordModal from "./ChangePasswordModal";

const MyProfile = () => {
  const { user, userUpdateProfile, setRunThisComponentAgain } =
    useContext(AuthContext);
  const [wait, setWait] = useState(false);

  const handleProfileUpdate = async (e) => {
    setWait(true);
    // Preventing Reload
    e.preventDefault();

    // Get Value from Form
    let updatedName = e.target.name.value;
    let updatedPhoto = e.target.photo.files[0];
    let updatedPhotoURL = "";

    // Check If the input field is empty or not if then set previous value
    if (updatedName.trim().length === 0) {
      updatedName = user?.displayName;
    }
    if (!updatedPhoto) {
      updatedPhotoURL = user?.photoURL;
    } else {
      updatedPhotoURL = await uploadImageToImbbAndGetLink(updatedPhoto);
    }

    // Send data to firebase
    userUpdateProfile({ displayName: updatedName, photoURL: updatedPhotoURL })
      .then(() => {
        toast.success("Profile successfully updated!");
        setRunThisComponentAgain((pre) => !pre);
        setWait(false);
      })
      .catch((error) => {
        setWait(false);
        toast.error(error.message);
      });
  };

  return (
    <section>
      <h2 className="my-3 text-2xl px-3">My Profile</h2>
      <div className="flex items-center flex-col lg:flex-row px-5">
        <img
          src={user?.photoURL}
          className="max-w-sm rounded-full ring ring-primary shadow-2xl"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
          alt="profile"
        />
        <div className="w-full px-5">
          <form className="w-full ml-5" onSubmit={handleProfileUpdate}>
            {/* Email */}
            <div className="">
              <label className="label">
                <span className="label-text">
                  Your Email (Email Can not be changed)
                </span>
              </label>
              <input
                type="text"
                value={user?.email}
                disabled
                placeholder="email"
                className="input input-bordered w-full"
              />
            </div>
            {/* Name */}
            <div className=" ">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                className="input input-bordered w-full"
              />
            </div>
            {/* Photo */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Chose New Profile Photo (PNG, JPG or JPEG)
                </span>
              </label>
              <input
                type="file"
                name="photo"
                placeholder="Select Your Profile Picture"
                className="file-input file-input-bordered w-full"
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                {wait ? "Please Wait..." : "Update Profile"}
              </button>
            </div>
          </form>
          <div className="">
            <div className="form-control mt-4 ml-5 w-full">
              <label
                htmlFor="change-password-modal"
                className="btn btn-secondary"
              >
                Change Password
              </label>
            </div>
          </div>
        </div>
        <ChangePasswordModal />
      </div>
    </section>
  );
};

export default MyProfile;
