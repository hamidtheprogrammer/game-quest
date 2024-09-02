import React from "react";
import ManageProductData from "./ManageProductData";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { customError } from "../apiClient/authApi";
import * as adminApi from "../apiClient/adminApi";
import { getProductById } from "../apiClient/productApi";

type props = {
  productId: string;
};

const UpdateProduct: React.FC<props> = ({ productId }) => {
  const { data } = useQuery({
    queryFn: () => getProductById(productId),
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: adminApi.updateProduct,
    onSuccess: () => {
      toast.success("Product successfully updated");
    },
    onError: (error: customError) => {
      toast.error(`Product update failed: ${error.message}`);
      console.log(error);
    },
  });

  const handleSave = (data: FormData) => {
    mutate(data);
  };
  return (
    <ManageProductData
      onSave={handleSave}
      isLoading={isLoading}
      gameToBeUpdated={data}
    />
  );
};

export default UpdateProduct;
