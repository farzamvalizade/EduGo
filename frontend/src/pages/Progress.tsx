import { useEffect, useState } from "react";

import {
  CertificateList,
  IncompleteLessons,
  UserCompletedStages,
  CertificatesCount,
} from "@/services/api/api";
import type { IncompleteLesson, Certificate } from "@/types/types";

import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import AchievementCard from "@/components/AchievementCard";

import { HashLoader } from "react-spinners";

const Progress = () => {
  const [loading, setLoading] = useState(true);

  const [incompleteLessons, setIncompleteLessons] = useState<
    IncompleteLesson[]
  >([]);

  const [userCompletedStages, setUserCompletedStages] = useState<number>(0);
  const [userOverall, setUserOverall] = useState<number>(0);
  const [certificatesCount, setCertificatesCount] = useState<number>(0);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
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

    const fetchCertificateList = async () => {
      const fetchCertificateList = await CertificateList();
      setCertificates(fetchCertificateList);
    };

    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchIncompleteLessons(),
          fetchUserCompletedStages(),
          fetchCertificatesCount(),
          fetchCertificateList(),
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
      <div className="mx-auto w-full md:w-2/3 px-4 py-8 lg:px-8 lg:py-12 pt-28 lg:pt-32">
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-custard/15 p-2.5">
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
                className="text-custard"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              پیشرفت شما
            </h1>
          </div>
          <p className="text-gray-400 text-base md:text-lg">
            مسیر یادگیری‌تان را دنبال کنید
          </p>
        </div>
        {/* Hero Progress Card */}
        <div className="bg-[#151515] border border-[#262626] rounded-3xl p-6 lg:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">پیشرفت کلی</h2>

              <p className="text-gray-400">میزان تکمیل آموزش‌های شما</p>
            </div>

            <div className="text-5xl lg:text-6xl font-bold text-custard">
              {userOverall != null ? Math.floor(userOverall) : 0}%
            </div>
          </div>

          <div className="mt-6 h-4 bg-[#262626] rounded-full overflow-hidden">
            <div
              className="h-full bg-custard transition-all duration-700"
              style={{
                width: `${userOverall || 0}%`,
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            title="مراحل تکمیل شده"
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

          <StatCard
            title="گواهی‌ها"
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

          <StatCard
            title="در حال انجام"
            value={incompleteLessons?.length || 0}
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
          />

          <StatCard
            title="دستاوردها"
            value={certificates?.length || 0}
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
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            }
          />
        </div>

        {/* Achievements */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-semibold">دست‌آوردهای اخیر</h3>

            <span className="text-sm text-gray-500">
              {certificates.length} مورد
            </span>
          </div>

          {certificates.length > 0 ? (
            <div className="grid gap-4">
              {certificates.map((cert) => (
                <AchievementCard
                  key={cert.id}
                  subjectDetail={cert.subject_detail}
                  issued_at={cert.issued_at}
                />
              ))}
            </div>
          ) : (
            <div className="bg-red-900/20 border border-red-800 rounded-2xl p-5 text-center text-red-200">
              هیچ گواهی‌ای وجود ندارد!
            </div>
          )}
        </div>

        <div className="h-24" />
      </div>
    </div>
  );
};

export default Progress;
