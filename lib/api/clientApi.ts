import type {Note, NewNote, FetchNotesResponse} from "../../types/note"
import { api } from "./api";
import { User } from "@/types/user";


export const fetchNotes = async( page:number, search?:string, tag?:string ):Promise<FetchNotesResponse> => {
    const res = await api.get<FetchNotesResponse>("/notes", {
        params: {
            search: search,
            page: page,
            perPage: 12,
            tag: tag
        }
    },
    )
    return res.data;
}
export const fetchNoteById = async (id: string) => {
    const res = await api.get<Note>(`/notes/${id}`)
    return res.data;
}

export const createNote = async(newNote:NewNote) => {
    const res = await api.post<Note>("/notes", newNote)
    return res.data
}

export const deleteNote = async(id:string):Promise<Note> => {
    const res = await api.delete<Note>(`/notes/${id}`)
    return res.data
}


export type RegisterRequest = {
    email: string,
  password: string,
}

export const register = async (data:RegisterRequest) => {
    const res = await api.post<User>("/auth/register", data)
    return res.data
}


export type LoginRequest = {
    email: string,
  password: string,
}
export const login = async (data:LoginRequest) => {
    const res = await api.post<User>("/auth/login", data)
    return res.data
}

type CheckSessionRequest = {
    success:boolean
}

export const checkSession = async () => {
    const res = await api.get<CheckSessionRequest>("/auth/session")
    return res.data.success
}

export const getMe = async () => {
    const {data} = await api.get<User>("/users/me")
    return data;
}

export const logout = async ():Promise<void> => {
    await api.post("/auth/logout");
}

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload:UpdateUserRequest) => {
    const res = await api.patch<User>("/users/me", payload)
    return res.data
}





// logout
// checkSession
// getMe
// updateMe