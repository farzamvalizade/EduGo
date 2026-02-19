import { Link } from "react-router-dom";
import type { ApiResponse } from "@/types/types";

const QuizResult = ({
  results,
  onBack,
}: {
  results: ApiResponse;
  onBack: () => void;
}) => (
  <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-6 animate-in fade-in zoom-in duration-300">
    <div
      className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-lg ${results.is_passed ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]"}`}
    >
      <span className="text-4xl">
        {results.is_passed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11 19v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V7q0-.825.588-1.412T5 5h2q0-.825.588-1.412T9 3h6q.825 0 1.413.588T17 5h2q.825 0 1.413.588T21 7v1q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h3q.425 0 .713.288T17 20t-.288.713T16 21H8q-.425 0-.712-.288T7 20t.288-.712T8 19zm-4-8.2V7H5v1q0 .95.55 1.713T7 10.8m7.125 2.325Q15 12.25 15 11V5H9v6q0 1.25.875 2.125T12 14t2.125-.875M17 10.8q.9-.325 1.45-1.088T19 8V7h-2zm-5-1.3"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M7.32.029a8 8 0 0 1 7.18 3.307V1.75a.75.75 0 0 1 1.5 0V6h-4.25a.75.75 0 0 1 0-1.5h1.727A6.5 6.5 0 0 0 1.694 6.424A.75.75 0 1 1 .239 6.06A8 8 0 0 1 7.319.03Zm-3.4 14.852A8 8 0 0 0 15.76 9.94a.75.75 0 0 0-1.455-.364A6.5 6.5 0 0 1 2.523 11.5H4.25a.75.75 0 0 0 0-1.5H0v4.25a.75.75 0 0 0 1.5 0v-1.586a8 8 0 0 0 2.42 2.217"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </span>
    </div>

    <h1 className="text-3xl font-bold text-custard">
      {results.is_passed
        ? "تبریک! مرحله با موفقیت پشت سرگذاشته شد "
        : "دوباره تلاش کن"}
    </h1>

    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#222222]">
        <div className="text-3xl text-custard font-bold">{results.score}</div>
        <div className="text-xs text-muted-foreground">امتیاز کسب شده</div>
      </div>
      <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#222222]">
        <div className="text-3xl text-white font-bold">
          {results.total_questions}
        </div>
        <div className="text-xs text-muted-foreground">کل سوالات</div>
      </div>
    </div>

    <div className="w-full bg-[#1a1a1a] p-4 rounded-2xl border border-[#222222] space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">XP جایزه:</span>
        <span className="text-custard">+{results.xp_gained}</span>
      </div>
    </div>

    <button
      onClick={onBack}
      className="w-full py-4 bg-custard text-black font-bold rounded-full hover:scale-[1.02] transition-transform"
    >
      متوجه شدم
    </button>
  </div>
);

export default QuizResult;
