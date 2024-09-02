import React, { useCallback, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

export function EditProduct({ isOpen, onOpenChange }) {
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
    <div>
      <Modal isOpen={isOpen} backdrop="blur" scrollBehavior="inside" onOpenChange={onOpenChange}>
        <ModalContent className="max-w-xl mx-auto p-5   rounded-lg shadow">
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold text-gray-900">Update Product</ModalHeader>
              <ModalBody className="mt-4">
                <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Discount</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 "
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      rows="3"
                      className="mt-1 block w-full rounded-md border shadow-sm focus:outline-none px-4 py-2 "
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
                  className="py-2 px-4 bg-primary/90 hover:bg-primary rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
