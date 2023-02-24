import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthProvider";

const ChangePasswordModal = () => {
  const [newPassword, setNewPassword] = useState("");
  const { changePassword } = useContext(AuthContext);

  // Handle Password Change
  const handlePasswordChange = () => {
    // Send Date to Firebase for Changing Current Password
    changePassword(newPassword)
      .then(() => {
        toast.success("Password Changed Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setNewPassword("");
  };

  return (
    <div>
      <input
        type="checkbox"
        id="change-password-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Enter Your New Password</h3>
          <div>
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Password must be 6 characters or longer"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <label
              onClick={handlePasswordChange}
              htmlFor="change-password-modal"
              className="btn"
            >
              Confirm
            </label>
            <label
              htmlFor="change-password-modal"
              onChange={(e) => setNewPassword("")}
              className="btn"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
