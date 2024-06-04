'use client';

import FormButton from '@/components/button';
import FormInput from '@/components/input';
import SocialLogin from '@/components/social-login';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useFormState } from 'react-dom';
import { login } from './action';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUser } from '../profile/action';
import { User } from '@prisma/client';

export default function LogIn() {
  const router = useSearchParams();
  const navigate = useRouter();
  const email = router.get('email');
  const [state, dispatch] = useFormState(login, null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!email) return;
    getUser({ email }, { email: true }).then((data) => {
      if (data) {
        setUser(data);
        setOpen(true);
      } else {
        navigate.replace('/login');
      }
    });
  }, [email]);

  return (
    <>
      <div className='flex flex-col gap-10 py-8 px-6'>
        <div className='flex flex-col gap-2 *:font-medium'>
          <h1 className='text-2xl'>안녕하세요!</h1>
          <h2 className='text-xl'>Log in with email and password.</h2>
        </div>
        <form action={dispatch} className='flex flex-col gap-3'>
          <FormInput
            name='email'
            type='email'
            placeholder='Email'
            required
            errors={state?.fieldErrors.email}
          />
          <FormInput
            name='password'
            type='password'
            placeholder='Password'
            minLength={PASSWORD_MIN_LENGTH}
            required
            errors={state?.fieldErrors.password}
          />
          <FormButton text='Log in' />
        </form>
        <SocialLogin />
      </div>

      <Transition show={open}>
        <Dialog className='relative z-10' onClose={setOpen}>
          <TransitionChild
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </TransitionChild>

          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <TransitionChild
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <DialogPanel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                  <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                        <ExclamationTriangleIcon
                          className='h-6 w-6 text-red-600'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                        <DialogTitle
                          as='h3'
                          className='text-base font-semibold leading-6 text-gray-900'
                        >
                          사용할 수 없는 계정입니다
                        </DialogTitle>
                        <div className='mt-2 text-start'>
                          <p className='text-sm text-gray-500'>
                            같은 이메일 ({user?.email}) 로 가입된
                            계정이있습니다. 본인의 이메일 이라면,
                            <Link
                              href={'/'}
                              className='underline underline-offset-2'
                            >
                              이메일인증
                            </Link>
                            을 통해 가입할 수 있습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                      onClick={() => setOpen(false)}
                      data-autofocus
                    >
                      닫기
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
