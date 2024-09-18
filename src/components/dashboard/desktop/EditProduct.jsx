import React, { useCallback, useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategoriesEP, fetchSubCategoriesEP, updateProductsEP } from "../../../services";

export function EditProduct({ isOpen, onOpenChange, product }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [data, setData] = useState({});
  const queryClient = useQueryClient(); // Get the query client instance

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
    mutationFn: ({ formData, id }) => updateProductsEP(formData, id), // Accept both formData and id
    onSuccess: () => {
      toast.success("Product updated successfully");
      setSelectedImages([]);
      setData({});
      // Refetch the products query after a successful mutation
      queryClient.invalidateQueries("products");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update product");
    },
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    data?.name && formData.append("name", data?.name);
    data?.price && formData.append("price", data?.price);
    data?.discount && formData.append("discount", data?.discount);
    data?.description && formData.append("description", data?.description);
    data?.quantity && formData.append("quantity", data?.quantity);
    data?.category && formData.append("category", data?.category);
    data?.subCategory && formData.append("subCategory", data?.subCategory);
    data?.stock && formData.append("inStock", data?.stock);
    data?.manufacturer && formData.append("manufacturer", data?.manufacturer);
    data?.isProductNew && formData.append("isProductNew", data?.isProductNew);
    data?.isFeatured && formData.append("isFeatured", data?.isFeatured);

    const files = document.getElementById("images").files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
    }

    try {
      await mutateAsync({ formData, id: product._id });
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update product");
    }
  };

  // dataSheet,

  return (
    <div>
      <Modal isOpen={isOpen} backdrop="blur" scrollBehavior="inside" onOpenChange={onOpenChange}>
        <ModalContent className="max-w-xl mx-auto p-5   rounded-lg shadow">
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold text-gray-900">Update Product</ModalHeader>
              <ModalBody className="mt-4">
                <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div
                    className="mt-1 block w-full border-2 border-gray-300 border-dashed rounded-md shadow-sm p-4 text-center cursor-pointer col-span-2 "
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById("images").click()}
                  >
                    <input
                      type="file"
                      id="images"
                      name="images"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <span className=" text-default-400"> Click to select or drop images here.</span>
                    <div className="flex space-x-2 overflow-x-auto justify-center mt-2">
                      {selectedImages.map((image, index) => (
                        <img key={index} src={image} alt="preview" className="h-60 object-cover rounded-md" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                      type="text"
                      placeholder={product?.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 placeholder:text-xs text-xs "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      placeholder={product?.price}
                      onChange={(e) => setData({ ...data, price: e.target.value })}
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 placeholder:text-xs text-xs "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Discount %</label>
                    <input
                      type="number"
                      placeholder={product?.discount}
                      onChange={(e) => setData({ ...data, discount: e.target.value })}
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 placeholder:text-xs text-xs "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">manufacturer</label>
                    <input
                      type="text"
                      placeholder={product?.manufacturer}
                      onChange={(e) => setData({ ...data, manufacturer: e.target.value })}
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 placeholder:text-xs text-xs "
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      placeholder={product?.quantity}
                      onChange={(e) => setData({ ...data, quantity: e.target.value })}
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 placeholder:text-xs text-xs "
                    />
                  </div>
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                      Product Age (New/Used)
                    </label>
                    <select
                      id="stock"
                      name="stock"
                      className="mt-1 block w-full border rounded-md text-sm shadow-sm focus:outline-none px-4 py-2"
                      onChange={(e) => setData({ ...data, isProductNew: e.target.value })}
                    >
                      <option className="block text-sm font-medium hover:bg-primary text-gray-700  " value={true}>
                        New
                      </option>
                      <option className="block text-sm font-medium hover:bg-primary text-gray-700  " value={false}>
                        Used
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                      Feature Status
                    </label>
                    <select
                      id="stock"
                      name="stock"
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
                  {/* Stock Field - Modified to Select */}
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                      Stock Status
                    </label>
                    <select
                      id="stock"
                      name="stock"
                      className="mt-1 block w-full border rounded-md text-sm shadow-sm focus:outline-none px-4 py-2"
                      onChange={(e) => setData({ ...data, stock: e.target.value })}
                    >
                      <option className="block text-sm font-medium hover:bg-primary text-gray-700  " value={true}>
                        In Stock
                      </option>
                      <option className="block text-sm font-medium hover:bg-primary text-gray-700  " value={false}>
                        Out of Stock
                      </option>
                    </select>
                  </div>
                  {/* Category Select Dropdown */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="mt-1 block w-full border rounded-md text-sm shadow-sm bg-whi  px-4 py-2 pr-8 leading-tight focus:outline-none   hover:border-gray-400"
                      onChange={(e) => setData({ ...data, category: e.target.value })}
                    >
                      <option value="">Select a category</option>
                      {categories &&
                        categories?.map((category, index) => (
                          <option key={index} value={category?._id} className="block text-sm font-medium text-gray-700">
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* Sub-Category Select Dropdown */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Sub-Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="mt-1 block w-full border rounded-md text-sm shadow-sm bg-whi  px-4 py-2 pr-8 leading-tight focus:outline-none   hover:border-gray-400"
                      onChange={(e) => setData({ ...data, subCategory: e.target.value })}
                    >
                      <option value="">Select a sub-category</option>
                      {subCategories &&
                        subCategories?.map((subCategory, index) => (
                          <option
                            key={index}
                            value={subCategory?._id}
                            className="block text-sm font-medium hover:bg-primary text-gray-700  "
                          >
                            {subCategory.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      rows="3"
                      placeholder={product?.description}
                      onChange={(e) => setData({ ...data, description: e.target.value })}
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 placeholder:text-xs text-xs "
                    ></textarea>
                  </div>
                </form>
              </ModalBody>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  isLoading={isPending}
                  className="py-2 px-4 bg-primary/90 hover:bg-primary rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
