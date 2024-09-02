import React, { useState } from "react";
import Button from "./UI/Button";
import { useMutation, useQueryClient } from "react-query";
import * as reviewApi from "../apiClient/reviewApi";
import { toast } from "react-toastify";
import { customError } from "../apiClient/authApi";
import { productData } from "../protectedRoute/ManageProductData";
import { useAuthUI } from "../constants/Imports";

export type reviewProp = {
  productId?: string;
  rating: number;
  comment?: string;
};

type review = {
  game: productData;
  ref: React.ForwardedRef<HTMLDivElement>;
};

const ratingWords = ["Very Bad", "Poor", "Average", "Good", "Excellent"];

const AddReview: React.FC<review> = ({ game, ref }) => {
  const { currentUser, setAuthTab } = useAuthUI();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<string>("read");
  const [writeReview, setWriteReview] = useState<reviewProp>({
    rating: 1,
    comment: "",
  });

  const handleRatingChange = (e: any) => {
    setWriteReview((prev) => ({ ...prev, rating: e.target.value }));
  };

  const handleCommentChange = (e: any) => {
    setWriteReview((prev) => ({ ...prev, comment: e.target.value }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: reviewApi.addReview,
    onSuccess: () => {
      toast.success("Review successfully added");
      setTab("read");
      queryClient.invalidateQueries("getproductbyid");
    },
    onError: (error: customError) => {
      console.log(error);
      toast.error("Failed to add review, Pls try again");
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (currentUser.isAuthenticated) {
      writeReview.productId = game._id;

      mutate(writeReview);
    } else {
      setAuthTab(true);
    }
  };

  return (
    <section ref={ref} className="mt-20">
      <h1 className="mb-3 flxRowStart gap-3">
        <span
          onClick={() => {
            setTab("read");
          }}
          className={`cursor-pointer font-[500] ${
            tab !== "read" && "opacity-50"
          }`}
        >
          Reviews
        </span>
        <span>|</span>
        <span
          onClick={() => {
            setTab("write");
          }}
          className={`cursor-pointer font-[500] ${
            tab !== "write" && "opacity-50"
          }`}
        >
          Write a review
        </span>
      </h1>
      {tab === "read" ? (
        <div>
          {game.reviews && game.reviews.length ? (
            <ul className="flxColStart gap-5">
              {game.reviews.map((r, idx) => (
                <li
                  key={idx}
                  className="flxColStart bg-white rounded-xl gap-3 p-5 text-sm"
                >
                  <span>
                    <i className="fa-solid fa-star text-yellow-400"></i>{" "}
                    {r.rating}
                  </span>
                  <span>{r.comment}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-sm">No reviews</span>
          )}
        </div>
      ) : (
        tab === "write" && (
          <form
            className="text-sm flxColStart gap-5"
            onSubmit={(e) => handleSubmit(e)}
            action="POST"
          >
            <h1 className="font-bold mb-5">Write review</h1>
            <div className="flxRowStart align-top gap-4">
              <label className="w-20" htmlFor="rating">
                Rating:
              </label>
              <select
                name="rating"
                value={writeReview.rating}
                onChange={(e) => {
                  handleRatingChange(e);
                }}
              >
                {ratingWords.map((word, index) => (
                  <option key={index} value={index + 1}>
                    {word}
                  </option>
                ))}
              </select>
            </div>
            <div className="flxRowStart align-top gap-4">
              <label htmlFor="comment" className="relative top-0 w-20">
                Comment:
              </label>
              <textarea
                onChange={(e) => {
                  handleCommentChange(e);
                }}
                rows={4}
                cols={50}
                className="rounded-xl p-4 text-sm  focus:ring-0"
                name="comment"
                id=""
              ></textarea>
            </div>
            <Button
              name={isLoading ? "submitting" : "submit"}
              type="submit"
              styles="uppercase text-white"
            />
          </form>
        )
      )}
    </section>
  );
};

export default AddReview;
