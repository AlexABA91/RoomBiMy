"use client";
import React, { useEffect, useState } from "react";
import { saveFoto } from "../services/fotoServices";
const FileTest = () => {
  const [fileData, setFileData] = useState(new FormData());

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const input = event.target;

    if (input.files != null && input.files.length > 0) {
      const selectedFile = input.files[0];
      if (selectedFile) {
        let updatedFileData = new FormData();
        updatedFileData.append("upload", selectedFile);
        updatedFileData.append("folder", "car");
        setFileData(updatedFileData);
        console.log("input.files[0]", input.files[0]);
        fileData.forEach((value, key) => {
          console.log("123", `${key}: ${value}`);
        });
      }
    }
  };

  const sub = async () => {
    const res = await saveFoto(fileData);
    console.log("res 3", res);
  };

  useEffect(() => {
    console.log("Component mounted on the client");
  }, []);
  return (
    <div>
      <label htmlFor="fileInput" className="form-label">
        Виберіть фото
      </label>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        id="fileInput"
        onChange={onFileSelected}
      />
      <button type="submit" onClick={sub}>
        sub
      </button>
    </div>
  );
};

export { FileTest };
