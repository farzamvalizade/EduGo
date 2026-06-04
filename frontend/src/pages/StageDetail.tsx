import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StageQuestionList, checkStageAnswers } from "@/services/api/api";
import QuizResult from "./StageResults.tsx";
import type { Question, ApiResponse } from "@/types/types";

import { HashLoader } from "react-spinners";

const StageDetail = () => {
  const { stageId, id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (stageId) {
        StageQuestionList(Number(stageId)).then(setQuestions);
      }
    };
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchQuestions()]);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [stageId]);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (optionId: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const submitAnswers = async () => {
    if (!id || !stageId || Object.keys(selectedAnswers).length === 0) return;
    setIsSubmitting(true);
    try {
      const data = await checkStageAnswers(
        Number(id),
        Number(stageId),
        selectedAnswers,
      );
      setResults(data);
    } catch (error) {
      console.error("Submission failed", error);
      alert("خطا در ثبت پاسخ‌ها");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#1a1a1a",
        }}
      >
        <HashLoader size={60} color={"#ffffcb"} />
      </div>
    );
  }

  if (!currentQuestion)
    return (
      <div className="p-10 text-center text-custard">در حال بارگذاری...</div>
    );

  return (
    <div
      className="min-h-screen bg-linear-to-b from-gray-900 via-black to-black text-white"
      dir="rtl"
    >
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-12">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="
            w-11 h-11
            rounded-full
            bg-[#151515]
            border border-[#262626]
            flex items-center justify-center
            hover:border-custard/40
            transition
          "
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="rotate-180"
            >
              <path d="m12 19-7-7 7-7M19 12H5" />
            </svg>
          </button>

          <div className="text-sm text-gray-400">
            سوال{" "}
            <span className="text-custard font-bold">{currentIndex + 1}</span>{" "}
            از {questions.length}
          </div>
        </div>

        {results ? (
          <QuizResult results={results} onBack={() => navigate(-1)} />
        ) : (
          <div>
            <div className="bg-[#151515] border border-[#262626] rounded-3xl p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">پیشرفت آزمون</span>

                <span className="text-custard font-bold text-xl">
                  {Math.round(((currentIndex + 1) / questions.length) * 100)}%
                </span>
              </div>

              <div className="h-3 bg-[#262626] rounded-full overflow-hidden">
                <div
                  className="h-full bg-custard transition-all duration-700"
                  style={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-[#151515] border border-[#262626] rounded-3xl p-6 lg:p-8 mb-8">
              <div className="mb-3 text-sm text-custard">
                سوال {currentIndex + 1}
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold leading-relaxed">
                {currentQuestion.title}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => {
                const isSelected =
                  selectedAnswers[currentQuestion.id] === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`
                    w-full
                    p-5
                    rounded-2xl
                    border
                    transition-all
                    text-right

                    ${
                      isSelected
                        ? `
                          border-custard
                          bg-custard/10
                          shadow-[0_0_20px_rgba(255,255,203,0.08)]
                        `
                        : `
                          border-[#262626]
                          bg-[#151515]
                          hover:border-custard/30
                        `
                    }
                  `}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`
                        flex-1
                        text-base
                        lg:text-lg

                        ${isSelected ? "text-custard" : "text-white"}
                      `}
                      >
                        {option.text}
                      </span>

                      <div
                        className={`
                        w-6 h-6
                        rounded-full
                        border-2
                        flex items-center justify-center
                        shrink-0

                        ${isSelected ? "border-custard" : "border-gray-600"}
                      `}
                      >
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-custard" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              {currentIndex < questions.length - 1 ? (
                <button
                  disabled={!selectedAnswers[currentQuestion.id]}
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="
                  w-full
                  py-4
                  rounded-2xl
                  bg-[#151515]
                  border border-custard/40
                  text-custard
                  font-bold
                  transition-all
                  hover:border-custard
                  disabled:opacity-30
                  disabled:cursor-not-allowed
                "
                >
                  سوال بعدی
                </button>
              ) : (
                <button
                  onClick={submitAnswers}
                  disabled={
                    isSubmitting || !selectedAnswers[currentQuestion.id]
                  }
                  className="
                  w-full
                  py-4
                  rounded-2xl
                  bg-custard
                  text-black
                  font-bold
                  transition-all
                  hover:scale-[1.01]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
                >
                  {isSubmitting ? "در حال پردازش..." : "مشاهده نتایج نهایی"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StageDetail;
