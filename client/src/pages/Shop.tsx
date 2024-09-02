import React from "react";
import {
  Filter,
  Pagination,
  ProductCard,
  productContext,
} from "../constants/Imports";
import { Link } from "react-router-dom";

const Shop: React.FC = () => {
  const { products: games, pagination } = productContext();
  return (
    <section className="header-margin">
      <ul className="flxRowCenter gap-2 w-fit text-sm font-[500] mt-8 ml-5">
        <li>
          <Link to={"/"}>{"Home>"}</Link>
        </li>
        <li>Our shop</li>
      </ul>
      <section className="flxRowStart max-sm:flxColStart max-sm:gap-5 mt-14 px-5">
        <div className="sm:w-[25%] w-full md:mt-12 sm:mt-20 relative">
          <Filter />
        </div>
        <div className="sm:w-[75%] w-full">
          <div className="flxBtw max-md:flxColStart max-md:gap-2 px-5 mb-6 max-sm:text-sm">
            <h1 className="text-lg font-[530]">
              Showing "{pagination?.gamesPerPage}" results of "
              {pagination?.total}"
            </h1>
            <span>
              Sort By:{" "}
              <select
                className="bg-black text-white rounded-full px-3 cursor-pointer"
                name="sort"
                id=""
              >
                <option value={"popularity"}>Popularity</option>
                <option value={"lowprice"}>Price:Min-Max</option>
                <option value={"highprice"}>Price:Max-Min</option>
                <option value={"ratings"}>Ratings</option>
              </select>
            </span>
          </div>
          <ul className="flex flex-wrap gap-7 px-5 w-full">
            {games?.map((game) => (
              <ProductCard key={game._id} game={game} />
            ))}
          </ul>
        </div>
      </section>
      <Pagination />
    </section>
  );
};

export default Shop;
