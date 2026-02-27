"use client";

import { useEffect } from "react";
import { recordView } from "@/lib/viewCount";

/** Записва преглед при всяко посещение на страница. */
export default function ViewTracker() {
  useEffect(() => {
    recordView();
  }, []);
  return null;
}
