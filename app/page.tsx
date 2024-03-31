import React from 'react';

function Home() {
  return (
    <main className='bg-gray-300 h-screen flex items-center justify-center p-5 dark:bg-gray-700'>
      <div className='bg-white w-full shadow-lg p-5 rounded-2xl max-w-screen-sm dark:bg-gray-600'>
        {/* header */}
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <span className='text-gray-600 font-semibold -mb-1 dark:text-gray-300'>
              In transit
            </span>
            <span className='text-4xl font-semibold dark:text-white'>
              Coolblue
            </span>
          </div>
          <div className='rounded-full size-12 bg-orange-400 hover:bg-fuchsia-500' />
        </div>
        {/* 시간 */}
        <div className='my-2 flex items-center gap-2'>
          <span className='bg-green-400 text-white uppercase px-2 py-1.5 text-sm font-medium rounded-full hover:scale-125 transition-all'>
            Today
          </span>
          <span className='dark:text-gray-100'>9:30-10:30</span>
        </div>
        {/* 로딩바 */}
        <div className='relative'>
          <div className='bg-gray-200 rounded-full w-full h-2 absolute' />
          <div className='bg-green-400 rounded-full w-2/3 h-2 absolute' />
        </div>
        {/* hashTags */}
        <div className='flex justify-between items-center mt-5 text-gray-600 text-sm dark:text-gray-300'>
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className='text-gray-400 dark:text-gray-500'>Delivered</span>
        </div>
      </div>
    </main>
  );
}

export default Home;
