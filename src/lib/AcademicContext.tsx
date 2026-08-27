"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface AcademicProfile {
  institutionId: string;
  programId: string;
  branchId: string;
  groupId: string;
  yearId: string;
  semesterId: string;
}

interface AcademicContextType {
  profile: AcademicProfile | null;
  isSetup: boolean;
  setProfile: (profile: AcademicProfile) => void;
  clearProfile: () => void;
  getRoutePrefix: () => string;
}

const STORAGE_KEY = "bbdu-academic-profile";

const AcademicContext = createContext<AcademicContextType | null>(null);

function loadProfile(): AcademicProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveProfile(profile: AcademicProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function AcademicProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<AcademicProfile | null>(() => loadProfile());

  const setProfile = useCallback((p: AcademicProfile) => {
    setProfileState(p);
    saveProfile(p);
  }, []);

  const clearProfile = useCallback(() => {
    setProfileState(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const getRoutePrefix = useCallback(() => {
    if (!profile) return "";
    return `/${profile.institutionId}/${profile.programId}/${profile.branchId}/${profile.groupId}/${profile.yearId}/${profile.semesterId}`;
  }, [profile]);

  return (
    <AcademicContext.Provider
      value={{
        profile,
        isSetup: !!profile,
        setProfile,
        clearProfile,
        getRoutePrefix,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademic() {
  const ctx = useContext(AcademicContext);
  if (!ctx) throw new Error("useAcademic must be used within AcademicProvider");
  return ctx;
}
