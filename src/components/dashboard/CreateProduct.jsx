import React, { useState, useCallback } from "react";

// Product management component
export const CreateProduct = () => {
  const [selectedImages, setSelectedImages] = useState([]);

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

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-bold text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 px-4 py-2"
          />
        </div>
        <div
          className="mt-1 block w-full border-2 border-gray-300 border-dashed rounded-md shadow-sm p-4 text-center cursor-pointer"
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
          <label htmlFor="price" className="block font-bold text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 px-4 py-2"
          />
        </div>
        <div>
          <label htmlFor="discount" className="block font-bold text-gray-700">
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 px-4 py-2"
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 px-4 py-2"
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-white px-4 py-2 pr-8 leading-tight focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 hover:border-gray-400"
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        {/* Stock Field - Modified to Select */}
        <div>
          <label htmlFor="stock" className="block font-bold text-gray-700">
            Stock Status
          </label>
          <select
            id="stock"
            name="stock"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 px-4 py-2"
          >
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-md shadow-lg focus:outline-none focus:shadow-outline"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};
