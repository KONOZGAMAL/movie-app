"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

export default function BtnScrollToTop() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      {scrollPosition > 100 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 hover:bg-gradient-to-r from-red-6 to-pink-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
          aria-label="Scroll to Top"
        >
          <BiUpArrowAlt className="text-2xl" />
        </button>
      )}
    </div>
  );
}
