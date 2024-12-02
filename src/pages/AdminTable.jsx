import React, { useState } from "react";
import * as XLSX from "xlsx";

const AdminTable = () => {
  const initialAdmins = [
    {
      name: "Neil Sims",
      email: "neil.sims@windster.com",
      role: "Super Admin",
      country: "United States",
      status: "Active",
      subscribed: true,
      dateAdded: "2024-11-01",
      image: "https://i.pravatar.cc/100?u=neil",
    },
    {
      name: "Roberta Casas",
      email: "roberta.casas@windster.com",
      role: "Admin",
      country: "Spain",
      status: "Active",
      subscribed: false,
      dateAdded: "2024-11-05",
      image: "https://i.pravatar.cc/100?u=roberta",
    },
    {
      name: "Olivia Taylor",
      email: "olivia.taylor@windster.com",
      role: "Super Admin",
      country: "South Africa",
      status: "Active",
      subscribed: true,
      dateAdded: "2024-11-30",
      image: "https://i.pravatar.cc/100?u=olivia",
    },
    {
      name: "Ethan Scott",
      email: "ethan.scott@windster.com",
      role: "Admin",
      country: "India",
      status: "Active",
      subscribed: false,
      dateAdded: "2024-11-18",
      image: "https://i.pravatar.cc/100?u=ethan",
    },
    {
      name: "Mia Perez",
      email: "mia.perez@windster.com",
      role: "Super Admin",
      country: "Argentina",
      status: "Inactive",
      subscribed: true,
      dateAdded: "2024-11-02",
      image: "https://i.pravatar.cc/100?u=mia",
    },
    {
      name: "Matthew Jackson",
      email: "matthew.jackson@windster.com",
      role: "Admin",
      country: "Norway",
      status: "Active",
      subscribed: false,
      dateAdded: "2024-11-03",
      image: "https://i.pravatar.cc/100?u=matthew",
    },
    {
      name: "Charlotte Clark",
      email: "charlotte.clark@windster.com",
      role: "Super Admin",
      country: "Belgium",
      status: "Active",
      subscribed: true,
      dateAdded: "2024-11-15",
      image: "https://i.pravatar.cc/100?u=charlotte",
    },
    
  ];

  const [admins, setAdmins] = useState(initialAdmins);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "",
    country: "",
    status: "Active",
    subscribed: false,
    dateAdded: new Date().toISOString().split("T")[0],
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingAdminIndex, setEditingAdminIndex] = useState(null);
  const [roleFilter, setRoleFilter] = useState("");

  const handleSearch = (event) => setSearchQuery(event.target.value);

  const openModal = (admin = null, index = null) => {
    if (admin) {
      setIsEditing(true);
      setEditingAdminIndex(index);
      setNewAdmin(admin);
    } else {
      setIsEditing(false);
      setNewAdmin({
        name: "",
        email: "",
        role: "",
        country: "",
        status: "Active",
        subscribed: false,
        dateAdded: new Date().toISOString().split("T")[0],
        image: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewAdmin({
      name: "",
      email: "",
      role: "",
      country: "",
      status: "Active",
      subscribed: false,
      dateAdded: new Date().toISOString().split("T")[0],
      image: "",
    });
    setIsEditing(false);
    setEditingAdminIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewAdmin((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email && newAdmin.role && newAdmin.country) {
      setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
      closeModal();
    } else {
      alert("Please fill out all fields before adding the admin.");
    }
  };

  const handleEditAdmin = () => {
    if (newAdmin.name && newAdmin.email && newAdmin.role && newAdmin.country) {
      setAdmins((prevAdmins) => {
        const updatedAdmins = [...prevAdmins];
        updatedAdmins[editingAdminIndex] = newAdmin;
        return updatedAdmins;
      });
      closeModal();
    } else {
      alert("Please fill out all fields before saving changes.");
    }
  };

  const handleDeleteAdmin = (index) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins((prevAdmins) => prevAdmins.filter((_, i) => i !== index));
    }
  };

  const exportToExcel = () => {
    const dataToExport = admins.map(({ image, ...rest }) => ({
      ...rest,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admins");
    try {
      XLSX.writeFile(workbook, "admins.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Error exporting data. Please try again.");
    }
  };

  const getStatusColor = (status) => (status === "Active" ? "text-green-500" : "text-red-500");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">All Admins</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for admins"
            className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
          </select>
          <div className="space-x-2">
            <button onClick={() => openModal()} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Add Admin
            </button>
            <button onClick={exportToExcel} className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
              Export
            </button>
          </div>
        </div>
        <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-600">
  <tr>
    <th className="p-4">Image</th>
    <th className="p-4">Name & Email</th> {/* Updated header */}
    <th className="p-4">Role</th>
    <th className="p-4">Country</th>
    <th className="p-4">Status</th>
    <th className="p-4">Subscribed</th>
    <th className="p-4">Date Added</th>
    <th className="p-4">Actions</th>
  </tr>
</thead>

          <tbody>
  {admins
    .filter((admin) =>
      (roleFilter ? admin.role === roleFilter : true) &&
      (admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .map((admin, index) => (
      <tr key={index} className="border-t hover:bg-gray-50">
        <td className="p-4">
          <img src={admin.image || "https://via.placeholder.com/100"} alt={admin.name} className="w-10 h-10 rounded-full" />
        </td>
        <td className="p-4">
          <div className="font-semibold">{admin.name}</div>
          <div className="text-gray-500 text-sm">{admin.email}</div> {/* Email nested under name */}
        </td>
        <td className="p-4">{admin.role}</td>
        <td className="p-4">{admin.country}</td>
        <td className="p-4">
          <span className={`font-medium ${getStatusColor(admin.status)}`}>{admin.status}</span>
        </td>
        <td className="p-4">{admin.subscribed ? "Yes" : "No"}</td>
        <td className="p-4">{admin.dateAdded}</td>
        <td className="p-4 space-x-2">
          <button
            onClick={() => openModal(admin, index)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md hover:bg-green-600"
          >
            View
          </button>
          <button
            onClick={() => handleDeleteAdmin(index)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
</tbody>


        </table>
        {admins.length === 0 && <div className="p-4 text-center text-gray-500">No admins found.</div>}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Admin" : "Add Admin"}</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={newAdmin.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="email"
                name="email"
                value={newAdmin.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="text"
                name="role"
                value={newAdmin.role}
                onChange={handleInputChange}
                placeholder="Role"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="text"
                name="country"
                value={newAdmin.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              <select
                name="status"
                value={newAdmin.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex items-center">
                <label htmlFor="subscribed" className="mr-2">
                  Subscribed:
                </label>
                <input
                  type="checkbox"
                  id="subscribed"
                  name="subscribed"
                  checked={newAdmin.subscribed}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="imageUpload" className="mr-2">
                  Upload Image:
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  onChange={handleImageUpload}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              {newAdmin.image && (
                <img src={newAdmin.image} alt="Preview" className="w-16 h-16 mt-4 rounded-full" />
              )}
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={isEditing ? handleEditAdmin : handleAddAdmin}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {isEditing ? "Save Changes" : "Add Admin"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
