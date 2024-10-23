import React from "react";
import { Button, useAuthUI } from "../../constants/Imports";
import * as authApi from "../../apiClient/authApi";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "react-query";

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: "username required" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Registration: React.FC = () => {
  const { setAuthTab } = useAuthUI();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success("Registration successful");
      setAuthTab(false);
      queryClient.invalidateQueries("authenticate-token");
    },
    onError: (error: authApi.customError) => {
      toast.error("Registration failed");
      console.log(error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flxColCenter pt-8 gap-5">
      <div>
        <input
          {...register("username")}
          className="auth-form-input"
          type="text"
          placeholder="username"
        />
        {errors.username && (
          <p className="text-sm highlightTextCol">{errors.username.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("email")}
          className="auth-form-input"
          type="email"
          placeholder="email"
        />
        {errors.email && (
          <p className="text-sm highlightTextCol">{errors.email.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("password")}
          className="auth-form-input"
          type="password"
          placeholder="password"
        />
        {errors.password && (
          <p className="text-sm highlightTextCol">{errors.password.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("confirmPassword")}
          className="auth-form-input"
          type="password"
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <p className="text-sm highlightTextCol">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        name={`${isLoading ? "creating..." : "Create Account"}`}
        styles="w-[18rem] px-0 py-3 mainTextCol"
      />
    </form>
  );
};

export default Registration;
