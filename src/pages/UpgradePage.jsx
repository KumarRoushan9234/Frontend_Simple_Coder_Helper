import React from "react";
import { Link } from "react-router-dom";

const UpgradePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Upgrade Your Plan</h1>
        <p className="text-gray-300 mb-6">
          Unlock premium features and advanced models.
        </p>

        <div className="border border-gray-700 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold">Pro Plan</h2>
          <p className="text-gray-400 mt-2">
            Access to premium AI models and faster processing.
          </p>
          <p className="text-lg font-bold mt-4">$19.99 / month</p>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold text-white w-full">
          Upgrade Now
        </button>

        <div className="mt-6 text-gray-400 text-sm">
          <p>
            Need help?{" "}
            <Link to="/support" className="text-blue-400">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
