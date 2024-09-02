import React from "react";
import { ManageProductData } from "../constants/Imports";
import { useMutation, useQueryClient } from "react-query";
import * as adminApi from "../apiClient/adminApi";
import { toast } from "react-toastify";
import { customError } from "../apiClient/authApi";

const AddProduct: React.FC = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: adminApi.addProduct,
    onSuccess: () => {
      toast.success("Product successfully added");
      queryClient.invalidateQueries("authenticate-token");
    },
    onError: (error: customError) => {
      toast.error("Add Product failed");
      console.log(error);
    },
  });

  const handleSave = (data: FormData) => {
    mutate(data);
  };
  return <ManageProductData onSave={handleSave} isLoading={isLoading} />;
};

export default AddProduct;
