"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState, ChangeEvent, FormEvent } from "react"
import { useSearchParams } from "next/navigation"
import { useUser } from "../context/reducer"

const Years = ["Year1", "Year2", "Year3", "Year4", "Year5", "Year6"]
const Terms = ["First Term", "SecondTerm", "Third Term"]
const subjects = ['English Language', 'Mathematics']
const classes = ['KS1', 'KS2']

export const EditExamQuestion = () => {
  const { state } = useUser();
  const searchParams = useSearchParams();
  const questionId = searchParams.get("id");

  const [form, setForm] = useState({
    subject: "",
    class: "",
    year: "",
    term: "",
    questionType: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
    explanation: "",
  });

  const [active, setActive] = useState(false);
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();

  // Fetch existing question for editing
  useEffect(() => {
    const fetchQuestion = async () => {
      if (!questionId) return;

      try {
        const response = await fetch(
          `https://citadel-i-project.onrender.com/api/v1/exam_question/single_question/${questionId}`,
          {
            credentials: 'include',
          }
        );
        const data = await response.json();

        if (response.ok) {
          setForm({
            subject: data.subject || "",
            class: data.class || "",
            year: data.year || "",
            term: data.term || "",
            questionType: data.questionType || "",
            question: data.question || "",
            optionA: data.optionA || "",
            optionB: data.optionB || "",
            optionC: data.optionC || "",
            optionD: data.optionD || "",
            answer: data.answer || "",
            explanation: data.explanation || "",
          });
        } else {
          setError(data.message || "Failed to load question");
        }
      } catch (err) {
        setError("Error fetching question");
      }
    };

    fetchQuestion();
  }, [questionId]);

  // Handle input
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle select inputs
  const handleSelect = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  // Enable submit only when all fields are filled
  useEffect(() => {
    const allFilled = Object.values(form).every((v) => v.trim() !== "");
    setActive(allFilled);
  }, [form]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        questionId
          ? `https://citadel-i-project.onrender.com/api/v1/exam_question/update_question/${questionId}`
          : `https://citadel-i-project.onrender.com/api/v1/exam_question/upload_question`,
        {
          method: questionId ? "PUT" : "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Something went wrong");

      setMessage(result.message);
    } catch (err: any) {
      setError(err.message || "Error connecting to server");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="md:flex md:justify-between md:gap-[60px] flex-col md:flex-row w-full">
      <section className="w-full flex gap-[16px] flex-col">
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label>Subject</label>
          <Select value={form.subject} onValueChange={(val) => handleSelect("subject", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Class */}
        <div className="flex flex-col gap-2">
          <label>Class</label>
          <Select value={form.class} onValueChange={(val) => handleSelect("class", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year */}
        <div className="flex flex-col gap-2">
          <label>Year</label>
          <Select value={form.year} onValueChange={(val) => handleSelect("year", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {Years.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Term */}
        <div className="flex flex-col gap-2">
          <label>Term</label>
          <Select value={form.term} onValueChange={(val) => handleSelect("term", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              {Terms.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Question Type */}
        <div className="flex flex-col gap-2">
          <label>Question Type</label>
          <Select value={form.questionType} onValueChange={(val) => handleSelect("questionType", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="objective">Objective</SelectItem>
              <SelectItem value="theory">Theory</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Question */}
        <div className="flex flex-col gap-2">
          <label>Question</label>
          <Textarea name="question" value={form.question} onChange={handleChange} />
        </div>

        {/* Options A & B */}
        {["optionA", "optionB"].map((opt) => (
          <div key={opt} className="flex flex-col gap-2">
            <label>{`Option ${opt.charAt(opt.length - 1).toUpperCase()}`}</label>
            <input
              type="text"
              name={opt}
              value={(form as any)[opt]}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
        ))}
      </section>

      <section className="w-full flex flex-col gap-2 mt-6 md:mt-0">
        {/* Options C & D */}
        {["optionC", "optionD"].map((opt) => (
          <div key={opt} className="flex flex-col gap-2">
            <label>{`Option ${opt.charAt(opt.length - 1).toUpperCase()}`}</label>
            <input
              type="text"
              name={opt}
              value={(form as any)[opt]}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
        ))}

        {/* Answer */}
        <div className="flex flex-col gap-2">
          <label>Answer</label>
          <input
            type="text"
            name="answer"
            value={form.answer}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        {/* Explanation */}
        <div className="flex flex-col gap-2">
          <label>Explanation</label>
          <Textarea name="explanation" value={form.explanation} onChange={handleChange} />
        </div>

        <button
          type="submit"
          disabled={!active}
          className={`mt-4 p-2 rounded text-white ${active ? "bg-green-600" : "bg-gray-400"}`}
        >
          {questionId ? "Update Question" : "Submit Question"}
        </button>
      </section>
    </form>
  );
};
