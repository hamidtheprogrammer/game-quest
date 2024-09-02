import React from "react";
import { Pagination, productContext } from "../constants/Imports";

type updateProps = {
  click: (productId: string) => void;
};

const GetProducts: React.FC<updateProps> = ({ click }) => {
  const { products } = productContext();
  return (
    <>
      <div className="text-xs w-full flxBtw px-5 mb-5">
        <span>index</span>
        <span className="-translate-x-full">Name</span>
        <span>Edit</span>
      </div>
      <ul className="flxColStart gap-2">
        {products?.length &&
          products.map((prod, idx) => (
            <li
              className="text-xs w-full primaryBg text-white flxBtw px-5 overflow-hidden py-2"
              key={prod._id}
            >
              <span>{idx}</span>
              <span>{prod.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => click(prod._id as string)}
                  className="text-blue-400 font-bold hover:underline"
                >
                  update
                </button>
                <button className="text-blue-400 font-bold hover:underline">
                  delete
                </button>
              </div>
            </li>
          ))}
      </ul>
      <Pagination />
    </>
  );
};

export default GetProducts;
