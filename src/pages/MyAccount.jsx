import React, { useState } from 'react';

function MyAccount() {
  const initialAccountSettings = {
    Business_Name: "",
    Business_Id: "",
    ULocation: "",
    Email: "",
    New_password: "",
    sync: false, // Sync should be a boolean to track if the checkbox is checked
    image: null, // Add image field to the state
  };

  const [accountSettings, setAccountSettings] = useState(initialAccountSettings);

  const cancel = () => {
    setAccountSettings(initialAccountSettings);
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setAccountSettings((prevSettings) => ({
      ...prevSettings,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the uploaded image as part of the account settings
        setAccountSettings((prevSettings) => ({
          ...prevSettings,
          image: reader.result, // Store the image URL in the `image` field
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const update_user_data = () => {
    // You can log or send the accountSettings data to the server here
    console.log(accountSettings);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6 w-full max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Profile Section */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">My Account</h2>
            <div className="flex items-center mb-4">
              <div>
                {/* Display the uploaded image if exists */}
                <img 
                  src={accountSettings.image || '#'} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full bg-gray-300 flex justify-center items-center text-white" 
                />
              </div>
              <button 
                className="ml-4 px-4 py-2 border rounded text-blue-600 border-blue-600 hover:bg-blue-100"
                onClick={() => document.getElementById('imageInput').click()} // Trigger file input on button click
              >
                Change
              </button>
              {/* Hidden file input */}
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Name</label>
                <input
                  id="Business_Name"
                  type="text"
                  placeholder="Enter your business name"
                  value={accountSettings.Business_Name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Business ID</label>
                <input
                  id="Business_Id"
                  type="text"
                  placeholder="Enter your business ID"
                  value={accountSettings.Business_Id}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  id="ULocation"
                  type="text"
                  placeholder="Enter your business location"
                  value={accountSettings.ULocation}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Email</h2>
            <div className="flex items-center">
              <input
                id="Email"
                type="email"
                value={accountSettings.Email}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Password</h2>
            <input
              id="New_password"
              placeholder="Set New Password"
              type="password"
              value={accountSettings.New_password}
              onChange={handleChange}
              className="px-4 py-2 border rounded text-gray-500 border-gray-600 hover:bg-blacks"
            />
          </div>

          {/* Smart Sync Section */}
          <div>
            <h2 className="text-lg font-medium mb-2">Smart Sync update for Mac</h2>
            <div className="flex items-center">
              <span className="text-gray-600">
                With this update, online-only files will no longer appear to take up hard drive space.
              </span>
              <label className="ml-4 inline-flex items-center">
                <input
                  id="sync"
                  type="checkbox"
                  checked={accountSettings.sync}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">On</span>
              </label>
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button onClick={cancel} className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
              Cancel
            </button>
            <button onClick={update_user_data} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
