"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface UserProfile {
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
  bio: string | null;
  id: string;
  image: string | null;
  name: string | null;
  username: string | null;
}

interface ProfileContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({
  children,
  initialProfile,
}: {
  children: ReactNode;
  initialProfile?: Partial<UserProfile> | null;
}) {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    if (initialProfile) {
      return {
        _count: initialProfile._count || {
          followers: 0,
          following: 0,
          posts: 0,
        },
        bio: initialProfile.bio || null,
        id: initialProfile.id || "",
        image: initialProfile.image || null,
        name: initialProfile.name || null,
        username: initialProfile.username || null,
      };
    }
    return null;
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...updates });
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
