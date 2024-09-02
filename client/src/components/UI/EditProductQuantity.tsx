import React from "react";

interface props {
  quantity: string;
  onchange: (e: any) => void;
}

const EditProductQuantity: React.FC<props> = ({ quantity, onchange }) => {
  return (
    <select
      onChange={onchange}
      name="quantity"
      value={quantity}
      className="cursor-pointer border-[1px] p-3 rounded-md"
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  );
};

export default EditProductQuantity;
