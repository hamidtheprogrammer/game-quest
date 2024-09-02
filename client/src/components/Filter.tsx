import React, { useEffect, useState } from "react";
import { genreOptions } from "../constants";
import { productContext, Button } from "../constants/Imports";
import { queryProps } from "../Context/ProductContext";

interface filterOptionsProps {
  genre: { value: string[]; isOpen: boolean };
  age: { value: number | null; isOpen: boolean };
  minPrice: { value: number; isOpen: boolean };
  maxPrice: { value: number; isOpen: boolean };
}

const Filter = () => {
  const { setQuery, query } = productContext();
  const [genreOpts] = useState(genreOptions);
  const [filterOptions, setFilterOptions] = useState<filterOptionsProps>({
    genre: { value: [], isOpen: true },
    age: { value: null, isOpen: true },
    minPrice: { value: 0, isOpen: true },
    maxPrice: { value: 1000, isOpen: true },
  });

  const handleClick = (option: string) => {
    switch (option) {
      case "genre":
        setFilterOptions((prev) => ({
          ...prev,
          genre: {
            ...prev.genre,
            isOpen: !prev.genre.isOpen,
          },
        }));
        break;
      case "age":
        setFilterOptions((prev) => ({
          ...prev,
          age: { ...prev.age, isOpen: !prev.age.isOpen },
        }));
        break;
      case "minPrice":
        setFilterOptions((prev) => ({
          ...prev,
          minPrice: {
            ...prev.minPrice,
            isOpen: !prev.minPrice.isOpen,
          },
        }));
        break;
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions((prev) => ({
      ...prev,
      age: { ...prev.age, value: parseInt(e.target.value) },
    }));
  };

  useEffect(() => {
    setQuery((prev: queryProps) => ({
      ...prev,
      genre: filterOptions.genre.value,
      age: filterOptions.age.value,
      minPrice: filterOptions.minPrice.value,
      maxPrice: filterOptions.maxPrice.value,
    }));
  }, [filterOptions]);

  return (
    <div className="px-5 bg-white rounded-3xl py-6">
      <h1 className="font-[530] text-sm mb-5">Filter</h1>
      <ul className="max-sm:text-sm">
        <li>
          <h1 onClick={() => handleClick("genre")} className="filter-boxes">
            <span>By genre</span>
            <span>{filterOptions.genre.isOpen ? "-" : "+"}</span>
          </h1>
          <ul
            className={`${
              !filterOptions.genre.isOpen && "hidden"
            } flxColStart gap-3`}
          >
            {genreOpts.map((genre) => (
              <li key={genre.name} className="space-x-2">
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilterOptions((prev) => ({
                        ...prev,
                        genre: {
                          ...prev.genre,
                          value: [...prev.genre.value, e.target.value],
                        },
                      }));
                    } else {
                      setFilterOptions((prev) => ({
                        ...prev,
                        genre: {
                          ...prev.genre,
                          value: prev.genre.value.filter(
                            (itm) => itm !== e.target.value
                          ),
                        },
                      }));
                    }
                  }}
                  className="w-4 h-4"
                  type="checkbox"
                  value={genre.name}
                  checked={
                    query.genre
                      ? query.genre.includes(genre.name)
                      : filterOptions.genre.value.includes(genre.name)
                  }
                />
                <label htmlFor="">{genre.name}</label>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <h1 onClick={() => handleClick("minPrice")} className="filter-boxes">
            <span>By price </span>
            <span>{filterOptions.minPrice.isOpen ? "-" : "+"}</span>
          </h1>
          <ul
            className={`${
              !filterOptions.minPrice.isOpen && "hidden"
            } space-y-2`}
          >
            <li className="space-x-2 ">
              <label className=" w-[6rem] inline-block" htmlFor="">
                min price
              </label>
              <input
                onChange={(e) => {
                  setFilterOptions((prev) => ({
                    ...prev,
                    minPrice: {
                      ...prev.minPrice,
                      value: parseInt(e.target.value),
                    },
                  }));
                }}
                className="bg-gray-100 w-[4rem] px-1"
                type="number"
                placeholder="0"
                value={filterOptions.minPrice.value}
              />
            </li>
            <li className="space-x-2 ">
              <label className=" w-[6rem] inline-block" htmlFor="">
                max price
              </label>
              <input
                onChange={(e) => {
                  setFilterOptions((prev) => ({
                    ...prev,
                    maxPrice: {
                      ...prev.maxPrice,
                      value: parseInt(e.target.value),
                    },
                  }));
                }}
                className="bg-gray-100 w-[4rem] px-1"
                type="number"
                placeholder="1000"
                value={filterOptions.maxPrice.value}
              />
            </li>
          </ul>
        </li>
        <li>
          <h1 onClick={() => handleClick("age")} className="filter-boxes">
            <span>By age</span>
            <span>{filterOptions.age.isOpen ? "-" : "+"}</span>
          </h1>
          <ul className={`${!filterOptions.age.isOpen && "hidden"} space-y-3`}>
            <li>
              <input
                onChange={(e) => handleAgeChange(e)}
                checked={filterOptions.age.value === 18}
                type="radio"
                value={18}
                name="age"
              />
              <label htmlFor="age">Over 18</label>
            </li>
            <li>
              <input
                onChange={(e) => handleAgeChange(e)}
                checked={filterOptions.age.value === 16}
                type="radio"
                value={16}
                name="age"
              />
              <label htmlFor="age">Over 16</label>
            </li>
            <li>
              <input
                onChange={(e) => handleAgeChange(e)}
                checked={filterOptions.age.value === 12}
                type="radio"
                value={12}
                name="age"
              />
              <label htmlFor="age">less</label>
            </li>
          </ul>
        </li>
      </ul>
      <Button
        click={() => {
          setFilterOptions({
            genre: { value: [], isOpen: true },
            age: { value: null, isOpen: true },
            minPrice: { value: 0, isOpen: true },
            maxPrice: { value: 1000, isOpen: true },
          });
        }}
        name="Reset Filters"
        styles="text-sm capitalize text-white mt-10"
      />
    </div>
  );
};

export default Filter;
