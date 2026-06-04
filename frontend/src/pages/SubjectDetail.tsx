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
      className="min-h-screen bg-linear-to-b from-gray-900 via-black to-black text-white"
      dir="rtl"
    >
      <div className="mx-auto w-full md:w-2/3 px-4 py-8 lg:px-8 lg:py-12">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="scale-x-[-1]"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          برگشت
        </Link>

        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
            <div className="bg-[#151515] border border-custard rounded-3xl p-8 lg:p-10 max-w-md w-full text-center">
              <div className="text-7xl mb-4">🎓</div>

              <h2 className="text-3xl font-bold text-custard mb-3">تبریک!</h2>

              <p className="text-gray-400 mb-6">
                شما تمام مراحل درس{" "}
                <span className="text-white font-semibold">
                  {subjectDetail?.title}
                </span>{" "}
                را با موفقیت به پایان رساندید.
              </p>

              <button
                onClick={() => setShowCelebration(false)}
                className="w-full py-4 rounded-2xl bg-custard text-black font-bold hover:scale-[1.02] transition"
              >
                بسیار عالی!
              </button>
            </div>
          </div>
        )}

        <div className="bg-[#151515] border border-[#262626] rounded-3xl p-6 lg:p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <img
              src={subjectDetail.image}
              alt={subjectDetail.title}
              className="w-20 h-20 rounded-3xl bg-custard/10 flex items-center justify-center shrink-0"
            />

            <div className="flex-1 text-center lg:text-right">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {subjectDetail.title}
              </h1>

              <p className="text-gray-400">{subjectDetail.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#151515] border border-[#262626] rounded-3xl p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">پیشرفت درس</h2>

            <span className="text-3xl font-bold text-custard">
              {progressPercentage}%
            </span>
          </div>

          <div className="h-4 bg-[#262626] rounded-full overflow-hidden">
            <div
              className="h-full bg-custard transition-all duration-700"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          <p className="text-gray-400 mt-4">
            {completedStages} مرحله از {totalStages} مرحله تکمیل شده
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">مراحل یادگیری</h2>

            <span className="text-sm text-gray-500">{totalStages} مرحله</span>
          </div>

          <div className="grid gap-4">
            {Array.isArray(subjectStages) &&
              subjectStages.map((stage, index) => (
                <StageCard
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

        <div className="h-24" />
      </div>
    </div>
  );
};

export default SubjectDetail;
