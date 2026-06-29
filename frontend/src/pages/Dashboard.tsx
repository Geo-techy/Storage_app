import Navbar from "../components/Navbar";
import StorageCard from "../components/StorageCard";
import UploadButton from "../components/UploadButton";
import { useState } from "react";
import FileList from "../components/FileCard";

function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  function refreshFiles() {
    setRefresh((prev) => !prev);
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <StorageCard refresh={refresh} />

        <UploadButton refreshFiles={refreshFiles} />

        <FileList refresh={refresh} />
      </div>
    </div>
  );
}

export default Dashboard;
