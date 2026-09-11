import type { LoginPayload, User } from "../features/auth-types";
import api from "./api";

export const loginApi = async (
  credentials: LoginPayload
): Promise<User> => {
  const response = await api.get<User[]>("/users", {
    params: {
      email: credentials.email,
      password: credentials.password,
    },
  });

  if (response.data.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = response.data[0];

  return {
    id: user.id,
    email: user.email,
  };
};