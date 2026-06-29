import { useEffect, useState } from "react";

interface FileData {
  id: number;
  filename: string;
  filesize: number;
}

interface Props {
  refresh: boolean;
}

function FileList({ refresh }: Props) {
  const [files, setFiles] = useState<FileData[]>([]);

  async function loadFiles() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/files", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setFiles(data);
  }
  async function downloadFile(id: number, filename: string) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:8000/download/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    window.URL.revokeObjectURL(url);
  }
  async function deleteFile(id: number) {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:8000/files/${id}`,

      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    loadFiles();
  }

  useEffect(() => {
    loadFiles();
  }, [refresh]);

  return (
    <div>
      {files.map((file) => (
        <div
          key={file.id}
          className="flex justify-between items-center border-b p-4 hover:bg-gray-50"
        >
          <div>
            <h3 className="font-medium">{file.filename}</h3>

            <p className="text-sm text-gray-500">
              {(file.filesize / 1024).toFixed(2)} KB
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => downloadFile(file.id, file.filename)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Download
            </button>

            <button
              onClick={() => deleteFile(file.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileList;
