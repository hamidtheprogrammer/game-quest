import { RegisterFormData } from "../components/auth/Login";
export const serverUrl = import.meta.env.VITE_API_BASE_URL;

export class customError extends Error {
  status: number;
  response: object | string;

  constructor(message: string, status: number, response: object | string) {
    super(message);
    this.status = status;
    this.response = response;
  }
}

export interface IUser {
  username?: string;
  email?: string;
  password?: string;
}

export const register = async (data: IUser) => {
  const response = await fetch(`${serverUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) {
    const error = new customError(
      body.message || "something went wrong",
      response.status,
      body
    );

    throw error;
  }

  return body;
};

export const login = async (data: RegisterFormData) => {
  const response = await fetch(`${serverUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    const error = new customError(
      body.message || "Something went wrong!",
      response.status,
      body
    );

    throw error;
  }

  return body;
};

export const authenticateToken = async () => {
  const response = await fetch(`${serverUrl}/verify-token`, {
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    const error = new customError(
      body.auth || "something went wrong",
      response.status,
      body
    );

    throw error;
  }

  return body;
};

export const getProfile = async () => {
  const response = await fetch(`${serverUrl}/get-profile`, {
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    const error = new customError(
      body.message || "Something went wrong",
      response.status,
      body
    );
    throw error;
  }

  return body;
};

export const updateProfile = async (data: IUser) => {
  const response = await fetch(`${serverUrl}/update-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) {
    const error = new customError(
      body.message || "something went wrong",
      response.status,
      body
    );

    throw error;
  }

  return body;
};

export const logoutUser = async () => {
  const response = await fetch(`${serverUrl}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const body = await response.json();

  return body;
};
