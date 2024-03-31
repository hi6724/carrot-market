import React from 'react';

function Home() {
  return (
    <main className='h-screen flex items-center justify-center p-5 bg-gray-100 sm:bg-red-100 md:bg-blue-100 lg:bg-green-100'>
      <div className='bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2 md:flex-row'>
        <input
          className='w-full rounded-full py-3 bg-gray-200 pl-5 outline-none ring ring-transparent ring-offset-2 transition-shadow focus:ring-orange-500 placeholder:font-bold'
          type='text'
          placeholder='Search here...'
        />
        <button className=' bg-black text-white py-2 rounded-full  transition-transform font-medium focus:scale-90 outline-none md:px-10'>
          Search
        </button>
      </div>
    </main>
  );
}

export default Home;
