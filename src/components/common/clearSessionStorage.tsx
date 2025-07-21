"use client";
import { useEffect } from "react";

export default function ClearSessionStorage() {
  useEffect(() => {
    sessionStorage.removeItem("lastSearchTerm");
  }, []);

  return null;
}
