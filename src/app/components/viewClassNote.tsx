"use client";

import { subjects } from '@/app/components/subjects';
import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Section {
  heading: string;
  content: string;
}

type ViewClassNoteProps = {
  id?: number; // or number, depending on your data
};

export const ViewClassNote= ({id}:ViewClassNoteProps) => {
  const [sections, setSections] = useState<Record<string, Section> | null>(null);
  const [rawContent, setRawContent] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError("");
      setData(null);
      try {
        const res = await fetch(
          `https://citadel-i-project.onrender.com/api/v1/note/get_note/${id}`,
          {
            method: "GET",
            credentials:'include',
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch class material");
        }

        const htmlContent = result.data?.content || '';
        setRawContent(htmlContent);
        setData(result.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error connecting to server");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Parse TOC safely
  let TOC: string[] = [];
  if (data?.tableOfContent) {
    try {
      TOC = JSON.parse(data.tableOfContent);
    } catch (e) {
      console.warn("Invalid TOC format:", e);
    }
  }

  return (
    <section className=" w-full md:px-[50px] py-[16px] px-[6px] bg-[#F3F3F3] flex-col md:flex-row flex gap-[24px] justify-between">
      <aside className="w-[290px] h-[300px] py-[24px] px-[12px] flex flex-col gap-[16px] bg-white">
        <p className="p-[8px] gap-[10px] bg-[#FBE3B0]">Lesson Contents</p>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : TOC.length > 0 ? (
            TOC.map((content: string, index: number) => (
              <p key={index}>{content}</p>
            ))
          ) : (
            <p>No Table of Content available</p>
          )}
        </div>
      </aside>

<main className="w-full max-w-full p-6 rounded-sm bg-white overflow-x-none">
  {data && (
    <div>
      <p className="font-bold text-[18px]">Subject: {data.subject}</p>
      <p className="font-bold text-[18px]">
        Class: {data.class} / <span>{data.year}</span>
      </p>
      <p className="font-bold text-[18px]">Term: {data.term}</p>
      <p className="font-bold text-[18px]">Topic: {data.topic}</p>
    </div>
  )}

  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p className="text-red-500">{error}</p>
  ) : (
    <div
      dangerouslySetInnerHTML={{ __html: rawContent }}
      className="p-8 w-full max-w-full overflow-x-auto"
    />
  )}

  <p className="mt-6 text-gray-500">{data?.term}</p>
</main>
    </section>
  );
}
