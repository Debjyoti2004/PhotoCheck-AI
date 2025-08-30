"use client";

import type React from "react";
import { useState, useRef, useCallback } from "react";
import { X, CheckCircle, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string | null) => void;
  currentImage: string | null;
  onError: (message: string, type: 'warning' | 'error') => void;
}

const MAX_IMAGE_SIZE_MB = 1;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export default function ImageUploader({ onImageUpload, currentImage, onError }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        onError("Invalid file type. Please upload an image.", 'error');
        return;
      }
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        onError(`Image size exceeds ${MAX_IMAGE_SIZE_MB}MB. Please reduce its size.`, 'warning');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onImageUpload, onError]
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) processFile(files[0]);
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) processFile(files[0]);
  }, [processFile]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const imageItem = Array.from(e.clipboardData.items).find((item) => item.type.startsWith("image/"));
    if (imageItem) {
      const file = imageItem.getAsFile();
      if (file) processFile(file);
    }
  }, [processFile]);

  const removeImage = useCallback(() => {
    onImageUpload(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [onImageUpload]);

  const motionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="space-y-6" onPaste={handlePaste}>
      <div className="min-h-[220px]">
        <AnimatePresence mode="wait">
          {currentImage ? (
            <motion.div
              key="image-preview"
              variants={motionVariants}
              initial="hidden" animate="visible" exit="exit"
              className="relative rounded-xl border border-zinc-700 p-2"
            >
              <img
                src={currentImage}
                alt="Uploaded passport photo"
                className="w-full h-auto max-h-72 object-contain rounded-md"
              />
              <button
                onClick={removeImage}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors shadow-lg"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="uploader-dropzone"
              variants={motionVariants}
              initial="hidden" animate="visible" exit="exit"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={clsx(
                "relative flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl p-8 text-center transition-all duration-300 cursor-pointer",
                "border-2 border-dashed",
                isDragOver
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-zinc-700 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-900"
              )}
            >
              <div className="space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800">
                  <UploadCloud className="h-8 w-8 text-zinc-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Click to upload or drag & drop</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Supports JPG, PNG, WEBP. Max size: {MAX_IMAGE_SIZE_MB}MB.
                  </p>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <h4 className="font-medium text-zinc-300 mb-3 flex items-center text-sm">
          <CheckCircle className="w-5 h-5 mr-2 text-emerald-500 flex-shrink-0" />
          Tips for best results:
        </h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex items-center"><span className="mr-2">&bull;</span>Use a high-resolution image</li>
          <li className="flex items-center"><span className="mr-2">&bull;</span>Ensure good lighting with no shadows</li>
          <li className="flex items-center"><span className="mr-2">&bull;</span>Face the camera directly with a neutral expression</li>
          <li className="flex items-center"><span className="mr-2">&bull;</span>Use a plain white or light-colored background</li>
        </ul>
      </div>
    </div>
  );
}