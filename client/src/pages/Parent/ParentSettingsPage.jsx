import { useState } from "react";
import ParentSidebar from "../../components/Parent/ParentSidebar";
import ParentTopbar from "../../components/Parent/ParentTopbar";
import { useToast } from "../../context/ToastContext";

import AddChildModal from "../../components/Parent/Settings/AddChildModal";
import ChildRow from "../../components/Parent/Settings/ChildRow";
import { parentStudents } from "../../data/parentStudents"; // demo data

export default function ParentSettingsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;
  const { showToast } = useToast();

  const [parentProfile, setParentProfile] = useState({
    name: "Neha Sharma",
    email: "neha.sharma@example.com",
    phone: "+91 9876543210",
    address: "A-12, Green Avenue, Bhopal",
  });

  const [children, setChildren] = useState(parentStudents);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleProfileChange = (field, value) =>
    setParentProfile((p) => ({ ...p, [field]: value }));

  const handleSaveProfile = () => {
    showToast("Profile updated successfully!", "success");
  };

  const handleAddChild = (child) => {
    setChildren((prev) => [{ id: Date.now(), ...child }, ...prev]);
    setShowAddModal(false);
  };

  const handleRemoveChild = (id) => {
    if (!confirm("Remove this child?")) return;
    setChildren((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex h-screen bg-[#F7FBF8] overflow-hidden">
      {/* SIDEBAR */}
      <div
        className="fixed top-0 left-0 h-full transition-all duration-300 z-40"
        style={{ width: sidebarWidth }}
      >
        <ParentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <ParentTopbar pageTitle="Settings" showStudentSwitcher={false} />

        <div className="p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* LEFT: Profile */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-[#E6F4EC] shadow-md p-6">

                  <h3 className="text-xl font-semibold text-[#124734]">
                    Parent Profile
                  </h3>
                  <p className="text-sm text-[#5B7065] mt-1">
                    Update your personal information
                  </p>

                  <hr className="my-4 border-[#EAF6EE]" />

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-[#5B7065]">Full name</label>
                      <input
                        value={parentProfile.name}
                        onChange={(e) =>
                          handleProfileChange("name", e.target.value)
                        }
                        className="w-full mt-2 p-2 border border-[#E6F4EC] rounded-md outline-[#009846]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#5B7065]">Email</label>
                      <input
                        value={parentProfile.email}
                        onChange={(e) =>
                          handleProfileChange("email", e.target.value)
                        }
                        className="w-full mt-2 p-2 border border-[#E6F4EC] rounded-md outline-[#009846]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#5B7065]">Phone</label>
                      <input
                        value={parentProfile.phone}
                        onChange={(e) =>
                          handleProfileChange("phone", e.target.value)
                        }
                        className="w-full mt-2 p-2 border border-[#E6F4EC] rounded-md outline-[#009846]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#5B7065]">Address</label>
                      <input
                        value={parentProfile.address}
                        onChange={(e) =>
                          handleProfileChange("address", e.target.value)
                        }
                        className="w-full mt-2 p-2 border border-[#E6F4EC] rounded-md outline-[#009846]"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-[#009846] text-white rounded-lg shadow-sm hover:bg-[#0e3a29] w-full sm:w-auto"
                      >
                        Save Changes
                      </button>

                      <button
                        onClick={() => {
                          setParentProfile({
                            name: "Neha Sharma",
                            email: "neha.sharma@example.com",
                            phone: "+91 9876543210",
                            address: "A-12, Green Avenue, Bhopal",
                          });
                          showToast("Profile reset to default values", "success");
                        }}
                        className="px-4 py-2 border border-[#E6F4EC] rounded-md text-[#124734] bg-white hover:bg-[#F3FFF7] w-full sm:w-auto"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: CHILDREN */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-[#E6F4EC] shadow-md p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-[#124734]">
                        Manage Children
                      </h3>
                      <p className="text-sm text-[#5B7065] mt-1">
                        Add or remove children linked to this account
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-4 py-2 bg-[#009846] text-white rounded-md shadow-sm hover:bg-[#008a3a] w-full sm:w-auto"
                    >
                      + Add New Child
                    </button>
                  </div>

                  <div className="mt-5 space-y-3">
                    {children.length === 0 ? (
                      <div className="p-4 bg-[#F8FFF8] text-[#5B7065] rounded-md">
                        No children linked.
                      </div>
                    ) : (
                      children.map((c) => (
                        <ChildRow
                          key={c.id}
                          child={c}
                          onRemove={() => handleRemoveChild(c.id)}
                        />
                      ))
                    )}
                  </div>

                  <p className="text-xs text-[#98A6A2] mt-6">
                    Tip: Add multiple children and switch between them anywhere in the app.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {showAddModal && (
          <AddChildModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddChild}
          />
        )}
      </div>
    </div>
  );
}
