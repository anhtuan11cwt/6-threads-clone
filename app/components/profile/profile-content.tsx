import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/app/actions/user/get-current-user-profile";
import ProfileCard from "./profile-card";

export default async function ProfileContent() {
  const userProfile = await getCurrentUserProfile();

  if (!userProfile) {
    redirect("/sign-in");
  }

  return <ProfileCard isOwnProfile userProfile={userProfile} />;
}
