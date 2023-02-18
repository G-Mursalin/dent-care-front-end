import React from "react";

const ConfirmationModal = ({
  title,
  message,
  handleCloseModal,
  modalData,
  successAction,
}) => {
  return (
    <div>
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              onClick={() => successAction(modalData)}
              htmlFor="confirm-modal"
              className="btn"
            >
              Yes
            </label>
            <label
              onClick={handleCloseModal}
              className="btn btn-outline btn-success"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
