import React, { useState, useRef, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import CardImage from "./CardImage";
import './tabList.css'


const initialImages = [
  "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/261043/pexels-photo-261043.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2061168/pexels-photo-2061168.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/247600/pexels-photo-247600.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
];

const GalleryCard= () => {
  const [galleryImages, setGalleryImages] = useState(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const visibleCount = 3;

  useEffect(() => {
    const maxIndex = Math.max(0, galleryImages.length - visibleCount);
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [galleryImages.length, currentIndex]);

  const next = () => {
    const maxIndex = Math.max(0, galleryImages.length - visibleCount);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 3MB");
      return;
    }

    setUploading(true);
    try {
      const url = URL.createObjectURL(file);
      setGalleryImages((prev) => {
        const updated = [...prev, url];
        const desired = Math.max(0, updated.length - visibleCount);
        setTimeout(() => setCurrentIndex(desired), 60);
        return updated;  // <-- Add this return statement here!
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const shiftPercent = (currentIndex * 100) / visibleCount;

  return (
    <div className="bg-[#363C43] rounded-3xl outer-box">
     

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-6">
        <button className="px-6 py-3 rounded-2xl font-medium bg-[#171717] text-white shadow-lg shadow-slate-900/50">
          Gallery
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddClick}
            disabled={uploading}
            className="px-4 py-2 rounded-xl imgadd text-white text-sm font-medium flex items-center gap-2 hover:bg-[#161718] transition-all shadow-lg disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> ADD IMAGE
              </>
            )}
          </button>

          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={`w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center transition-all shadow-lg ${currentIndex === 0 ? "opacity-40 cursor-pointer bg-[#161718]" : "bg-[#303439] hover:bg-[#161718]"
              }`}
            aria-label="Previous"
          >
            <MdArrowBack className="w-5 h-5 text-slate-300" />
          </button>

          <button
            onClick={next}
            disabled={currentIndex >= Math.max(0, galleryImages.length - visibleCount)}
            className={`w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center transition-all shadow-lg ${currentIndex >= Math.max(0, galleryImages.length - visibleCount)
              ? "opacity-40 cursor-pointer bg[rgba(16, 18, 19, 1)]"
              : "bg[rgba(16, 18, 19, 1)] hover:bg-[#161718]"
              }`}
            aria-label="Next"
          >
            <MdArrowForward className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* slider */}
      <div className="px-6 pb-6">
        <div className="bg-slate-900/30 rounded-2xl p-4 border border-slate-700/30 relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${shiftPercent}%)`,
              width: `${(galleryImages.length * 100) / visibleCount}%`,
            }}
          >
            {galleryImages.map((src, idx) => (
              <div
                key={idx}
                style={{ minWidth: `${100 / galleryImages.length}%` }} 
                className="p-2"
              >
                <CardImage src={src} alt={`Gallery ${idx + 1}`} />
              </div>
            ))}
          </div>

          {/* small index indicator */}
          {/* <div className="absolute bottom-4 right-6 text-xs text-slate-400">
            {Math.min(currentIndex + 1, galleryImages.length)} -{" "}
            {Math.min(currentIndex + visibleCount, galleryImages.length)} of{" "}
            {galleryImages.length}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
