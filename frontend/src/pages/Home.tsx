import { useEffect, useState } from "react";

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
import StatCard from "@/components/StatCard";

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
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-black text-white">
      <Navbar />

      <div className="w-full md:w-2/3 mx-auto max-w-6xl px-4 pt-28 lg:pt-32 py-8 lg:px-8 lg:py-12">
        {/* Hero */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-6 mb-10">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-3">
              سلام {userDetail.first_name}
              <span className="inline-block mr-2">👋</span>
            </h1>

            <p className="text-gray-400 text-lg">
              برای یادگیری چیز جدید آماده‌ای؟
            </p>
          </div>

          <div className="bg-[#151515] border border-[#2a2a2a] rounded-3xl p-6 flex flex-col justify-center">
            <span className="text-gray-400 text-sm mb-2">پیشرفت کلی</span>

            <div className="text-5xl font-bold text-custard">
              {userOverall != null ? Math.floor(userOverall) : 0}%
            </div>

            <div className="w-full h-3 bg-[#262626] rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-custard rounded-full"
                style={{
                  width: `${userOverall || 0}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Featured Lesson */}
        {incompleteLessons.length > 0 && (
          <div className="bg-linear-to-r from-custard/15 to-custard/5 border border-custard/30 rounded-3xl p-6 mb-10">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <p className="text-custard text-sm mb-2">ادامه یادگیری</p>

                <h2 className="text-2xl font-bold mb-2">
                  {incompleteLessons[0].title}
                </h2>

                <p className="text-gray-400">
                  {incompleteLessons[0].completedStage} از{" "}
                  {incompleteLessons[0].totalStage} مرحله
                </p>

                <div className="w-full max-w-md h-3 bg-[#262626] rounded-full mt-4 overflow-hidden">
                  <div
                    className="h-full bg-custard"
                    style={{
                      width: `${
                        (incompleteLessons[0].completedStage /
                          incompleteLessons[0].totalStage) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Link
                  to={`/subjects/${incompleteLessons[0].lesson_id}`}
                  className="bg-custard text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
                >
                  ادامه درس
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 overflow-x-auto pb-2 mb-10 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          <div className="min-w-35 flex-1">
            <StatCard
              title="مراحل انجام‌شده"
              value={userCompletedStages || 0}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
            />
          </div>

          <div className="min-w-35 flex-1">
            <StatCard
              title="گواهی‌های شما"
              value={certificatesCount || 0}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17v4l3-2l3 2v-4M13.957 4.275l-.323-.444a2.022 2.022 0 0 0-3.268 0l-.323.444L9.5 4.19A2.02 2.02 0 0 0 7.19 6.5l.085.543l-.444.323a2.02 2.02 0 0 0 0 3.268l.444.323l-.085.542A2.02 2.02 0 0 0 9.5 13.81l.543-.085l.323.444a2.022 2.022 0 0 0 3.268 0l.323-.444l.542.085a2.02 2.02 0 0 0 2.311-2.31l-.085-.543l.444-.323a2.022 2.022 0 0 0 0-3.268l-.444-.323l.085-.542A2.02 2.02 0 0 0 14.5 4.19z"
                  />
                </svg>
              }
            />
          </div>

          <div className="min-w-35 flex-1">
            <StatCard
              title="دروس موجود"
              value={subjects.length}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Continue Learning */}
          <div>
            <h3 className="text-2xl font-semibold mb-5">ادامه یادگیری</h3>

            <div className="space-y-4">
              {incompleteLessons.length > 0 ? (
                incompleteLessons.map((lesson) => (
                  <SubjectCard
                    key={lesson.lesson_id}
                    subject={lesson.title}
                    completedStages={lesson.completedStage}
                    totalStages={lesson.totalStage}
                    icon={<MathIcon />}
                    isHomePage={true}
                    isStarted={true}
                    continueUrl={`/subjects/${lesson.lesson_id}`}
                  />
                ))
              ) : (
                <div className="rounded-2xl bg-red-900/20 border border-red-800 p-5 text-center">
                  هیچ درس انجام نشده‌ای نیست
                </div>
              )}
            </div>
          </div>

          {/* Recent Subjects */}
          <div>
            <h3 className="text-2xl font-semibold mb-5">دروس اخیر</h3>

            <div className="space-y-4">
              {subjects.slice(0, 2).map((subject) => (
                <Link
                  key={subject.id}
                  to={`/subjects/${subject.id}`}
                  className="block bg-[#151515] border border-[#252525] rounded-2xl p-4 hover:border-custard/40 hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#222] rounded-xl flex items-center justify-center shrink-0">
                      {subject.image ? (
                        <img
                          src={subject.image}
                          alt={subject.title}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <BookIcon />
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium">{subject.title}</h4>

                      <p className="text-sm text-gray-400">
                        {subject.stages_count} مرحله
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              to="/subjects"
              className="block mt-6 text-center bg-custard text-black rounded-full py-3 font-semibold"
            >
              مشاهده همه دروس
            </Link>
          </div>
        </div>

        <div className="h-24" />
      </div>
    </div>
  );
};

export default Home;
