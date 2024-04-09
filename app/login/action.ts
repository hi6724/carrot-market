'use server';

export async function handleForm(
  prevState: null | { errors: string[] },
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(prevState);
  return {
    errors: ['wrong password', 'password too short'],
  };
}
