import { notFound } from "next/navigation";
import { getUserProfileByUsername } from "@/app/actions/user.action";
import ProfileCard from "@/app/components/profile/profile-card";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;
  const profile = await getUserProfileByUsername(username);

  if (!profile) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="space-y-6">
        <ProfileCard
          isOwnProfile={profile.isOwnerProfile}
          userProfile={profile}
        />
      </div>
    </div>
  );
}
