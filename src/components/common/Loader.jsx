import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue bg-opacity-50 z-50">
      <span className="loading loading-spinner loading-lg "></span>
    </div>
  );
};

export default Loader;
