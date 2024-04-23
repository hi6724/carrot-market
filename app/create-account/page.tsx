'use client';
import FormButton from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import React from 'react';
import { useFormState } from 'react-dom';
import { createAccount } from './action';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

function CreateAccountPage() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요</h1>
        <h2 className='text-xl'>폼을 입력해주세요!</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input
          name='username'
          placeholder='Username'
          type='text'
          required
          errors={state?.fieldErrors.username}
        />
        <Input
          type='email'
          name='email'
          placeholder='Email'
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          type='password'
          name='password'
          placeholder='Password'
          errors={state?.fieldErrors.password}
          required
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Input
          type='password'
          name='confirm_password'
          placeholder='confirmPassword'
          errors={state?.fieldErrors.confirm_password}
          required
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormButton text={'Create Account'} />
      </form>
      <SocialLogin />
    </div>
  );
}

export default CreateAccountPage;
