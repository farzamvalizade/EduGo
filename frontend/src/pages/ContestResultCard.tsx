import React from "react";
import type { ContestResponse } from "@/types/types";

interface ResultCardProps {
  contest: ContestResponse;
  username: string;
  onBack: () => void;
}

const ContestResultCard: React.FC<ResultCardProps> = ({
  contest,
  onBack,
  username,
}) => {
  const isCreator = username === contest.creator_username;
  const isDraw = contest.is_draw;

  let didWin = false;
  if (!isDraw) {
    if (isCreator) {
      didWin = contest.creator_score > contest.opponent_score;
    } else {
      didWin = contest.opponent_score > contest.creator_score;
    }
  }

  const creatorWon = contest.creator_score > contest.opponent_score && !isDraw;
  const opponentWon = contest.opponent_score > contest.creator_score && !isDraw;

  return (
    <div
      className="min-h-screen bg-linear-to-b from-gray-900 via-black to-black flex items-center justify-center text-white p-4"
      dir="rtl"
    >
      <div className="bg-[#151515] border border-[#262626] rounded-3xl p-8 max-w-xl w-full shadow-2xl relative overflow-hidden">
        <div
          className={`text-center py-6 rounded-2xl mb-8 ${
            isDraw
              ? "bg-amber-500/10 border border-amber-500/30 text-amber-300"
              : didWin
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
          }`}
        >
          <h2 className="text-4xl font-extrabold mb-2">
            {isDraw
              ? "مسابقه مساوی شد!"
              : didWin
                ? "شما پیروز شدید! 🎉"
                : "شما شکست خوردید 🫡"}
          </h2>
          <p className="text-sm opacity-80">
            {isDraw
              ? "+۱۰۰ XP به شما تعلق گرفت"
              : didWin
                ? "+۲۰۰ XP به صندوق شما اضافه شد"
                : "+۵۰ XP دریافت کردید"}
          </p>
        </div>

        <div className="grid grid-cols-3 items-center justify-center gap-4 border border-[#262626] bg-[#1a1a1a] rounded-2xl p-6 text-center">
          <div>
            <div className="text-sm text-gray-400 truncate mb-1">
              {contest.creator_username} {isCreator && "(شما)"}
            </div>
            <div
              className={`text-4xl font-black ${creatorWon ? "text-custard" : "text-white"}`}
            >
              {contest.creator_score}
            </div>
            <span className="text-[10px] text-gray-500 bg-[#262626] px-2 py-0.5 rounded-full mt-1 inline-block">
              میزبان
            </span>
          </div>

          <div className="text-gray-600 font-bold text-xl">VS</div>

          <div>
            <div className="text-sm text-gray-400 truncate mb-1">
              {contest.opponent_username || "حریف"} {!isCreator && "(شما)"}
            </div>
            <div
              className={`text-4xl font-black ${opponentWon ? "text-custard" : "text-white"}`}
            >
              {contest.opponent_score}
            </div>
            <span className="text-[10px] text-gray-500 bg-[#262626] px-2 py-0.5 rounded-full mt-1 inline-block">
              مهمان
            </span>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={onBack}
            className="w-full py-4 rounded-2xl border border-custard/40 text-custard font-bold transition-all hover:bg-custard hover:text-black"
          >
            بازگشت به صفحه‌اصلی
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestResultCard;
