import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { RegisterFormData } from "./Register";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./Register";
import Button from "../UI/Button";
import * as authApi from "../../apiClient/authApi";
import { toast } from "react-toastify";

const MyAccountDetails: React.FC = () => {
  const { data, isError } = useQuery({
    queryFn: authApi.getProfile,
  });

  const queryClient = useQueryClient();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: () => {
      toast.success("Account successfully updated");
      queryClient.invalidateQueries("authenticate-token");
    },
    onError: (error: authApi.customError) => {
      toast.error("Registration failed");
      console.log(error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    !isError && reset(data);
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flxColStart pt-2 gap-5">
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
        disabled={isSubmitting}
        name={`${isSubmitting ? "Updating..." : "Update Account"}`}
        styles="w-[18rem] px-0 py-3 mainTextCol"
      />
    </form>
  );
};

export default MyAccountDetails;
