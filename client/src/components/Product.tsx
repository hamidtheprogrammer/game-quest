import React from "react";

import ProductCard from "./UI/ProductCard";
import { homepageProps } from "../pages/Home";

type gameProps = {
  game: homepageProps;
};

const Product: React.FC<gameProps> = ({ game }) => {
  const listClassName =
    "flxRowStart items-center gap-5 h-[27rem] w-[90vw] overflow-x-scroll genre-nav";
  const genreHeading = "Capitalize text-2xl font-[530] mb-5 ";

  return (
    <div className="w-full flxColStart gap-10 mt-20">
      <section>
        <h1 className={`${genreHeading}`}>Shooters</h1>
        <ul className={`${listClassName}`}>
          {game?.shooters?.map((game) => (
            <li key={game._id}>
              <ProductCard game={game} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1 className={`${genreHeading}`}>Adventure</h1>
        <ul className={`${listClassName}`}>
          {game?.adventure?.map((game) => (
            <li key={game._id}>
              <ProductCard game={game} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        {" "}
        <h1 className={`${genreHeading}`}>Sports</h1>
        <ul className={`${listClassName}`}>
          {game?.sports?.map((game) => (
            <li key={game._id}>
              <ProductCard game={game} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Product;
