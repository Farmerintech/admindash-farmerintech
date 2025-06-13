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
      }, 1000);

      return () => clearTimeout(timeout); // cleanup to avoid memory leak
    }
  }, [message, error]);

  return (
    <section
      className={`${
        show
          ? "w-1/2 bg-white p-5 absolute z-10 shadow-md top-[50%] left-[30%] md:left-[35%] -translate-y-1/2 -translate-x-1/3 md:-translate-x-[35%]"
          : "hidden"
      }`}
    >
      <p className={`${message ? "text-green-500" : "text-red-500"} text-center`}>
        {message || error}
      </p>
    </section>
  );
};
