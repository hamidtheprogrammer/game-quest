import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Product from "../components/Product";
import { useQuery } from "react-query";
import { getHomePageProducts } from "../apiClient/productApi";
import { productData } from "../protectedRoute/ManageProductData";

export type homepageProps = {
  trending?: productData[];
  shooters?: productData[];
  adventure?: productData[];
  sports?: productData[];
};

const Home: React.FC = () => {
  const [games, setGames] = useState<homepageProps>({});
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getHomePageProducts,
  });

  useEffect(() => {
    setGames(data);
  }, [data]);

  return (
    <div className="wrapper header-margin">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Could not load page, please try again</div>
      ) : (
        <div>
          <Hero games={games} />
          <Product game={games} />
        </div>
      )}
    </div>
  );
};

export default Home;
