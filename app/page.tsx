import React from 'react';

function Home() {
  return (
    <main className='h-screen flex justify-center bg-hunmok pt-[60.5px] pb-hunmok '>
      <div className='bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-3 '>
        {['Nico', 'Me', 'You', 'Yourself'].map((person, index) => (
          <div
            key={index}
            className='flex items-center gap-5 odd:bg-gray-100 even:bg-cyan-100 rounded-xl border-b-2 p-2.5 pb-5 last:border-0 last:pb-2.5 group'
          >
            <input type='text' />
            <div className='size-10 bg-blue-400 rounded-full' />
            <span className='text-lg font-medium group-hover:text-red-500  group-focus-within:bg-cyan-300'>
              {person}
            </span>
            <div className='size-6  bg-red-500 text-white flex items-center justify-center rounded-full relative'>
              <span className='z-10'>{index}</span>
              <div className='size-6 animate-ping rounded-full bg-red-500 absolute' />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
