import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StageQuestionList, checkStageAnswers } from "@/services/api/api";
import QuizResult from "./StageResults.tsx";
import type { Question, ApiResponse } from "@/types/types";

const StageDetail = () => {
  const { stageId, id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<ApiResponse | null>(null);

  useEffect(() => {
    if (stageId) {
      StageQuestionList(Number(stageId)).then(setQuestions);
    }
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

  if (!currentQuestion)
    return (
      <div className="p-10 text-center text-custard">در حال بارگذاری...</div>
    );

  return (
    <div className="flex flex-col min-h-screen p-6 text-white bg-black">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-[#1a1a1a] rounded-full border border-[#333]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="rotate-180"
          >
            <path d="m12 19-7-7 7-7M19 12H5" />
          </svg>
        </button>
        <div className="text-sm font-medium">
          سوال <span className="text-custard">{currentIndex + 1}</span> از{" "}
          {questions.length}
        </div>
      </div>

      {results ? (
        <QuizResult results={results} onBack={() => navigate(-1)} />
      ) : (
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
          <div className="w-full h-2 bg-[#1a1a1a] rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-custard flex-wrap-reverse transition-[width] duration-700 ease-out"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <h2 className="text-2xl font-bold mb-10 text-right leading-relaxed">
            {currentQuestion.title}
          </h2>

          <div className="space-y-4 flex-1">
            {currentQuestion.options.map((option) => {
              const isSelected =
                selectedAnswers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-custard bg-custard/10 shadow-[0_0_15px_rgba(255,255,203,0.1)]"
                      : "border-[#222222] bg-[#1a1a1a] hover:border-[#333]"
                  }`}
                >
                  <span
                    className={`text-right ${isSelected ? "text-custard" : "text-gray-300"}`}
                  >
                    {option.text}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-custard" : "border-[#444]"}`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 bg-custard rounded-full" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex gap-3">
            {currentIndex < questions.length - 1 ? (
              <button
                disabled={!selectedAnswers[currentQuestion.id]}
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="w-full py-4 bg-[#1a1a1a] border border-custard/50 text-custard rounded-2xl font-bold disabled:opacity-30"
              >
                سوال بعدی
              </button>
            ) : (
              <button
                onClick={submitAnswers}
                disabled={isSubmitting || !selectedAnswers[currentQuestion.id]}
                className="w-full py-4 bg-custard text-black rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
              >
                {isSubmitting ? "در حال پردازش..." : "مشاهده نتایج نهایی"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StageDetail;
