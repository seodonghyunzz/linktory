'use client'
import Link from 'next/link'
import { auth } from '@/lib/firebase'
import useAuthStore from '../store/authStore'

export default function NavBar() {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col items-center justify-center">
        <Link href="/" className="text-3xl font-extrabold text-blue-600">
          Linktory
        </Link>
        <nav className="mt-4 max-w-[1280px] w-full flex justify-center">
          <ul className="flex gap-x-20">
            {user ? (
              <>
                <div className='flex items-center gap-x-20'>
                    <li>
                    <Link href="/hot" className='hover:underline'>
                        Hot
                    </Link>
                    </li>
                    <li>
                    <Link href="/mybookmarks" className="hover:underline">
                        my bookmarks
                    </Link>
                    </li>
                    <li>
                    <Link href="/" className="hover:underline">
                        Main
                    </Link>
                    </li>
                    {/* <li>
                    <Link href="/liked" className="hover:underline">
                        Liked
                    </Link>
                    </li> */}
                </div>
                <div className='flex items-center gap-x-4'>
                    <li className="text-sm text-gray-600">{user.email}</li>
                    <li>
                    <button
                        onClick={() => auth.signOut()}
                        className="px-3 py-1 text-sm border cursor-pointer rounded-xl hover:bg-gray-100"
                    >
                        로그아웃
                    </button>
                    </li>
                </div>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="px-3 py-1 text-sm hover:underline"
                >
                  로그인
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}