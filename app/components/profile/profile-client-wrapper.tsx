"use client";

import { useEffect } from "react";
import { useProfile } from "@/app/contexts/ProfileContext";
import ProfileCard from "./profile-card";

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

export default function ProfileClientWrapper({
  initialProfile,
}: {
  initialProfile: UserProfile;
}) {
  const { profile, setProfile } = useProfile();

  useEffect(() => {
    if (initialProfile && !profile) {
      setProfile(initialProfile);
    }
  }, [initialProfile, profile, setProfile]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return <ProfileCard isOwnProfile userProfile={profile} />;
}
