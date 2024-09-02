import React, { useEffect, useState } from "react";
import { productContext } from "../constants/Imports";
import { queryProps } from "../Context/ProductContext";

const Pagination: React.FC = () => {
  const { pagination, setQuery } = productContext();
  const [requestPage, setRequestPage] = useState(1);

  const num = [];

  for (let i = 1; i < pagination?.pages + 1; i++) {
    num.push(i);
  }

  useEffect(() => {
    setQuery((prev: queryProps) => ({ ...prev, pageNumber: requestPage }));
  }, [requestPage]);

  return (
    <div className=" w-full flex justify-end pr-20 mt-24">
      <ul className="flxBtw gap-2">
        {num.map((i) => (
          <li
            key={i}
            onClick={() => {
              setRequestPage(i);
            }}
            className={`border-black w-[2rem] flxColCenter items-center border-[1px] cursor-pointer ${
              pagination.pageNumber === i && " bg-black text-white"
            }`}
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
