"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.client.module.css";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: notesData } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleChange = useDebouncedCallback((search: string) => {
    setSearch(search);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={(search: string) => handleChange(search)} />
        {notesData && notesData?.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={notesData.totalPages}
            setPage={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {notesData && notesData.notes.length > 0 && (
        <NoteList notes={notesData.notes} />
      )}
    </div>
  );
};

export default NotesClient;
