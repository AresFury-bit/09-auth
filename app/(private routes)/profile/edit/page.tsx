"use client";
import css from "@/components/EditProfilePage/EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";

export default function EditProfile() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? "");
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSaveUser = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateMe({ username: userName });
  };
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <img
            src="https://st2.depositphotos.com/2101611/8308/v/450/depositphotos_83084388-stock-illustration-businessman-icon-can-be-used.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />

          <form className={css.profileInfo} onSubmit={handleSaveUser}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username: {user?.username}</label>
              <input
                id="username"
                type="text"
                className={css.input}
                onChange={handleChange}
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
    </>
  );
}
