import { FetchNotesResponse, Note } from "@/types/note";
import { api } from "./api";
import { cookies, headers } from "next/headers";
import { User } from "@/types/user";


const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async( page:number, search?:string, tag?:string ):Promise<FetchNotesResponse> => {
    const cookieStore = await cookies();
    const res = await api.get<FetchNotesResponse>("/notes", {
        params: {
            search: search,
            page: page,
            perPage: 12,
            tag: tag
        }, headers: {
            Cookie: cookieStore.toString(),
        }
    },
    )
    return res.data;
}


export const fetchNoteById = async (id: string) => {
    const cookieStore = await cookies();
    const res = await api.get<Note>(`/notes/${id}`, {
        headers: {
             Cookie: cookieStore.toString(),
        }
    },
    )
    return res.data;
}

type CheckSessionRequest = {
    success:boolean
}

export const checkSession = async () => {
     const cookieStore = await cookies();
    const res = await api.get<CheckSessionRequest>("/auth/session", {headers:{Cookie: cookieStore.toString()}})
    return res
}

export const getMe = async () => {
    const cookieStore = await cookies();
    const { data } = await api.get<User>("/users/me", { headers: { Cookie: cookieStore.toString()}})
    return data;
}