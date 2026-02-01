import ChangePasswordForm from "@/app/components/changePsw";
import ProfileInfoForm from "@/app/components/profileInfo";
import ProfileImageForm from "@/app/components/uplaodImage";


export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Edit Profile</h1>

      <ProfileInfoForm />
      <ProfileImageForm />
      <ChangePasswordForm />
    </div>
  );
}
