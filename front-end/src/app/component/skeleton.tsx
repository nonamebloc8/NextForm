"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * GLOBAL LOADING CONTEXT
 */
const LoadingContext = createContext({
  loading: false as boolean,
  setLoading: (value: boolean) => {}
});

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  // Simulate initial loading (ex: fetch auth, settings...) remove in prod
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading ? <GlobalSkeleton /> : children}
    </LoadingContext.Provider>
  );
}

/**
 * GLOBAL SKELETON SCREEN (full screen)
 */
function GlobalSkeleton() {
  return (
    <div className="w-full h-screen p-6 bg-gray-100 flex flex-col gap-6 animate-pulse">
      {/* HEADER */}
      <div className="w-full h-10 bg-gray-300 rounded-xl" />

      {/* BODY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
        <div className="h-40 bg-gray-300 rounded-2xl" />
        <div className="h-40 bg-gray-300 rounded-2xl" />
        <div className="h-40 bg-gray-300 rounded-2xl" />
      </div>

      {/* CONTENT BLOCK */}
      <div className="w-full h-[300px] bg-gray-300 rounded-2xl mt-4" />
    </div>
  );
}

