import React, { useState, useRef, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import ImageCard from "./ImageCard";

const initialImages = [
  "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/261043/pexels-photo-261043.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2061168/pexels-photo-2061168.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/247600/pexels-photo-247600.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
];

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0); // left-most visible index
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const visibleCount = 3;

  // ensure currentIndex is within valid bounds if images length changes
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
      alert("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      const url = URL.createObjectURL(file);
      setGalleryImages((prev) => {
        const updated = [...prev, url];
        const desired = Math.max(0, updated.length - visibleCount);
        setTimeout(() => setCurrentIndex(desired), 60); 
        return updated;
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
    <div className="bg-slate-800/50% backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10">
        <button className="w-10 h-10 rounded-full bg-slate-900/50 border border-slate-700 flex items-center justify-center hover:bg-slate-900/70 transition-all">
          <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-6">
        <button className="px-6 py-3 rounded-2xl font-medium bg-slate-900 text-white shadow-lg shadow-slate-900/50">
          Gallery
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddClick}
            disabled={uploading}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg disabled:opacity-50"
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
            className={`w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center transition-all shadow-lg ${currentIndex === 0 ? "opacity-40 cursor-not-allowed bg-slate-900/30" : "bg-slate-900/50 hover:bg-slate-900/70"
              }`}
            aria-label="Previous"
          >
            <MdArrowBack className="w-5 h-5 text-slate-300" />
          </button>

          <button
            onClick={next}
            disabled={currentIndex >= Math.max(0, galleryImages.length - visibleCount)}
            className={`w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center transition-all shadow-lg ${currentIndex >= Math.max(0, galleryImages.length - visibleCount)
                ? "opacity-40 cursor-not-allowed bg-slate-900/30"
                : "bg-slate-900/50 hover:bg-slate-900/70"
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

      {/* Carousel */}
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
                style={{ minWidth: `${100 / galleryImages.length}%` }} /* each item relative to the big width */
                className="p-2"
              >
                <ImageCard src={src} alt={`Gallery ${idx + 1}`} />
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 right-6 text-xs text-slate-400">
            {Math.min(currentIndex + 1, galleryImages.length)} -{" "}
            {Math.min(currentIndex + visibleCount, galleryImages.length)} of{" "}
            {galleryImages.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
