import React from "react";

export default function ProfessorsList() {
  const professors = [
    {
      name: "Theodore Handle",
      degree: "B.Com",
      status: "Available",
      available: true,
      img: "https://i.pravatar.cc/80?img=5",
    },
    {
      name: "Bess Willis",
      degree: "M.Com",
      status: "Not Available",
      available: false,
      img: "https://i.pravatar.cc/80?img=12",
    },
    {
      name: "James Jones",
      degree: "M.Tech",
      status: "Available",
      available: true,
      img: "https://i.pravatar.cc/80?img=8",
    },
    {
      name: "Smith Watson",
      degree: "B.Tech",
      status: "Not Available",
      available: false,
      img: "https://i.pravatar.cc/80?img=4",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full h-[420px] flex flex-col">
      <h2 className="text-xl font-semibold text-[#124734] mb-4">
        Professors List
      </h2>

      <div className="overflow-y-auto pr-2 flex-1 space-y-5">
        {professors.map((p, idx) => (
          <div key={idx} className="flex items-center gap-4 border-b pb-3">
            <img
              src={p.img}
              alt={p.name}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold text-[#124734]">
                {p.name}{" "}
                <span className="text-gray-500 text-sm">({p.degree})</span>
              </p>

              <p
                className={`text-sm font-medium ${
                  p.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {p.status}
              </p>
            </div>
          </div>
        ))}
      </div>
<div className="text-center mt-4">
      <button className=" w-30 mt-4 px-4 py-2 bg-[#124734] text-white rounded-lg hover:bg-[#0f3d28]">
        View All
      </button>
      </div>
    </div>
  );
}
