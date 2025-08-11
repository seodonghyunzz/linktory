import useAuthStore from "../store/authStore"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../component/Loading";

export default function AuthLoading(){
  const user = useAuthStore(state=>state.user)
  const authLoading = useAuthStore(state=>state.authLoading)
  const router = useRouter();

  useEffect(() => {
      if (user === null && !authLoading) {
        router.push("/login");
      }
      }, [user, router]);

    return(
        <>
            {authLoading ?
            <Loading/>
            : null 
            }
        </>
    )
}