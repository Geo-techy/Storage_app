import { useEffect, useState } from "react";

interface Props {
  refresh: boolean;
}

function StorageCard({ refresh }: Props) {
  const [used, setUsed] = useState(0);
  const [limit, setLimit] = useState(0);
  useEffect(() => {
    loadStorage();
  }, [refresh]);
  async function loadStorage() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:8000/storage", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setUsed(data.used);
    setLimit(data.limit);
  }

  useEffect(() => {
    loadStorage();
  }, []);

  const percentage = limit ? (used / limit) * 100 : 0;

  return (
    <div className="bg-gray-900 rounded-xl p-8 shadow text-white">
      <h2 className="text-2xl font-bold mb-3">Storage Usage</h2>

      <p className="text-gray-400 mb-5">
        {(used / 1024 / 1024).toFixed(2)} MB of{" "}
        {(limit / 1024 / 1024 / 1024).toFixed(0)} GB used
      </p>

      <div className="w-full bg-gray-700 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default StorageCard;
