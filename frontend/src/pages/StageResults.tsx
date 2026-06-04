import { Link } from "react-router-dom";
import type { ApiResponse } from "@/types/types";

const QuizResult = ({
  results,
  onBack,
}: {
  results: ApiResponse;
  onBack: () => void;
}) => (
  <div className="max-w-3xl mx-auto animate-in fade-in zoom-in duration-300">
    <div className="bg-[#151515] border border-[#262626] rounded-3xl p-8 lg:p-10 text-center">
      <div
        className={`
        w-28 h-28 mx-auto mb-6
        rounded-full
        flex items-center justify-center
        border
        ${
          results.is_passed
            ? "border-custard bg-custard/10"
            : "border-red-500/30 bg-red-500/10"
        }
      `}
      >
        {results.is_passed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-custard"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="currentColor"
              d="M7 21v-2h4v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V7q0-.825.588-1.412T5 5h2V3h10v2h2q.825 0 1.413.588T21 7v1q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h4v2zm0-10.2V7H5v1q0 .95.55 1.713T7 10.8m10 0q.9-.325 1.45-1.088T19 8V7h-2z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="text-red-400"
          >
            <path d="M7.32.029a8 8 0 0 1 7.18 3.307V1.75a.75.75 0 0 1 1.5 0V6h-4.25a.75.75 0 0 1 0-1.5h1.727A6.5 6.5 0 0 0 1.694 6.424A.75.75 0 1 1 .239 6.06A8 8 0 0 1 7.319.03Zm-3.4 14.852A8 8 0 0 0 15.76 9.94a.75.75 0 0 0-1.455-.364A6.5 6.5 0 0 1 2.523 11.5H4.25a.75.75 0 0 0 0-1.5H0v4.25a.75.75 0 0 0 1.5 0v-1.586a8 8 0 0 0 2.42 2.217" />
          </svg>
        )}
      </div>

      <h1
        className={`text-3xl lg:text-4xl font-bold mb-3 ${
          results.is_passed ? "text-custard" : "text-red-400"
        }`}
      >
        {results.is_passed ? "تبریک! 🎉" : "نیاز به تلاش بیشتر"}
      </h1>

      <p className="text-gray-400 mb-8">
        {results.is_passed
          ? "شما این مرحله را با موفقیت پشت سر گذاشتید."
          : "این بار موفق نشدید، اما می‌توانید دوباره تلاش کنید."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-black/30 border border-[#262626] rounded-2xl p-5">
          <div className="text-4xl font-bold text-custard mb-2">
            {results.score}
          </div>
          <div className="text-sm text-gray-400">امتیاز</div>
        </div>

        <div className="bg-black/30 border border-[#262626] rounded-2xl p-5">
          <div className="text-4xl font-bold mb-2">
            {results.total_questions}
          </div>
          <div className="text-sm text-gray-400">تعداد سوالات</div>
        </div>

        <div className="bg-black/30 border border-[#262626] rounded-2xl p-5">
          <div className="text-4xl font-bold text-custard mb-2">
            +{results.xp_gained}
          </div>
          <div className="text-sm text-gray-400">XP دریافتی</div>
        </div>
      </div>

      <div className="bg-custard/5 border border-custard/20 rounded-2xl p-5 mb-8">
        <div className="text-sm text-gray-400 mb-2">وضعیت آزمون</div>

        <div
          className={`text-lg font-semibold ${
            results.is_passed ? "text-custard" : "text-red-400"
          }`}
        >
          {results.is_passed ? "قبول شدید" : "قبول نشدید"}
        </div>
      </div>

      <button
        onClick={onBack}
        className="
        w-full
        py-4
        rounded-2xl
        bg-custard
        text-black
        font-bold
        transition-all
        hover:scale-[1.02]
      "
      >
        ادامه
      </button>
    </div>
  </div>
);

export default QuizResult;
