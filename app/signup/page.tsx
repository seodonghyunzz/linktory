'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import {doc, serverTimestamp, setDoc} from "firebase/firestore";

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
      });
      router.push("/"); 
    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            alert('이미 사용 중인 이메일입니다.');
        } else if (error.code === 'auth/invalid-email') {
            alert('유효하지 않은 이메일 형식입니다.');
        } else if (error.code === 'auth/weak-password') {
            alert('비밀번호는 최소 6자 이상이어야 합니다.');
        } else {
            alert('회원가입 중 오류가 발생했습니다.');
        }
    }
  };

  return (
    <div className='max-w-[1280px] w-full mx-auto flex'>
        <form onSubmit={handleSignup} className="flex flex-col mx-auto max-w-[400px] w-full">
        <h2 className="flex justify-center mt-10 mb-8 text-xl font-bold">회원가입</h2>
        <div className='flex flex-col mb-[8px]'>
            <label className='mb-2'>이메일</label>
            <input
                type="email"
                placeholder=""
                className="h-[24px] pl-1 border-b mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div className='flex flex-col'>
            <label className='mb-2'>비밀번호</label>
            <input
                type="password"
                placeholder=""
                className="h-[24px] pl-1  border-b mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <button type="submit" className="h-[45px] mt-[20px] border-none rounded-[16px] text-[16px] cursor-pointer text-[white] bg-black font-[800]">
            회원가입
        </button>
        </form>
    </div>
  )
}