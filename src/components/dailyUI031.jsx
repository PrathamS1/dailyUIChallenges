import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { File, Check, X } from "lucide-react";
import BackToHome from "./BackToHome";

export default function FileUpload() {
  const cardRef = useRef();
  const inputRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  function handleMouseMove(e) {
    if (uploadSuccess) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = (x / rect.width) * 2 - 1;
    const ny = (y / rect.height) * 2 - 1;
    setTilt({ x: nx * 18, y: ny * 18 });
  }

  function handleMouseLeave() {
    if (uploadSuccess) return;
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }

  function handleCardClick() {
    if (inputRef.current && !uploadSuccess) inputRef.current.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setUploadSuccess(true);
      setHovered(false);
      setTilt({ x: 0, y: 0 });
    }
  }

  function handleRemoveFile() {
    setUploadedFile(null);
    setUploadSuccess(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-[#222]/40 to-gray-200 relative">
      <BackToHome />
      <div
        ref={cardRef}
        className="w-[16rem] min-h-[10rem] rounded-2xl shadow-2xl border border-[#222] p-10 flex flex-col items-center justify-center relative overflow-hidden group bg-[#18181b]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !uploadSuccess && setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        style={{ cursor: uploadSuccess ? "default" : "pointer" }}
        tabIndex={0}
        role="button"
        aria-label="Upload file"
      >
        {!uploadSuccess && (
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={hovered ? { y: -120, opacity: 1 } : { y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none p-2"
          >
            <div className="bg-white/10 rounded-xl w-full h-full justify-center flex items-center gap-2">
              <File className="w-6 h-6 text-white opacity-80" />
              <span className="text-white text-base font-semibold opacity-80">
                Upload file
              </span>
            </div>
          </motion.div>
        )}

        {!uploadSuccess && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={hovered ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <motion.div
              animate={{ rotateX: tilt.y, rotateY: -tilt.x }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              style={{ perspective: 400 }}
            >
              <File className="w-16 h-16 text-white drop-shadow-lg" />
            </motion.div>
          </motion.div>
        )}

        {uploadSuccess && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <Check className="w-16 h-16 text-green-400 drop-shadow-lg" />
          </motion.div>
        )}

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          aria-label="Upload file"
        />
      </div>

      {uploadSuccess && uploadedFile && (
        <div className="mt-6 flex items-center gap-2">
          <div className="px-4 py-2 rounded-full bg-[#222] text-white flex items-center gap-3 shadow-lg border border-[#333]">
            <span className="font-semibold text-sm truncate max-w-[160px]">
              {uploadedFile.name}
            </span>
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              Successful
            </span>
            <button
              className="ml-2 p-1 rounded-full hover:bg-[#333] transition-colors"
              onClick={handleRemoveFile}
              aria-label="Remove file"
              type="button"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
