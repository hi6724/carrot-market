'use client';
import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';
import React from 'react';
import { useFormState } from 'react-dom';
import { createAccount } from './action';

function CreateAccountPage() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요</h1>
        <h2 className='text-xl'>폼을 입력해주세요!</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <FormInput
          name='username'
          placeholder='Username'
          type='text'
          required
        />
        <FormInput type='email' name='email' placeholder='Email' required />
        <FormInput
          type='password'
          name='password'
          placeholder='Password'
          required
        />
        <FormInput
          type='password'
          name='confirm_password'
          placeholder='confirmPassword'
          required
        />
        <FormButton text={'Create Account'} />
      </form>
      <SocialLogin />
    </div>
  );
}

export default CreateAccountPage;
