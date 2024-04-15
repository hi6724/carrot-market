'use server';

import { z } from 'zod';

const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);
const checkUsername = (username: string) => !username.includes('potato');
const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '아이디는 문자로~',
        required_error: '아이디 어디?',
      })
      .min(3, '넘 짧아요 3글자 이상')
      .max(10, '넘 길어요 10자 이하')
      .transform((username) => `🔥${username}`)
      .refine(checkUsername, 'potato는 들어가면 안대유'),
    email: z.string().email('이메일 형식이 아니에요'),
    password: z
      .string()
      .min(6)
      .regex(
        passwordRegex,
        '비밀번호는 영어 대,소문자와 특수문자 숫자를 포함해야 합니다.'
      ),
    confirm_password: z.string().min(6),
  })
  .refine(checkPasswords, {
    message: '비밀번호가 달라요',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
