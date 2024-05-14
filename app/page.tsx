import Link from 'next/link';
import React from 'react';
import '@/lib/db';

function Home() {
  return (
    <div className='flex flex-col items-center justify-between min-h-screen p-5'>
      <div className='my-auto *:font-medium flex flex-col items-center gap-2'>
        <span className='text-6xl'>🥕</span>
        <h1 className='text-4xl'>당근</h1>
        <h2>당근 마켓에 어서오세요!</h2>
      </div>
      <div className='flex flex-col items-center gap-3 w-full'>
        <Link href={'/create-account'} className='primary-btn py-2.5 text-lg'>
          시작하기
        </Link>
        <div className='flex gap-2'>
          <span>이미 계정이 있나요?</span>
          <Link href={'/login'} className='hover:underline '>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
