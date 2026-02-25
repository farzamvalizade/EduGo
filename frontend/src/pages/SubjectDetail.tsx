import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  SubjectList,
  IncompleteLessons,
  SubjectStageList,
  completeSubject,
} from "@/services/api/api";
import type { Subject, IncompleteLesson, LessonStage } from "@/types/types";

import StageCard from "../components/StageCard";

import { HashLoader } from "react-spinners";

const SubjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const subjectId = Number(id);

  const [loading, setLoading] = useState(true);

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 0,
      title: "",
      image: "",
      stages_count: 0,
      description: "",
      is_active: false,
      created_at: "",
    },
  ]);

  const [incompleteLessons, setIncompleteLessons] = useState<
    IncompleteLesson[]
  >([
    {
      lesson_id: 0,
      title: "",
      completedStage: 0,
      totalStage: 0,
    },
  ]);

  const [subjectDetail, setSubjectDetail] = useState<Subject>({
    id: 0,
    title: "",
    image: "",
    stages_count: 0,
    description: "",
    is_active: false,
    created_at: "",
  });

  const [subjectIncompleteDetail, setSubjectIncompleteDetail] =
    useState<IncompleteLesson>({
      lesson_id: 0,
      title: "",
      completedStage: 0,
      totalStage: 0,
    });

  const [subjectStages, setSubjectStages] = useState<LessonStage[]>([]);

  useEffect(() => {
    const fetchSubject = async () => {
      const res = await SubjectList();
      const data = res.data as Subject[];
      setSubjects(data);

      const found = data.find((s) => s.id === subjectId);
      if (found) {
        setSubjectDetail(found);
      }
    };

    const fetchIncompleteLessons = async () => {
      const res = await IncompleteLessons();
      const data = res.data as IncompleteLesson[];
      setIncompleteLessons(data);

      const found = data.find((s) => s.lesson_id === subjectId);
      if (found) {
        setSubjectIncompleteDetail(found);
      }
    };

    const fetchSubjectStages = async () => {
      const res = await SubjectStageList(subjectId);
      const data = res as LessonStage[];
      setSubjectStages(data);
      console.log(data);
    };

    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchSubject(),
          fetchIncompleteLessons(),
          fetchSubjectStages(),
        ]);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subjectId]);

  const completedStages = subjectStages.filter(
    (stage) => stage.is_passed,
  ).length;
  const totalStages = subjectDetail.stages_count || 0;

  const progressPercentage =
    totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;

  const [isFullyCompleted, setIsFullyCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (
      totalStages > 0 &&
      completedStages === totalStages &&
      !isFullyCompleted
    ) {
      handleSubjectCompletion();
    }
  }, [completedStages, totalStages]);

  const handleSubjectCompletion = async () => {
    try {
      await completeSubject(subjectId);
      setIsFullyCompleted(true);
      setShowCelebration(true);
    } catch (error) {
      console.error("Failed to mark subject as complete", error);
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

  return (
    <div
      className="flex flex-col min-h-screen bg-secondary p-8 dir-rtl text-white"
      dir="rtl"
    >
      <Link
        to="/home"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="lucide lucide-arrow-left transform scale-x-[-1]"
        >
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        <span>برگشت</span>
      </Link>
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          {/* <Confetti /> If you installed it */}
          <div className="bg-[#1a1a1a] border-2 border-custard rounded-3xl p-8 text-center max-w-sm w-full shadow-[0_0_50px_rgba(255,255,203,0.2)] animate-in zoom-in duration-300">
            <div className="text-6xl mb-4">🎓</div>
            <h2 className="text-2xl font-bold text-custard mb-2">
              تبریک فراوان!
            </h2>
            <p className="text-muted-foreground mb-6">
              شما تمام مراحل درس{" "}
              <span className="text-white font-bold">
                {subjectDetail?.title}
              </span>{" "}
              را با موفقیت پشت سر گذاشتید.
            </p>
            <button
              onClick={() => setShowCelebration(false)}
              className="w-full py-3 bg-custard text-black font-bold rounded-xl hover:scale-105 transition-transform"
            >
              بسیار عالی!
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#19222c]">
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
            className="lucide lucide-calculator"
          >
            <rect width="16" height="20" x="4" y="2" rx="2"></rect>
            <line x1="8" x2="16" y1="6" y2="6"></line>
            <line x1="16" x2="16" y1="14" y2="18"></line>
            <path d="M16 10h.01"></path>
            <path d="M12 10h.01"></path>
            <path d="M8 10h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M8 14h.01"></path>
            <path d="M12 18h.01"></path>
            <path d="M8 18h.01"></path>
          </svg>
        </div>
        <div>
          <h1 className="text-2xl mb-1">{subjectDetail.title}</h1>
          <p className="text-muted-foreground">{subjectDetail.description}</p>
        </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-secondary">
        <div className="flex justify-between items-center mb-3">
          <span className="text-muted-foreground">بطورکلی</span>
          <span className="text-xl">{progressPercentage}%</span>
        </div>
        <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-custard"
            style={{
              width: `${progressPercentage}%`,
            }}
          ></div>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">
          {completedStages} مرحله از {totalStages} مرحله تکمیل شده
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl">مراحل یادگیری</h2>

        <div className="flex flex-col space-y-3 mt-4">
          {Array.isArray(subjectStages) &&
            subjectStages.map((stage, index) => (
              <StageCard
                className="mt-4"
                key={stage.id}
                id={stage.id}
                subject={stage.subject}
                title={stage.title}
                order={index + 1}
                content={stage.content}
                pass_score={stage.pass_score}
                xp_reward={stage.xp_reward}
                is_active={stage.is_active}
                created_at={stage.created_at}
                is_locked={stage.is_locked}
                is_passed={stage.is_passed}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
