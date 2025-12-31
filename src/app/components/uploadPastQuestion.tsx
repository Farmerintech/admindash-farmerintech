"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { subjects } from "./subjects"
import { Modal } from "@/app/components/modal"

const examTypes = ['JAMB', 'WAEC', "NECO", "GCE/IGCE"]

export const UploadPastQuestion = () => {
  const [form, setForm] = useState<any>({
    subject: "",
    examType: "",
    questionType: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
    explanation: "",
  });
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();

  const handleOptions = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectSubject = (value: string) => {
    setForm({ ...form, subject: value });
  };

  const handleExamType = (value: string) => {
    setForm({ ...form, examType: value });
  };

  const handleQuestionType = (value: string) => {
    setForm({ ...form, questionType: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(undefined);
    setMessage(undefined);

    // Validate required fields
    const requiredFields = [
      "subject", "examType", "question", "optionA", "optionB", 
      "optionC", "optionD", "answer", "explanation", "questionType"
    ];

    const isEmpty = requiredFields.some(
      (field) => form[field as keyof typeof form]?.trim() === ""
    );

    if (isEmpty) {
      setLoading(false);
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://api.citadel-i.com.ng/api/v1/past_question/upload_question",
        {
          method: "POST",
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result?.message || "Something went wrong");
      } else {
        setMessage(result?.message || "Question uploaded successfully!");

        // Reset form for another entry
        setForm({
          subject: "",
          examType: "",
          questionType: "",
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          answer: "",
          explanation: "",
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const allFilled = Object.values(form).every((value) => value.trim() !== "");
    setActive(allFilled);
  }, [form]);

  return (
    <>
      <form
        className="md:flex md:justify-between md:gap-[60px] flex-col md:flex-row w-full"
        onSubmit={handleSubmit}
      >
        <section className="w-full flex gap-[16px] flex-col">
          <Modal message={message || ""} error={error || ""} />

          {/* Subject */}
          <div className="flex flex-col gap-[8px] w-full">
            <label className="text-[#344054]">Subject</label>
            <Select onValueChange={handleSelectSubject} value={form.subject}>
              <SelectTrigger className="w-full p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject, index) => (
                  <SelectItem key={index} value={subject.name}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Exam Type */}
          <div className="flex flex-col gap-[8px] w-full">
            <label className="text-[#344054]">Exam Type</label>
            <Select onValueChange={handleExamType} value={form.examType}>
              <SelectTrigger className="w-full p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
                <SelectValue placeholder="Exam Type" />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Question Type */}
          <div className="flex flex-col gap-[8px] w-full">
            <label className="text-[#344054]">Question Type</label>
            <Select onValueChange={handleQuestionType} value={form.questionType}>
              <SelectTrigger className="w-full p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
                <SelectValue placeholder="Question Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="objective">Objective</SelectItem>
                <SelectItem value="theory">Theory</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Question */}
          <div className="flex flex-col gap-[8px] w-full">
            <label className="text-[#344054]">Question</label>
            <Textarea
              value={form.question}
              onChange={handleTextarea}
              name="question"
              className="w-full p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]"
            />
          </div>

          {/* Options A & B */}
          {["A", "B"].map((opt) => (
            <div className="flex flex-col gap-[8px] w-full" key={opt}>
              <label className="text-[#344054]">Option {opt}</label>
              <input
                type="text"
                className="w-full p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
                name={`option${opt}`}
                value={form[`option${opt}`]}
                onChange={handleOptions}
              />
            </div>
          ))}
        </section>

        <section className="w-full flex flex-col gap-[8px] mt-6 md:mt-0">
          {/* Options C & D */}
          {["C", "D"].map((opt) => (
            <div className="flex flex-col gap-[8px] w-full" key={opt}>
              <label className="text-[#344054]">Option {opt}</label>
              <input
                type="text"
                className="w-full p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
                name={`option${opt}`}
                value={form[`option${opt}`]}
                onChange={handleOptions}
              />
            </div>
          ))}

          {/* Answer */}
          <div className="flex flex-col gap-[8px] w-full">
            <label className="text-[#344054]">Answer</label>
            <input
              type="text"
              className="w-full p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
              name="answer"
              value={form.answer}
              onChange={handleOptions}
            />
          </div>

          {/* Explanation */}
          <div className="flex flex-col gap-[8px] w-full">
            <label className="text-[#344054]">Explanation</label>
            <Textarea
              value={form.explanation}
              name="explanation"
              onChange={handleTextarea}
              className="w-full p-[6px] rounded-[8px] hover:border-[#F6C354] border border-[#667085] h-[48px]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !active}
            className={`mt-10 px-[24px] py-[12px] rounded-[8px] w-full md:w-[230px] text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : active ? "bg-orange-500" : "bg-[#98A2B3]"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </section>
      </form>
    </>
  );
};
