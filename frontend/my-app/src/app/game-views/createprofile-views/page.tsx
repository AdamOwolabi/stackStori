"use client"; // only if you use hooks inside

import React from 'react';

const CreateProfilePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold text-green-400">
        Create Your Profile
      </h1>
      {/* Add your profile creation form or logic here */}
    </div>
  );
};

export default CreateProfilePage; // ✅ MUST have a default export