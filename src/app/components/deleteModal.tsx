"use client";

import React, { useState } from "react";

interface UploadItem {
  id: number | string;
  uploadType: string;
  ResourceId: number | string;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: UploadItem | null;
  onDeleted?: (item: UploadItem) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  item,
  onDeleted,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  if (!isOpen || !item) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.citadel-i.com.ng/api/v1/uploads/delete_upload/${item.id}/${item.uploadType}/${item.ResourceId}`,
        {
          method: "DELETE",
          credentials:"include"
        }
      );
      const data = await res.json();
      if(res.ok){
      alert(data.message)
      }
      console.error(data.message)
      if (!res.ok) {
        throw new Error("Failed to delete item");
      }
      onDeleted?.(item);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Delete Content
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          Are you sure you want to delete this item?
          <span className="font-medium text-gray-800">
            {" "}This action cannot be undone.
          </span>
        </p>

        {error && (
          <p className="text-sm text-red-600 mt-3">{error}</p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
