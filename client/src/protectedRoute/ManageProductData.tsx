import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, genreOptions } from "../constants/Imports";

type manageProductProps = {
  onSave: (data: FormData) => void;
  gameToBeUpdated?: productData;
  isLoading: boolean;
};

export type productData = {
  _id?: string;
  name: string;
  price: number;
  imageFiles: File[];
  images?: string[];
  description: string;
  stock: number;
  genre: string[];
  age: number;
  reviews?: {
    rating: number;
    comment: string;
  }[];
};

const productSchema = z.object({
  _id: z.optional(z.string()),
  name: z.string().min(1, { message: "Name required" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  description: z
    .string({ message: "Description required" })
    .refine((data) => data.split(" ").length > 10, {
      message: "minimum of 10 words",
    }),
  stock: z.coerce
    .number()
    .positive({ message: "Stock must be a positive number" }),
  genre: z.array(z.string()).refine((data) => !data || data.length > 0, {
    message: "At least one genre required",
  }),
  age: z.coerce.number().positive({ message: "Age must be a positive number" }),
  images: z.optional(z.array(z.string())),
  imageFiles: z.optional(z.instanceof(FileList), { message: "invalid file" }),
});

const ManageProductData: React.FC<manageProductProps> = ({
  onSave,
  gameToBeUpdated,
  isLoading,
}) => {
  const [genreOpts, setGenreOpts] = useState(genreOptions);
  const handleCheckedChange = (
    idx: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = event.target;
    if (checked) {
      register(`genre.${idx}`);
      setValue(`genre.${idx}`, value);
    } else {
      unregister(`genre.${idx}`);
    }
    setGenreOpts((prev) =>
      prev.map((itm, index) => (index === idx ? { ...itm, checked } : itm))
    );
  };

  const {
    watch,
    register,
    unregister,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<productData>({
    // resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: productData) => {
    console.log(data);

    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (value == null) continue;
      if (Array.isArray(value)) {
        if (key === "reviews") {
          // Handle array of objects (e.g., reviews)
          formData.append(key, JSON.stringify(value));
        } else {
          // Handle array of primitive values
          value.forEach((itr) => {
            formData.append(`${key}`, `${itr}`);
          });
        }
      } else if (key === "imageFiles" && value instanceof FileList) {
        // Handling the FileList (multiple file upload)
        for (const file of value) {
          formData.append(key, file);
        }
      } else {
        formData.append(`${key}`, `${value}`);
      }
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    onSave(formData);
  };

  const watchAll = watch();

  useEffect(() => {
    console.log(watchAll);
  }, [watchAll]);

  useEffect(() => {
    if (gameToBeUpdated) reset(gameToBeUpdated);
  }, [gameToBeUpdated]);
  return (
    <div className="text-black">
      <h1 className="flxColStart py-6 gap-2">Add Product</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flxColStart pt-8 gap-5"
      >
        <div>
          <input
            {...register("name")}
            className="auth-form-input"
            type="text"
            placeholder="Name"
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div>
          <textarea
            className="auth-form-input"
            {...register("description")}
            rows={5}
            placeholder="description"
          />
          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("price")}
            className="auth-form-input"
            type="number"
            placeholder="price"
          />
          {errors.price && <p className="form-error">{errors.price.message}</p>}
        </div>
        <div>
          <input
            {...register("stock")}
            className="auth-form-input"
            type="number"
            placeholder="stock"
          />
          {errors.stock && <p className="form-error">{errors.stock.message}</p>}
        </div>
        <div>
          <input
            {...register("age")}
            className="auth-form-input"
            type="number"
            placeholder="age restriction"
          />
          {errors.age && <p className="form-error">{errors.age.message}</p>}
        </div>
        <div>
          <label htmlFor="genre" className="text-sm">
            Select genre:
          </label>
          {errors.genre && <p className="form-error">{errors.genre.message}</p>}
          <ul className="flxRowStart flex-wrap gap-4 mt-4">
            {genreOpts.map((opt, idx) => (
              <li
                className={`w-[7rem] py-1 rounded-full flxColCenter hover:opacity-70 relative ${
                  watchAll?.genre?.includes(opt.name)
                    ? "primaryBg text-white"
                    : "bg-gray-200"
                }`}
                key={opt.name}
              >
                {opt.name}
                <input
                  onChange={(e) => {
                    handleCheckedChange(idx, e);
                  }}
                  type="checkbox"
                  value={opt.name}
                  checked={watchAll?.genre?.includes(opt.name)}
                  className="opacity-0 absolute w-full h-full cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>
        {gameToBeUpdated?.images && (
          <ul>
            {gameToBeUpdated.images.map((img, idx) => (
              <li className="relative h-[12rem]">
                <p
                  onClick={() => {
                    unregister(`images.${idx}`);
                  }}
                  className="z-10 absolute inset-0 w-full h-full bg-black/50 flxRowCenter items-center text-sm text-white hover:underline cursor-pointer"
                >
                  delete
                </p>
                <img
                  className="h-full aspect-square object-cover"
                  src={img}
                  alt="game image"
                />
              </li>
            ))}
          </ul>
        )}
        <div>
          <label htmlFor="imageFiles" className="text-sm block">
            Attach Image:
          </label>
          {errors.imageFiles && (
            <p className="form-error">{errors.imageFiles.message}</p>
          )}
          <input
            {...register("imageFiles")}
            name="imageFiles"
            className="auth-form-input mt-3"
            type="file"
            accept="image/*"
            multiple
          />
        </div>
        {gameToBeUpdated ? (
          <Button
            type="submit"
            disabled={isLoading}
            name={`${isLoading ? "Updating..." : "Update Product"}`}
            styles=" px-4 py-2 mt-9 mainTextCol"
          />
        ) : (
          <Button
            type="submit"
            disabled={isLoading}
            name={`${isLoading ? "Adding..." : "Add Product"}`}
            styles=" px-4 py-2 mt-9 mainTextCol"
          />
        )}
      </form>
    </div>
  );
};

export default ManageProductData;
