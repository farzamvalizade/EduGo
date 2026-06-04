import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import SubjectCard from "@/components/SubjectCard";

import { IncompleteLessons, SubjectList } from "@/services/api/api";
import type { IncompleteLesson, Subject } from "@/types/types";

import { HashLoader } from "react-spinners";

const Subjects = () => {
  const [loading, setLoading] = useState(true);

  const [startedSubjects, setStartedSubjects] = useState<IncompleteLesson[]>([
    { lesson_id: 0, title: "", completedStage: 0, totalStage: 0 },
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      title: "",
      stages_count: 0,
      description: "",
      image: "",
      is_active: true,
      created_at: "",
    },
  ]);

  useEffect(() => {
    const fetchIncompleteLessons = async () => {
      const fetchIncompleteLessons = await IncompleteLessons();
      setStartedSubjects(fetchIncompleteLessons.data as IncompleteLesson[]);
    };

    const fetchSubjects = async () => {
      const fetchSubjects = await SubjectList();
      setSubjects(fetchSubjects.data as Subject[]);
    };

    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchIncompleteLessons(), fetchSubjects()]);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!startedSubjects.length || !subjects.length) return;

    const startedIds = new Set(startedSubjects.map((s) => s.lesson_id));

    setSubjects((prev) =>
      prev.filter((subject) => !startedIds.has(subject.id)),
    );
  }, [startedSubjects, subjects]);

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
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-black text-white">
      <Navbar />
      <div className="mx-auto w-full md:w-2/3 px-4 py-8 lg:px-8 lg:py-12 pt-28 lg:pt-32">
        <div className="mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-custard/15 p-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-custard"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M8 6h9v2H8z" />
                <path d="M20 2H6C4.35 2 3 3.35 3 5v14c0 1.65 1.35 3 3 3h15v-2H6c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1m-6 14H6c-.35 0-.69.07-1 .18V5c0-.55.45-1 1-1h13v12z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              همه‌ی درس‌ها
            </h1>
          </div>
          <p className="text-gray-400 text-base md:text-lg">
            یک درس را برای یادگیری انتخاب کنید
          </p>
        </div>

        {startedSubjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-5">ادامه یادگیری</h2>

            <div className="grid gap-4">
              {startedSubjects.map((subject) => (
                <SubjectCard
                  key={subject.lesson_id}
                  subject={subject.title}
                  completedStages={subject.completedStage}
                  totalStages={subject.totalStage}
                  icon={subject.image}
                  continueUrl={`/subjects/${subject.id}`}
                  isStarted={true}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold mb-5">همه دروس</h2>

          {subjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject.title}
                  completedStages={subject.stages_count}
                  totalStages={subject.stages_count}
                  icon={subject.image}
                  continueUrl={`/subjects/${subject.id}`}
                  isStarted={false}
                  isCompleted={false}
                  isHomePage={false}
                />
              ))}
            </div>
          ) : (
            startedSubjects.length === 0 && (
              <div className="rounded-2xl bg-red-900/20 border border-red-800 p-5 text-center text-red-200">
                درسی وجود ندارد!
              </div>
            )
          )}
        </div>

        <div className="h-24" />
      </div>
    </div>
  );
};

export default Subjects;
