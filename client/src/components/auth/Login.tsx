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
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const Login: React.FC = () => {
  const { setAuthTab } = useAuthUI();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      toast.success("Login successful");
      setAuthTab(false);
      queryClient.invalidateQueries();
    },
    onError: (error: authApi.customError) => {
      toast.error("Login failed");
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
          {...register("email")}
          className="auth-form-input"
          type="text"
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
      <Button
        type="submit"
        disabled={isLoading}
        name={`${isLoading ? "signing in..." : "Sign in"}`}
        styles="w-[18rem] px-0 py-3 mainTextCol"
      />
    </form>
  );
};

export default Login;
