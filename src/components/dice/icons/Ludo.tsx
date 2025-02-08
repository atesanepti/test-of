import React from "react";

const Ludo = ({ side }: { side: number }) => {
  if (side == 1) {
    return (
      <svg
        width="100"
        height="100"
        className="w-36 h-36"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="15" fill="#131620" />
        <circle cx="50" cy="50" r="10" fill="white" />
      </svg>
    );
  } else if (side == 2) {
    return (
      <svg
        className="w-36 h-36"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="15" fill="#131620" />
        <circle cx="35" cy="35" r="10" fill="white" />
        <circle cx="65" cy="65" r="10" fill="white" />
      </svg>
    );
  } else if (side == 3) {
    return (
      <svg
        className="w-36 h-36"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="15" fill="#131620" />
        <circle cx="30" cy="30" r="10" fill="white" />
        <circle cx="50" cy="50" r="10" fill="white" />
        <circle cx="70" cy="70" r="10" fill="white" />
      </svg>
    );
  } else if (side == 4)
    return (
      <svg
        className="w-36 h-36"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="15" fill="#131620" />
        <circle cx="30" cy="30" r="10" fill="white" />
        <circle cx="70" cy="30" r="10" fill="white" />
        <circle cx="30" cy="70" r="10" fill="white" />
        <circle cx="70" cy="70" r="10" fill="white" />
      </svg>
    );
  else if (side == 5) {
    return (
      <svg
        className="w-36 h-36"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="15" fill="#131620" />
        <circle cx="30" cy="30" r="10" fill="white" />
        <circle cx="70" cy="30" r="10" fill="white" />
        <circle cx="50" cy="50" r="10" fill="white" />
        <circle cx="30" cy="70" r="10" fill="white" />
        <circle cx="70" cy="70" r="10" fill="white" />
      </svg>
    );
  } else if (side == 6) {
    return (
      <svg
        className="w-36 h-36"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="15" fill="#131620" />
        <circle cx="25" cy="25" r="10" fill="white" />
        <circle cx="50" cy="25" r="10" fill="white" />
        <circle cx="75" cy="25" r="10" fill="white" />
        <circle cx="25" cy="75" r="10" fill="white" />
        <circle cx="50" cy="75" r="10" fill="white" />
        <circle cx="75" cy="75" r="10" fill="white" />
      </svg>
    );
  }
};

export default Ludo;
