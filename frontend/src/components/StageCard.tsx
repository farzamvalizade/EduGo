import { Link } from "react-router-dom";

import type { LessonStage } from "@/types/types";

const StageCard = ({
  id,
  subject,
  title,
  order,
  content,
  pass_score,
  xp_reward,
  is_active,
  created_at,
  is_locked,
  is_passed,
}: LessonStage) => {
  return (
    <Link to={`/subjects/${id}/stages/${id}`}>
      <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[#2a2a2a] hover:border-custard/50 cursor-pointer transition-all">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <div>
              {is_passed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-check text-[#22c55e]"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              ) : is_locked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-lock text-muted-foreground"
                  data-fg-o8l47="1.34:5.1764:/src/app/screens/SubjectDetail.tsx:113:23:4650:52:e:Lock::::::D0Cv"
                >
                  <rect
                    width="18"
                    height="11"
                    x="3"
                    y="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle text-primary"
                  data-fg-o8l48="1.34:5.1764:/src/app/screens/SubjectDetail.tsx:115:23:4751:45:e:Circle::::::Ce4Q"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">
                مرحله {order}
              </span>
              <span
                className={`text-xs bg-[#22c55e]/20 text-[#22c55e] px-2 py-0.5 rounded-full ${is_passed ? "" : is_locked ? "" : "hidden"}`}
              >
                {is_passed ? "تکمیل شده" : is_locked ? "قفل شده" : ""}
              </span>
            </div>
            <h4 className="mb-1">{title}</h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StageCard;
