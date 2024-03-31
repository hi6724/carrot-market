import React from 'react';

function Home() {
  return (
    <main className='bg-gray-300 h-screen flex items-center justify-center p-5 dark:bg-gray-700'>
      <div className='bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2'>
        <input
          className='w-full rounded-full py-3 bg-gray-200 pl-5 outline-none ring ring-transparent ring-offset-2 transition-shadow focus:ring-orange-500 placeholder:font-bold'
          type='text'
          placeholder='Search heer...'
        />
        <button className=' bg-black text-white py-2 rounded-full  transition-transform font-medium focus:scale-90 outline-none'>
          Search
        </button>
      </div>
    </main>
  );
}

export default Home;
