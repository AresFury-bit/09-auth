import { Metadata } from "next";
import css from "../../../components/ProfilePage/ProfilePage.module.css";
import { getMe } from "@/lib/api/serverApi";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getMe();
  return {
    title: `${user.username}`,
    description:
      "Manage your personal data, view your profile, and account settings",
  };
}

export default async function Profile() {
  const user = await getMe();

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <a href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </a>
          </div>
          <div className={css.avatarWrapper}>
            <img
              src="https://st2.depositphotos.com/2101611/8308/v/450/depositphotos_83084388-stock-illustration-businessman-icon-can-be-used.jpg"
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.username}</p>
          </div>
        </div>
      </main>
    </>
  );
}
