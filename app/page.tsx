import React from 'react';

function Home() {
  return (
    <main className='h-screen flex items-center justify-center p-5 bg-gray-100 sm:bg-red-100 md:bg-blue-100 lg:bg-green-100'>
      <div className='bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2 md:flex-row'>
        <input
          className='w-full rounded-full py-3 bg-gray-200 pl-5 outline-none ring ring-transparent ring-offset-2 transition-shadow focus:ring-green-500 placeholder:font-bold
          invalid:focus:ring-red-700 peer'
          type='email'
          required
          placeholder='Email address'
        />
        <span className='text-red-500 font-medium hidden peer-invalid:block'>
          Email is required.
        </span>
        <button
          className='text-white py-2 rounded-full  transition-all font-medium focus:scale-90 outline-none bg-black md:px-10
        peer-invalid:bg-red-900'
        >
          Login
        </button>
      </div>
    </main>
  );
}

export default Home;
