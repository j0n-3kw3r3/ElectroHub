import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import { createProductsEP, fetchCategoriesEP, fetchSubCategoriesEP } from "../../../services";
import { useMutation, useQuery } from "@tanstack/react-query";

// Product management component
export const CreateProduct = ({ setProductSubTab }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [data, setData] = useState({});


  const { data: subCategories } = useQuery({
    queryKey: ["subCategories"],
    queryFn: fetchSubCategoriesEP,
    staleTime: 20 * 1000,
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesEP,
    staleTime: 20 * 1000,
  });

  const handleImageChange = (event) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...fileArray]);
    }
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      const fileArray = Array.from(event.dataTransfer.files).map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...fileArray]);
    }
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProductsEP,
    onSuccess: () => {
      toast.success("Product created successfully");
      setProductSubTab("View Products");
      setSelectedImages([]);
      setData({});
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create product");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const fields = ["name", "price", "discount", "description", "quantity", "category", "subCategory"];

    data?.isFeatured && fields.concat(data.isFeatured);

    fields.forEach((field) => formData.append(field, data[field]));

    const files = document.getElementById("images").files;
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      await mutateAsync(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto border p-4 bg-white shadow-md rounded-lg">
      <form className="space-y-4">
        <div
          className="mt-1 block w-full  border border-dashed rounded-md shadow-sm p-4 text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("images").click()}
        >
          <input type="file" id="images" name="images" multiple className="hidden" onChange={handleImageChange} />
          <span className=" text-default-400"> Click to select or drop images here.</span>
          <div className="flex space-x-2 overflow-x-auto justify-center mt-2">
            {selectedImages.map((image, index) => (
              <img key={index} src={image} alt="preview" className="h-60 object-cover rounded-md" />
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="name" className="block font-bold text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full border rounded-md shadow-sm focus:outline-none px-4 py-2"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="price N" className="block font-bold text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="mt-1 block w-full border rounded-md shadow-sm focus:outline-none px-4 py-2"
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Feature Status
          </label>
          <select
            id="stock"
            name="stock"
            defaultValue={false}
            className="mt-1 block w-full border rounded-md text-sm shadow-sm focus:outline-none px-4 py-2"
            onChange={(e) => setData({ ...data, isFeatured: e.target.value })}
          >
            <option className="block text-sm font-medium hover:bg-primary text-gray-700  " value={true}>
              Feature
            </option>
            <option className="block text-sm font-medium hover:bg-primary text-gray-700  " value={false}>
              Not Featured
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="discount" className="block font-bold text-gray-700">
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            className="mt-1 block w-full border rounded-md shadow-sm focus:outline-none px-4 py-2"
            onChange={(e) => setData({ ...data, discount: e.target.value })}
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block font-bold text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="mt-1 block w-full border focus:outline-none px-4 py-2 rounded-md shadow-sm  "
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></textarea>
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block font-bold text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="0"
            className="mt-1 block w-full border rounded-md shadow-sm focus:outline-none px-4 py-2"
            onChange={(e) => setData({ ...data, quantity: e.target.value })}
          />
        </div>

        {/* Category Select Dropdown */}
        <div>
          <label htmlFor="category" className="block font-bold text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full border rounded-md shadow-sm bg-whi  px-4 py-2 pr-8 leading-tight focus:outline-none   hover:border-gray-400"
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            <option value="">Select a category</option>
            {categories &&
              categories?.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {/* Sub-Category Select Dropdown */}
        <div>
          <label htmlFor="category" className="block font-bold text-gray-700">
            Sub-Category
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full border rounded-md shadow-sm bg-whi  px-4 py-2 pr-8 leading-tight focus:outline-none   hover:border-gray-400"
            onChange={(e) => setData({ ...data, subCategory: e.target.value })}
          >
            <option value="">Select a sub-category</option>
            {subCategories &&
              subCategories?.map((subCategory, index) => (
                <option key={index} value={subCategory?._id}>
                  {subCategory.name}
                </option>
              ))}
          </select>
        </div>

        <Button
          isLoading={isPending}
          className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-md shadow-lg focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Create Product
        </Button>
      </form>
    </div>
  );
};
