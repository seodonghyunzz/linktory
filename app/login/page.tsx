'use client'

import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/')
    } catch (error: any) {
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else if (error.code === 'auth/user-not-found') {
            alert('존재하지 않는 사용자입니다.');
        } else {
            alert('로그인 중 오류가 발생했습니다.');
            console.error(error);
        }
        }
  }

  return (
    <div className="flex flex-col max-w-[1280px] mx-auto">
    <form onSubmit={handleLogin} className='flex flex-col mx-auto max-w-[400px] w-full'>
      <h2 className="flex justify-center mt-10 mb-8 text-xl font-bold">로그인</h2>
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
      <button type="submit" className="h-[45px] mt-[20px] border-none rounded-[16px] text-[16px] mb-4 text-[white] bg-black font-[800] cursor-pointer">
        로그인
      </button>
      <div className='flex justify-center'>
      <a href='/signup'>회원가입</a>
      </div>
    </form>
    </div>
  )
}