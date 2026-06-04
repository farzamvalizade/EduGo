import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  joinOrCreateContest,
  submitContestAnswers,
  getContestStatus,
  cancelWaitingContest,
} from "@/services/api/api";
import { HashLoader } from "react-spinners";
import ContestResultCard from "./ContestResultCard";
import type { ContestResponse, Question } from "@/types/types";
import authService from "@/services/auth/authService";

import Navbar from "@/components/Navbar";

const ContestDashboard = () => {
  const navigate = useNavigate();

  const [gameState, setGameState] = useState<
    "idle" | "matching" | "playing" | "waiting_opponent" | "finished"
  >("idle");
  const [contest, setContest] = useState<ContestResponse | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((res) => {
        setCurrentUsername(res.data.username);
      })
      .catch((err) => console.error("خطا در گرفتن کاربر فعلی.", err));
  }, []);

  useEffect(() => {
    return () => stopPolling();
  }, []);

  const handleStartContest = async () => {
    setGameState("matching");
    try {
      const data = await joinOrCreateContest();
      setContest(data.contest);

      if (data.contest.status === "playing") {
        setQuestions(data.contest.questions);
        setGameState("playing");
      } else {
        startPollingLoop(data.contest.id, "playing");
      }
    } catch (error) {
      console.error("Matchmaking error", error);
      setGameState("idle");
      alert("خطا در برقراری ارتباط با سرور صف مسابقات");
    }
  };

  const startPollingLoop = (
    contestId: number,
    targetStatus: "playing" | "finished",
  ) => {
    stopPolling();
    pollingRef.current = setInterval(async () => {
      try {
        const updatedData = await getContestStatus(contestId);
        setContest(updatedData);

        if (targetStatus === "playing" && updatedData.status === "playing") {
          stopPolling();
          setQuestions(updatedData.questions);
          setGameState("playing");
        } else if (
          targetStatus === "finished" &&
          updatedData.status === "finished"
        ) {
          stopPolling();
          setGameState("finished");
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    }, 3000);
  };

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (optionId: number) => {
    if (!currentQuestion) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNextOrSubmit = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (!contest) return;
      setIsSubmitting(true);
      try {
        const finalData = await submitContestAnswers(
          contest.id,
          selectedAnswers,
        );
        setContest(finalData.contest);

        if (finalData.contest.status === "finished") {
          setGameState("finished");
        } else {
          setGameState("waiting_opponent");
          startPollingLoop(contest.id, "finished");
        }
      } catch (error) {
        console.error("Submission error", error);
        alert("خطا در ثبت نهایی پاسخ‌ها وجود دارد.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (gameState === "idle") {
    return (
      <div
        className="min-h-screen bg-linear-to-b from-gray-900 via-black to-black flex items-center justify-center text-white p-4"
        dir="rtl"
      >
        <Navbar />

        <div className="bg-[#151515] border border-[#262626] rounded-3xl p-8 max-w-md w-full text-center shadow-xl pt-28 lg:pt-32 py-8 lg:px-8 lg:py-12">
          <h1 className="text-3xl font-extrabold text-custard mb-4">
            رقابت آنلاین دو نفره
          </h1>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            وارد یک رقابت هیجان‌انگیز ۳ سوالی با یک کاربر تصادفی شوید! برنده{" "}
            <span className="text-custard font-bold">۲۰۰ XP</span> و بازنده{" "}
            <span className="text-custard font-bold">۵۰ XP</span> دریافت می‌کند.
            مساوی هر دو بازیکن را صاحب{" "}
            <span className="text-custard font-bold">۱۰۰ XP</span> خواهد کرد.
          </p>
          <button
            onClick={handleStartContest}
            className="w-full py-4 rounded-2xl bg-custard text-black font-bold text-lg hover:scale-[1.02] transition-all"
          >
            شروع رقابت و یافتن حریف
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "matching" || gameState === "waiting_opponent") {
    const handleCancelMatchmaking = async () => {
      if (!contest) return;

      try {
        stopPolling();

        await cancelWaitingContest(contest.id);

        setContest(null);
        setGameState("idle");
      } catch (error) {
        console.error("Failed to cancel matchmaking room:", error);
        alert("خطا در لغو مسابقه. ممکن است حریف شما وارد بازی شده باشد!");

        if (contest) startPollingLoop(contest.id, "playing");
      }
    };

    return (
      <div
        className="min-h-screen bg-[#1a1a1a] flex flex-col justify-center items-center text-white px-4 text-center"
        dir="rtl"
      >
        <HashLoader size={60} color={"#ffffcb"} />

        <p className="mt-6 text-xl text-custard animate-pulse font-medium">
          {gameState === "matching"
            ? "در حال یافتن یک حریف آنلاین قدرتمند..."
            : "در انتظار ثبت نهایی پاسخ‌های حریف شما..."}
        </p>

        <p className="text-xs text-gray-500 mt-2 mb-8">لطفاً صفحه را نبندید.</p>

        {gameState === "matching" && (
          <button
            onClick={handleCancelMatchmaking}
            className="
              px-6 py-3
              rounded-xl
              bg-transparent
              border border-rose-500/40
              text-rose-400
              text-sm font-semibold
              transition-all duration-200
              hover:bg-rose-500/10 hover:border-rose-500
              active:scale-[0.98]
            "
          >
            انصراف و بازگشت به خانه
          </button>
        )}
      </div>
    );
  }

  if (gameState === "finished" && contest) {
    return (
      <ContestResultCard
        contest={contest}
        username={currentUsername}
        onBack={() => {
          setGameState("idle");
          navigate("/home");
        }}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <div
      className="min-h-screen bg-linear-to-b from-gray-900 via-black to-black text-white"
      dir="rtl"
    >
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-12">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              stopPolling();
              setGameState("idle");
            }}
            className="w-11 h-11 rounded-full bg-[#151515] border border-[#262626] flex items-center justify-center hover:border-custard/40 transition"
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

        <div className="bg-[#151515] border border-[#262626] rounded-3xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">پیشرفت چالش رقابتی</span>
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
            سؤال شماره {currentIndex + 1}
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold leading-relaxed">
            {currentQuestion.title}
          </h2>
        </div>

        <div className="space-y-4">
          {currentQuestion.options?.map((option) => {
            const isSelected =
              selectedAnswers[currentQuestion.id] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`w-full p-5 rounded-2xl border transition-all text-right ${
                  isSelected
                    ? "border-custard bg-custard/10 shadow-[0_0_20px_rgba(255,255,203,0.08)]"
                    : "border-[#262626] bg-[#151515] hover:border-custard/30"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`flex-1 text-base lg:text-lg ${isSelected ? "text-custard" : "text-white"}`}
                  >
                    {option.text}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-custard" : "border-gray-600"}`}
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
          <button
            disabled={!selectedAnswers[currentQuestion.id] || isSubmitting}
            onClick={handleNextOrSubmit}
            className={`w-full py-4 rounded-2xl font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
              currentIndex < questions.length - 1
                ? "bg-[#151515] border border-custard/40 text-custard hover:border-custard"
                : "bg-custard text-black hover:scale-[1.01]"
            }`}
          >
            {isSubmitting
              ? "ثبت پاسخ پایانی..."
              : currentIndex < questions.length - 1
                ? "سوال بعدی"
                : "ثبت و ارسال نهایی نتایج چالش"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestDashboard;
