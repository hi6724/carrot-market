import React from 'react';

function Home() {
  return (
    <main className='h-screen flex justify-center bg-hunmok pt-[60.5px] pb-hunmok '>
      <div className='bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-3 '>
        {['Nico', 'Me', 'You', 'Yourself'].map((person, index) => (
          <div key={index} className='my-container group'>
            <div className='size-10 bg-blue-400 rounded-full' />
            <span className='text-lg font-medium group-hover:text-red-500  group-focus-within:bg-cyan-300'>
              {person}
            </span>
            <div className='size-6  bg-red-500 text-white flex items-center justify-center rounded-full relative'>
              <span className='z-10'>{index}</span>
              <div className='size-6 animate-ping rounded-full bg-red-500 absolute' />
            </div>
            <a href='#'>hello</a>
          </div>
        ))}
        <button className='btn'>HELLO BUTTON</button>
        <input type='text' />
      </div>
    </main>
  );
}

export default Home;
