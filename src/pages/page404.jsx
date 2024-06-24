import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

function Page404() {
  return (
    <div className="h-screen flex items-center justify-center flex-col bg-primary/10">
      <div className="text-center p-10 bg-white shadow-xl rounded-lg">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-semibold mt-4">Page Not Found</p>
        <p className="mt-4">The page you're looking for doesn't seem to exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary/90 transition duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default Page404;
