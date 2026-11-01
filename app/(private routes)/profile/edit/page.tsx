"use client";
import css from "@/components/EditProfilePage/EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/authStore";
import { useState } from "react";
import { updateMe } from "@/lib/api/clientApi";
import Image from "next/image";

export default function EditProfile() {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const [userName, setUserName] = useState(user?.username || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser = await updateMe({ username: userName });
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              onChange={handleChange}
              value={userName}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => {
                router.back();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
