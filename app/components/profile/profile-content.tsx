import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/app/actions/user/get-current-user-profile";
import ProfileClientWrapper from "./profile-client-wrapper";

export default async function ProfileContent() {
  const userProfile = await getCurrentUserProfile();

  if (!userProfile) {
    redirect("/sign-in");
  }

  return <ProfileClientWrapper initialProfile={userProfile} />;
}
