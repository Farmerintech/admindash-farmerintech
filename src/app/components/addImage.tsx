import { ChangeEvent, useState } from "react";

export const AddImageToContent = () => {
  const [isChoosen, setIsChoosen] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState<any>({
    coverImage: ''
  });
  const [uploaded, setIsUploaded] = useState(false);
  const [res, setRes] = useState('');

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const thefile = e.target.files?.[0];
    if (thefile) {
      setForm((prevForm: any) => ({
        ...prevForm,
        coverImage: thefile,
      }));
      setIsChoosen(true);
    }
    setIsUploaded(false)
  };

  const handleImageUpload = async () => {
    if (!form.coverImage) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("coverImage", form.coverImage);

      const response = await fetch(
        "https://citadel-i-project.onrender.com/api/v1/note/upload_cover_image",
        {
          method: "POST",
          credentials: 'include',
          body: formData,
        }
      );

      const result = await response.json();
      setMessage(result?.message);

      if (response.ok) {
        setIsUploaded(true);
        setRes(result?.url);
      } else {
        setError(result?.message || "Something went wrong");
      }

    } catch (error) {
      console.error(error);
      setError("Error connecting to server");
    }
  };

  return (
    <>
      <h2>Add Embedded Image</h2>

      <label className="relative w-full h-[247px] border border-[#667085] xl:w-[430px] rounded-[8px] hover:border-[#F6C354] flex items-center justify-center text-center p-4 cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={handleFile}
        />
        <div className="flex flex-col items-center justify-center gap-2 text-[#475467] pointer-events-none">
          {!isChoosen ? (
            <>
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 17.0002V18.6002C25 20.8405 25 21.9606 24.564 22.8162C24.1805 23.5689 23.5686 24.1808 22.816 24.5643C21.9603 25.0002 20.8402 25.0002 18.6 25.0002H7.4C5.15979 25.0002 4.03969 25.0002 3.18404 24.5643C2.43139 24.1808 1.81947 23.5689 1.43597 22.8162C1 21.9606 1 20.8405 1 18.6002V17.0002M19.6667 10.3336L13 17.0002M13 17.0002L6.33333 10.3336M13 17.0002V1.00024"
                  stroke="#475467"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          ) : (
            <img
              src={URL.createObjectURL(form.coverImage)}
              alt="Preview"
              className="w-full h-[100px]"
            />
          )}
          <p className="font-medium">Add image to content</p>
          <p className="text-sm text-[#667085]">or</p>
          <button
            type="button"
            className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition"
          >
            Choose File
          </button>
        </div>
      </label>

      <div className="mt-4">
        {uploaded ? (
          <>
          <p className="text-green-500">{message}</p>
          <div className="flex gap-[8px] items-center">
            <input placeholder={res} value={res} className="w-[260px] py-[8px] border-1 px-[8px] rounded-[8px]"/>
            <button
              className="bg-blue-500 text-white px-[16px] py-[8px] rounded-[8px]"
              onClick={() => navigator.clipboard.writeText(res)}
            >
              Copy Link
            </button>

          </div>
          </>
        ) : (
          <>
            <button
              className="bg-orange-500 text-white px-[16px] py-[8px] rounded-[8px]"
              onClick={handleImageUpload}
            >
              Upload
            </button>
            <p>{error}</p>
          </>
        )}
      </div>
    </>
  );
};
