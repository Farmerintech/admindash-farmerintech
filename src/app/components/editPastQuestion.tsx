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
import { useSidebar } from "../context/sideBarState"
import { useUser } from "../context/reducer"
import { subjects } from "./subjects"

// const subjects = ['English Language', 'Mathematics']
const examTypes = 
['JAMB', 'WAEC', "NECO", "GCE/IGCE"]

export const EditPastQuestion = () => {
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
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState()
  const { state } = useUser();

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
    setForm({
      ...form,
      subject: value,
    });
  };

  const handleExamType = (value: string) => {
    setForm({
      ...form,
      examType: value,
    });
  };
  const handleQuestionType = (value: string) => {
    setForm({
      ...form,
      questionType: value,
    });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitting form:", form);
  
    // Validate form fields
    const requiredFields = [
      "subject",
      "examType",
      "question",
      "optionA",
      "optionB",
      "optionC",
      "optionD",
      "answer",
      "explanation",
      "questionType",
    ];
  
    const isEmpty = requiredFields.some((field) => form[field as keyof typeof form]?.trim() === "");
  
    if (isEmpty) {
      setActive(false);
      setError("Please fill in all required fields.");
      return;
    }
  
    try {
      const response = await fetch(
        "https://citadel-i-project.onrender.com/api/v1/past_question/upload_question",
        {
          method: "POST",
           credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
  
      const result = await response.json();
      console.log(result)
      if (!response.ok) {
        setError(result?.message || "Something went wrong");
      } else {
        setMessage(result?.message || "Question uploaded successfully!");
      }
  
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Error connecting to server");
    }
  
    // Reset form
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
  };
    useEffect(() => {
    if (
      form.subject !== "" &&
      form.examType !== "" &&
      form.question !== "" &&
      form.optionA !== "" &&
      form.optionB !== "" &&
      form.optionC !== "" &&
      form.optionD !== "" &&
      form.answer !== "" &&
      form.explanation !== "" &&
      form.questionType !== ""
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [form]);



  return (
    <>
    <form
      className="md:flex md:justify-between md:gap-[60px] flex-col md:flex-row w-full"
      onSubmit={handleSubmit}
    >
      <section className="w-full flex gap-[16px] flex-col">
        {/* Subject */}
        <p className="">{message}</p>

        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Subject</label>
          <Select onValueChange={handleSelectSubject}>
            <SelectTrigger className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
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

        {/* ExamType */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Exam Type</label>
          <Select onValueChange={handleExamType}>
            <SelectTrigger className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
              <SelectValue placeholder="Exam Type" />
            </SelectTrigger>
            <SelectContent>
              {examTypes.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Question Type */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Question Type</label>
          <Select onValueChange={handleQuestionType}>
            <SelectTrigger className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
              <SelectValue placeholder="Question Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={"objective"} value={"objective"}>
                {"Objective"}
              </SelectItem>
              <SelectItem key={"Theory"} value={"Theory"}>
                {"Theory"}
              </SelectItem>
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
            className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]"
          />
        </div>

        {/* Option A */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option A</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
            name="optionA"
            value={form.optionA}
            onChange={handleOptions}
          />
        </div>

        {/* Option B */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option B</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
            name="optionB"
            value={form.optionB}
            onChange={handleOptions}
          />
        </div>
      </section>

      <section className="w-full flex flex-col gap-[8px] mt-6 md:mt-0">
        {/* Option C */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option C</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
            name="optionC"
            value={form.optionC}
            onChange={handleOptions}
          />
        </div>

        {/* Option D */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option D</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
            name="optionD"
            value={form.optionD}
            onChange={handleOptions}
          />
        </div>

        {/* Answer */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Answer</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
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
            className="w-full  p-[6px] rounded-[8px] hover:border-[#F6C354] border border-[#667085] h-[48px]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`${
            active ? "bg-orange-500" : ""
          } mt-10 px-[24px] py-[12px] rounded-[8px] bg-[#98A2B3] text-white w-full md:w-[230px]`}
        >
          Submit
        </button>
      </section>
    </form>
    </>
  );
};
