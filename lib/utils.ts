export const fetchAsync = async (
  input: string | URL | Request,
  init?: RequestInit | undefined
) => {
  const data = await fetch(input, init);
  const parsedData = await data.json();
  return parsedData;
};
