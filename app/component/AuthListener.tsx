'use client'

import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import {auth} from "@/lib/firebase";
import useAuthStore  from "../store/authStore";

export default function AuthListener(){
    const setUser = useAuthStore((state)=>state.setUser);
    const setAuthLoading = useAuthStore(state=>state.setAuthLoading)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user);
            setAuthLoading(false);
        });
        return ()=> unsubscribe();
    },[setUser])
    return null;
}