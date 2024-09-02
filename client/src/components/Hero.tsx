import React, { useEffect, useState } from "react";
import { homepageProps } from "../pages/Home";
import { memberPerks } from "../constants";
import { useNavigate } from "react-router";

type heroProps = { games: homepageProps };

const Hero: React.FC<heroProps> = ({ games }) => {
  const [index, setIndex] = useState(0);
  const heroImages = document.querySelectorAll(".hero-image");
  const navigate = useNavigate();

  useEffect(() => {
    Array.from(heroImages).forEach((img) => {
      // Type assertion to HTMLElement
      (img as HTMLElement).style.transform = `translate(-${index * 100}%)`;
    });
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(index);

      setIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 4000);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [index]); // Ensure the effect reruns when index changes

  return (
    <div className="lg:flxRowStart gap-10 items-center">
      <section className="aspect-video lg:w-[60%] relative">
        <h1 className="text-3xl font-[530] my-7">For you</h1>
        <main className="flxRowStart h-full relative overflow-x-hidden rounded-3xl">
          <button
            onClick={() => {
              setIndex((prev) => (prev === 0 ? 2 : prev - 1));
            }}
            className="carousel-btn left-[5%]"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={() => {
              setIndex((prev) => (prev === 2 ? 0 : prev + 1));
            }}
            className="carousel-btn right-[5%]"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          {games?.trending?.map((trend) => (
            <img
              onClick={() => {
                navigate(`/product-details/${trend._id}`);
              }}
              key={trend._id}
              className={`w-full h-full transition duration-300 hero-image object-cover`}
              src={trend.images && trend?.images[1]}
              alt=""
            />
          ))}
        </main>
        {games?.trending?.map((trend, idx) => (
          <span
            className={`${
              index !== idx && "opacity-0"
            } absolute w-full flex justify-end font-[530] text-3xl transition-opacity duration-500`}
          >
            <p>{trend.name}</p>
          </span>
        ))}
      </section>
      <aside className="flex-1 flxColStart pt-5 max-lg:hidden lg:[40%]">
        <h1 className="flxColStart">
          <span className="font-bold">Member Benefits</span>{" "}
          <span>Exclusive Perks for Members:</span>
        </h1>
        <ul className="flxColStart gap-4 mt-5">
          {memberPerks.map((perk) => (
            <li className="max-w-[20rem]" key={perk.heading}>
              <h1 className="font-[400] primaryTextCol">{perk.heading}</h1>
              <p className="text-xs">{perk.content}</p>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Hero;
