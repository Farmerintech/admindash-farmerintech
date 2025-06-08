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
import { useParams } from "next/navigation"
import { useUser } from "../context/reducer"
import { subjects } from "./subjects"

const examTypes = ['JAMB', 'WAEC', "NECO", "GCE/IGCE"]
type EditPQProps = {
  id?: number;
};
export const EditPastQuestion = ( {id}:EditPQProps) => {
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
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [data, setData] =  useState<any>();
  const handleOptions = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
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
    const requiredFields = [
      "subject", "examType", "question", "optionA", "optionB",
      "optionC", "optionD", "answer", "explanation", "questionType",
    ];
    const isEmpty = requiredFields.some(field => form[field]?.trim() === "");

    if (isEmpty) {
      setActive(false);
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const url = `https://citadel-i-project.onrender.com/api/v1/past_question/edit_question/${id}`;

      const response = await fetch(url, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result?.message || "Something went wrong");
      } else {
        setMessage(result?.message || (id ? "Question updated!" : "Question uploaded!"));
      }

    } catch (error) {
      console.error("Fetch error:", error);
      setError("Error connecting to server");
    }

    if (!id) {
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
  };

  useEffect(() => {
    if (Object.values(form).every(value => value !== "")) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [form]);

const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://citadel-i-project.onrender.com/api/v1/past_question/get_a_questions/${id}`, {
          credentials: 'include',
        });
        const result = await response.json();
          setData(result?.data )
          console.log(result?.data)
          setForm({
            subject: result?.data.subject || "",
            examType: result?.data.examType || "",
            questionType: result?.data.questionType || "",
            question: result?.data?.question || "",
            optionA: result?.data?.optionA || "",
            optionB: result?.data?.optionB || "",
            optionC: result?.data?.optionC || "",
            optionD: result?.data?.optionD || "",
            answer: result?.data?.answer || "",
            explanation: result?.data?.explanation || "",
          });
      } catch (error) {
        console.error(error);
        setError("Error fetching question.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  
}, []);

  return (
    <form className="md:flex md:justify-between md:gap-[60px] flex-col md:flex-row w-full" onSubmit={handleSubmit}>
      <section className="w-full flex gap-[16px] flex-col">
        <p className="text-red-600">{error}</p>
        <p className="text-green-600">{message}</p>

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

        {/* ExamType */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Exam Type</label>
          <Select onValueChange={handleExamType} value={form.examType}>
            <SelectTrigger className="w-full p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
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
          <Select onValueChange={handleQuestionType} value={form.questionType}>
            <SelectTrigger className="w-full p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
              <SelectValue placeholder="Question Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="objective">Objective</SelectItem>
              <SelectItem value="Theory">Theory</SelectItem>
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

        {/* Option A & B */}
        {["A", "B"].map(letter => (
          <div key={letter} className="flex flex-col gap-[8px] w-full">
            <label className="text-[#344054]">Option {letter}</label>
            <input
              type="text"
              name={`option${letter}`}
              value={form[`option${letter}`]}
              onChange={handleOptions}
              className="w-full p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
            />
          </div>
        ))}
      </section>

      <section className="w-full flex flex-col gap-[8px] mt-6 md:mt-0">
        {/* Option C & D */}
        {["C", "D"].map(letter => (
          <div key={letter} className="flex flex-col gap-[8px] w-full">
            <label className="text-[#344054]">Option {letter}</label>
            <input
              type="text"
              name={`option${letter}`}
              value={form[`option${letter}`]}
              onChange={handleOptions}
              className="w-full p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
            />
          </div>
        ))}

        {/* Answer */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Answer</label>
          <input
            type="text"
            name="answer"
            value={form.answer}
            onChange={handleOptions}
            className="w-full p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
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

        <button
          type="submit"
          className={`mt-10 px-[24px] py-[12px] rounded-[8px] text-white w-full md:w-[230px] ${
            active ? "bg-orange-500" : "bg-[#98A2B3]"
          }`}
        >
          {id ? "Update" : "Submit"}
        </button>
      </section>
    </form>
  );
};
