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
              bg-[#1a1a1a] rounded-2xl p-5 border-2 border-custard/30 cursor-pointer transition-all duration-300 ease-out hover:border-custard/60 hover:scale-[1.03]"
      tabIndex={0}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="mb-1">{subject}</h4>
          <p className="text-sm text-muted-foreground mb-3">
            {completedStages} از {totalStages} مرحله
          </p>
          {isStarted && (
            <div className="relative h-2 bg-secondary rounded-full overflow-hidden mb-3">
              <div
                className="
                h-full
                bg-custard
                rounded-full
                transition-[width] duration-700 ease-out
              "
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {isHomePage && (
            <Link
              to={continueUrl}
              className="flex items-center gap-2 text-sm text-custard"
            >
              <span>ادامه</span>
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
                className="inline-block transform scale-x-[-1]"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {!isHomePage && !isCompleted && (
        <Link
          to={continueUrl}
          className="
            w-full
            inline-flex items-center justify-center
            rounded-full
            bg-custard/90 text-black
            px-6 py-3
            font-medium
            transition-all duration-300 ease-out
            hover:bg-custard
            hover:scale-[1.02]
            hover:shadow-[0_8px_30px_rgba(255,255,203,0.35)]
            active:scale-95
          "
        >
          {isStarted ? "ادامه دهید" : "شروع کنید"}
        </Link>
      )}
      {isCompleted && (
        <Link
          to={continueUrl}
          className="
            w-full
            inline-flex items-center justify-center
            rounded-full
            bg-[#2a2a2a] text-white
            px-6 py-3
            font-medium
            transition-all duration-300 ease-out
            hover:bg-custard
            hover:scale-[1.02]
            hover:shadow-[0_8px_30px_rgba(255,255,203,0.35)]
            active:scale-95
          "
        >
          کامل شده ✓
        </Link>
      )}
    </div>
  );
};

export default SubjectCard;
