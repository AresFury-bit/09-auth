"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface NoteLayoutProps {
  children: React.ReactNode;
}

export default function NoteLayout({ children }: NoteLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <div>{children}</div>;
}
