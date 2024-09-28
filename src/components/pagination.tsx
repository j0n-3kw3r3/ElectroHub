import { useState } from "react";

export const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    handlePageChange,
  };
};
