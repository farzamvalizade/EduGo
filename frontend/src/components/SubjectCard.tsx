import { useEffect, useState, type ReactNode } from "react";

import { Link } from "react-router-dom";

interface SubjectCardProps {
  subject: string;
  completedStages: number;
  totalStages: number;
  icon: ReactNode;
  continueUrl: string;
  isHomePage?: boolean;
  isCompleted?: boolean;
  isStarted?: boolean;
}

const SubjectCard = ({
  subject,
  completedStages,
  totalStages,
  icon,
  continueUrl,
  isHomePage = false,
  isCompleted = false,
  isStarted = false,
}: SubjectCardProps) => {
  const progressValue = Math.min((completedStages / totalStages) * 100, 100);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      setProgress(progressValue);
    });
  }, [progressValue]);
  return (
    <div
      className="
      bg-[#1a1a1a]
      rounded-2xl
      p-4 md:p-5
      border border-custard/20
      transition-all duration-300
      hover:border-custard/50
      hover:-translate-y-1
      hover:shadow-lg
    "
    >
      <div className="flex items-start gap-3 md:gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl overflow-hidden bg-[#242424] flex items-center justify-center">
          <img
            src={icon}
            alt={subject}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-base md:text-lg truncate">
            {subject}
          </h4>

          <p className="text-sm text-gray-400 mt-1">
            {completedStages} از {totalStages} مرحله
          </p>

          {isStarted && (
            <>
              <div className="mt-3 h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-custard transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-2 text-xs text-gray-500">
                {Math.floor(progress)}%
              </div>
            </>
          )}

          {isHomePage && (
            <Link
              to={continueUrl}
              className="inline-flex items-center gap-2 mt-3 text-custard text-sm hover:opacity-80"
            >
              ادامه
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="scale-x-[-1]"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {!isHomePage && (
        <div className="mt-5">
          <Link
            to={continueUrl}
            className={`
            w-full
            inline-flex
            items-center
            justify-center
            rounded-xl
            py-3
            font-medium
            transition-all
            duration-300
            ${isCompleted ? "bg-[#2a2a2a] text-white" : "bg-custard text-black"}
          `}
          >
            {isCompleted ? "کامل شده ✓" : "بیشتر ببینید"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default SubjectCard;
