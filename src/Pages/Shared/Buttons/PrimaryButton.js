import React from "react";

const PrimaryButton = (props) => {
  return (
    <button
      className="btn btn-primary uppercase font-bold text-white bg-gradient-to-r from-secondary to-primary"
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
