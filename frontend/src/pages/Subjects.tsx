import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import SubjectCard from "@/components/SubjectCard";

import { IncompleteLessons, SubjectList } from "@/services/api/api";
import type { IncompleteLesson, Subject } from "@/types/types";

import MathIcon from "../assets/icons/MathIcon";

const Subjects = () => {
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

    fetchIncompleteLessons();
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (!startedSubjects.length || !subjects.length) return;

    const startedIds = new Set(startedSubjects.map((s) => s.lesson_id));

    setSubjects((prev) =>
      prev.filter((subject) => !startedIds.has(subject.id)),
    );
  }, [startedSubjects, subjects]);

  return (
    <div className="flex flex-col min-h-screen p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-3">همه‌ی درس‌ها</h1>
        <p className="text-lg text-muted-foreground">
          یک درس را برای یادگیری انتخاب کنید
        </p>
      </div>

      {/* Incomplete Subjects */}
      <div>
        {Array.isArray(startedSubjects) &&
          startedSubjects.map((subject) => (
            <SubjectCard
              key={subject.lesson_id}
              subject={subject.title}
              completedStages={subject.completedStage}
              totalStages={subject.totalStage}
              icon={<MathIcon />}
              continueUrl={`/subjects/${subject.id}`}
              isStarted={true}
            />
          ))}
      </div>

      <div>
        {Array.isArray(subjects) &&
          subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject.title}
              completedStages={subject.stages_count}
              totalStages={subject.stages_count}
              icon={<MathIcon />}
              continueUrl={`/subjects/${subject.id}`}
              isStarted={false}
              isCompleted={false}
              isHomePage={false}
            />
          ))}
      </div>

      <Navbar />
    </div>
  );
};

export default Subjects;
