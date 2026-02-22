import { useEffect, useState, CSSProperties } from "react";

import { Link } from "react-router-dom";

import type { Subject, IncompleteLesson } from "@/types/types";

import { HashLoader } from "react-spinners";

import {
  SubjectList,
  IncompleteLessons,
  UserCompletedStages,
  CertificatesCount,
  UserDetails,
} from "@/services/api/api";

import SubjectCard from "@/components/SubjectCard";
import Navbar from "@/components/Navbar";

// Icons
import MathIcon from "@/assets/icons/MathIcon";
import BookIcon from "@/assets/icons/BookIcon";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [incompleteLessons, setIncompleteLessons] = useState<
    IncompleteLesson[]
  >([]);

  const [userCompletedStages, setUserCompletedStages] = useState<number>(0);
  const [userOverall, setUserOverall] = useState<number>(0);
  const [certificatesCount, setCertificatesCount] = useState<number>(0);
  const [userDetail, setUserDetail] = useState<{
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }>({
    pk: 0,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      const fetchSubjects = await SubjectList();
      setSubjects(fetchSubjects.data as Subject[]);
    };

    const fetchIncompleteLessons = async () => {
      const fetchIncompleteLessons = await IncompleteLessons();
      setIncompleteLessons(fetchIncompleteLessons.data as IncompleteLesson[]);
    };

    const fetchUserCompletedStages = async () => {
      const fetchUserCompletedStages = await UserCompletedStages();
      setUserCompletedStages(
        fetchUserCompletedStages.data.completed_stages_count,
      );

      setUserOverall(
        (fetchUserCompletedStages.data.completed_stages_count /
          fetchUserCompletedStages.data.total_stages_count) *
          100,
      );
    };

    const fetchCertificatesCount = async () => {
      const fetchCertificatesCount = await CertificatesCount();
      setCertificatesCount(fetchCertificatesCount);
    };

    const fetchUserDetail = async () => {
      const fetchUserDetail = await UserDetails();
      setUserDetail(fetchUserDetail);
    };

    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchSubjects(),
          fetchIncompleteLessons(),
          fetchUserCompletedStages(),
          fetchCertificatesCount(),
          fetchUserDetail(),
        ]);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
    <div className="flex flex-col min-h-screen p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-3">
          سلام {userDetail.first_name}
          <span className="animate-[wave_0.6s_ease-in-out_1] inline-block origin-bottom">
            👋
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          برای یادگیری چیز جدید آماده‌ای؟
        </p>
      </div>
      {/* Stats */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 mb-6 border-2 border-[#222222] shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trophy text-custard"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
          </svg>
          <h2 className="text-xl">وضعیت شما</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center ">
            <div className="text-3xl mb-1">
              {userCompletedStages ? userCompletedStages : 0}
            </div>
            <div className="text-xs text-muted-foreground">مراحل انجام شده</div>
          </div>
          <div className="text-center border-x border-[#393939]">
            <div className="text-3xl mb-1">
              {certificatesCount ? certificatesCount : 0}
            </div>
            <div className="text-xs text-muted-foreground">تمام شده</div>
          </div>
          <div className="text-center ">
            <div className="text-3xl mb-1">
              {userOverall ? userOverall : 0}%
            </div>
            <div className="text-xs text-muted-foreground">بطورکلی</div>
          </div>
        </div>
      </div>
      {/* Continue Learning */}
      <div className="mb-6">
        <h3 className="text-lg mb-3">به یادگیری ادامه دهید</h3>
        <div className="flex flex-col gap-3">
          {Array.isArray(incompleteLessons) &&
            incompleteLessons.map((lesson) => (
              <SubjectCard
                subject={lesson.title}
                completedStages={lesson.completedStage}
                totalStages={lesson.totalStage}
                icon={<MathIcon />}
                isHomePage={true}
                isStarted={true}
                continueUrl={`/subjects/${lesson.lesson_id}`}
              />
            ))}

          {incompleteLessons.length === 0 && (
            <div className="flex items-center justify-center">
              <div className="w-full mx-auto text-center text bg-red-300 text-red-800 rounded-xl px-4 py-2 mb-2">
                هیچ درسی انجام نشده ای نیست
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Subjects */}
      <div>
        <h3 className="text-lg mb-3">درس های اخیر</h3>
        <div className="grid grid-cols-2 gap-3">
          {Array.isArray(subjects) &&
            subjects.slice(0, 3).map((subject) => (
              <Link
                to={`/subjects/${subject.id}`}
                key={subject.id}
                className="bg-[#1a1a1a] rounded-2xl p-4 border border-custard/30 text-left  transition-all"
              >
                <div className="bg-[#2b2735] w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                  {subject.image && (
                    <img
                      src={subject.image}
                      alt={subject.title}
                      className="w-10 h-10 rounded-xl"
                    />
                  )}
                </div>
                <h4 className="text-right text-sm mb-1">{subject.title}</h4>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BookIcon />
                  <span>{subject.stages_count} مرحله</span>
                </div>
              </Link>
            ))}
        </div>
        {subjects.length === 0 && (
          <div className="flex items-center justify-center">
            <div className="w-full mx-auto text-center text bg-red-300 text-red-800 rounded-xl px-4 py-2 mb-2">
              درسی وجود ندارد!
            </div>
          </div>
        )}
      </div>
      {/* View All Subjects */}
      <div className="mt-6 mb-12">
        <Link
          to="/subjects"
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
          تمام دروس
        </Link>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
