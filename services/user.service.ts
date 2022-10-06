import axios from "axios";

export const getJWT = async (
  email: string | undefined,
  password: string | undefined
) => {
  const body = { identifier: email, password };
  const { data } = await axios.post(
    "http://localhost:1337/api/auth/local",
    body
  );
  return data.jwt;
};
