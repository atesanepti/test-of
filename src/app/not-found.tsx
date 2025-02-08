import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 bg-primary">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="text-lg text-white">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 border border-border rounded-lg "
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
