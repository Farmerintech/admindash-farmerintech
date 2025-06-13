"use client";
import { useEffect, useState } from "react";

type ModalProps = {
  message: string;
  error: string;
};

export const Modal = ({ message, error }: ModalProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ((message && message !== "") || (error && error !== "")) {
      setShow(true);
      const timeout = setTimeout(() => {
        setShow(false);
      }, 2000);

      return () => clearTimeout(timeout); // cleanup to avoid memory leak
    }
  }, [message, error]);

  return (
    <section
      className={`${
        show
          ? "fixed inset-0 z-50 flex items-center justify-center"
          : "hidden"
      }`}
    >
      <div className="w-1/2 max-w-md bg-white p-5 shadow-lg rounded-md">
        <p
          className={`${
            message ? "text-green-500" : "text-red-500"
          } text-center`}
        >
          {message || error}
        </p>
      </div>
    </section>
  );
};
