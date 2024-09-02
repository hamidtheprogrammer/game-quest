import React from "react";
import { useMutation, useQueryClient } from "react-query";
import * as authApi from "../../apiClient/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuthUI } from "../../constants/Imports";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setAccountTab } = useAuthUI();

  const mutation = useMutation({
    mutationFn: authApi.logoutUser,
    onSuccess: () => {
      toast.success("Logout successful");
      navigate("/");
      queryClient.invalidateQueries();
    },
  });

  const handleLogout = () => {
    mutation.mutate();
    setAccountTab(false);
  };
  return (
    <button onClick={handleLogout} className="text-xs highlightTextCol">
      logout
    </button>
  );
};

export default Logout;
