import {create} from "zustand"
import { User } from "firebase/auth";

interface AuthState {
    user: User | null;
    setUser : (user: User | null) => void;
    authLoading: Boolean;
    setAuthLoading: (loading: Boolean) => void;
}
const useAuthStore = create<AuthState>((set)=>({
    user : null,
    setUser: (user)=> set({ user }),
    authLoading: true,
    setAuthLoading: (loading)=>set({ authLoading: loading }),
}));

export default useAuthStore;