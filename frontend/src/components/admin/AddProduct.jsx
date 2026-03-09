import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import apiClient from "../../services/apiClient";
import toast from "react-hot-toast";

function AddProduct() {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const productSchema = z.object({
    name: z.string().min(3, "Product name required"),
    description: z.string().min(10, "Description too short"),
    price: z.coerce.number().min(1),
    discountPrice: z.coerce.number().optional(),
    category: z.enum(["men", "women"]),
    totalStock: z.coerce.number().min(1),
    featured: z.boolean().optional(),
    variants: z.array(
      z.object({
        size: z.enum(["S", "M", "L", "XL", "XXL", "XXXL"]),
        stock: z.coerce.number().min(0),
        color: z.string().min(2),
      }),
    ),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      variants: [{ size: "M", stock: 0, color: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  // IMAGE UPLOAD
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  // REMOVE IMAGE
  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previewImages];

    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  // SUBMIT FORM
  const onSubmit = async (data) => {
    if (images.length < 2 || images.length > 4) {
      alert("Please upload 2 to 4 images");
      return;
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("discountPrice", data.discountPrice || "");
    formData.append("category", data.category);
    formData.append("totalStock", data.totalStock);
    formData.append("variants", JSON.stringify(data.variants));

    images.forEach((img) => {
      formData.append("images", img);
    });

    const toastId = toast.loading("Creating your account...");
    try {
      const res = await apiClient.post("/product/create", formData);

      toast.success(res.message || "Product Created Successfully", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      res.error(`error in Creating Product ${error}`, {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 px-6 pb-10">
      <h1 className="text-3xl font-bold mb-10">Add New Product</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-8 rounded-xl shadow"
      >
        {/* NAME */}
        <div>
          <label className="font-medium">Product Name</label>
          <input
            {...register("name")}
            className="w-full border p-3 rounded mt-1"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            {...register("description")}
            rows="4"
            className="w-full border p-3 rounded mt-1"
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        {/* PRICE */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="font-medium">Price</label>
            <input
              type="number"
              {...register("price")}
              className="w-full border p-3 rounded mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Discount Price</label>
            <input
              type="number"
              {...register("discountPrice")}
              className="w-full border p-3 rounded mt-1"
            />
          </div>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="font-medium">Category</label>

          <select
            {...register("category")}
            className="w-full border p-3 rounded mt-1"
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>

          <p className="text-red-500 text-sm">{errors.category?.message}</p>
        </div>

        {/* STOCK */}
        <div>
          <label className="font-medium">Total Stock</label>
          <input
            type="number"
            {...register("totalStock")}
            className="w-full border p-3 rounded mt-1"
          />
        </div>

        {/* VARIANTS */}
        <div>
          <h2 className="font-semibold mb-3">Variants</h2>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-4 gap-3 mb-3">
              <select
                {...register(`variants.${index}.size`)}
                className="border p-2 rounded"
              >
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
                <option>XXXL</option>
              </select>

              <input
                type="number"
                placeholder="Stock"
                {...register(`variants.${index}.stock`)}
                className="border p-2 rounded"
              />

              <input
                placeholder="Color"
                {...register(`variants.${index}.color`)}
                className="border p-2 rounded"
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white rounded px-2"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ size: "M", stock: 0, color: "" })}
            className="text-sm text-blue-600"
          >
            + Add Variant
          </button>
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="font-medium block mb-2">Product Images (2–4)</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageUpload"
          />

          {/* UPLOAD BOX */}
          <label
            htmlFor="imageUpload"
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-black transition block"
          >
            Click to upload or drag images
          </label>

          {/* PREVIEW */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {previewImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} className="w-full h-32 object-cover rounded" />

                  {/* REMOVE */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>

                  {/* FRONT BADGE */}
                  {index === 0 && (
                    <span className="absolute bottom-1 left-1 bg-black text-white text-xs px-2 py-1 rounded">
                      Front
                    </span>
                  )}
                </div>
              ))}

              {/* ADD MORE */}
              {previewImages.length < 4 && (
                <label
                  htmlFor="imageUpload"
                  className="flex items-center justify-center border-2 border-dashed rounded h-32 cursor-pointer"
                >
                  +
                </label>
              )}
            </div>
          )}

          <p className="text-xs text-gray-500 mt-2">
            The first uploaded image will be used as the <b>Front Image</b>.
          </p>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-neutral-800"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
