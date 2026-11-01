"use client";
import { logout } from "@/lib/api/clientApi";
import css from "./AuthNavigation.module.css";
import { useUserStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user } = useUserStore();
  const clearIsAuthenticated = useUserStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <a href="/profile" className={css.navigationLink}>
          Profile
        </a>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <a href="/sign-in" className={css.navigationLink}>
          Login
        </a>
      </li>

      <li className={css.navigationItem}>
        <a href="/sign-up" className={css.navigationLink}>
          Sign up
        </a>
      </li>
    </>
  );
}
