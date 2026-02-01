"use client";

import { useEffect, useState } from "react";
import { FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";
import { Modal } from "@/app/components/modal";

type Props = {
  resourceId: any;
};

export const ViewResources = ({ resourceId }: Props) => {
  const [resource, setResource] = useState<any>(null);
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();

  const fetchResource = async () => {
    if (!resourceId) return;

    try {
      const res = await fetch(
        `https://api.citadel-i.com.ng/api/v1/resources/get_a_resources/${resourceId}`,
        { method: "GET", credentials: "include" }
      );
      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Could not load resource.");
        return;
      }

      setResource(result.resource);
      setMessage(result.message || "Resource retrieved successfully");
    } catch (err) {
      console.error(err);
      setError("Error fetching resource");
    }
  };

  useEffect(() => {
    fetchResource();
  }, [resourceId]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!resource) return <p className="text-gray-500">Loading...</p>;

  return (
    <>
      <Modal message={message || ""} error={error || ""} />

      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* File / Image Preview */}
        {resource.filePath && (
          <img
            src={resource.filePath}
            alt={resource.description}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-4">
          {/* Source */}
          <p className="text-sm text-gray-500 mb-1">Source / Label</p>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.source}</h3>

          {/* Description */}
          <p className="text-gray-700 mb-2">{resource.description}</p>

          {/* Resource For */}
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">For: </span>{resource.resourceFor}
          </p>

          {/* Link */}
          {resource.link && (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-500 font-medium hover:underline mb-2"
            >
              Visit Resource <FaExternalLinkAlt size={14} />
            </a>
          )}

          {/* Status */}
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-semibold">Status: </span>{resource.status}
          </p>

          {/* Uploaded By */}
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-semibold">Uploaded By: </span>{resource.uploadedBy}
          </p>

          {/* Created / Updated */}
          <p className="text-xs text-gray-400 mt-1">
            Created At: {new Date(resource.createdAt).toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">
            Updated At: {new Date(resource.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
};
