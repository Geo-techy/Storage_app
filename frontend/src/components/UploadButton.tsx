import { useRef } from "react";

interface Props {
  refreshFiles: () => void;
}

function UploadButton({ refreshFiles }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("file", file);

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      refreshFiles();
    }
  }

  return (
    <>
      <input type="file" hidden ref={inputRef} onChange={handleUpload} />

      <button
        onClick={() => inputRef.current?.click()}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Upload
      </button>
    </>
  );
}

export default UploadButton;
