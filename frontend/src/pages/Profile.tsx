import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";

import authService from "../services/auth/authService";

import { HashLoader } from "react-spinners";

import {
  UserDetails,
  UserCompletedStages,
  CertificatesCount,
  IncompleteLessons,
  CertificateList,
  UserStats,
} from "@/services/api/api";

import type { IncompleteLesson, Certificate } from "@/types/types";

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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

  const [userCompletedStages, setUserCompletedStages] = useState<number>(0);
  const [certificatesCount, setCertificatesCount] = useState<number>(0);
  const [incompleteLessons, setIncompleteLessons] = useState<
    IncompleteLesson[]
  >([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [userStats, setUserStats] = useState<
    {
      id: number;
      total_xp: number;
      level: number;
      streak: number;
      last_activity_date: string;
      user: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchUserDetail = async () => {
      const fetchUserDetail = await UserDetails();
      setUserDetail(fetchUserDetail);
    };

    const fetchUserCompletedStages = async () => {
      const fetchUserCompletedStages = await UserCompletedStages();
      setUserCompletedStages(
        fetchUserCompletedStages.data.completed_stages_count,
      );
    };

    const fetchCertificatesCount = async () => {
      const fetchCertificatesCount = await CertificatesCount();
      setCertificatesCount(fetchCertificatesCount);
    };

    const fetchIncompleteLessons = async () => {
      const fetchIncompleteLessons = await IncompleteLessons();
      setIncompleteLessons(fetchIncompleteLessons.data as IncompleteLesson[]);
    };

    const fetchCertificateList = async () => {
      const fetchCertificateList = await CertificateList();
      setCertificates(fetchCertificateList);
    };

    const fetchUserStats = async () => {
      const fetchUserStats = await UserStats();
      setUserStats(fetchUserStats);
    };

    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchUserDetail(),
          fetchUserCompletedStages(),
          fetchCertificatesCount(),
          fetchIncompleteLessons(),
          fetchCertificateList(),
          fetchUserStats(),
        ]);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
        console.log(userStats);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    return;
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
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12 pt-28 lg:pt-32">
        {/* Profile Hero */}
        <div className="relative bg-linear-to-br from-[#151515] to-secondary border border-[#262626] rounded-3xl p-6 lg:p-8 mb-8 overflow-hidden shadow-xl transition-all duration-300 hover:border-custard/30 hover:shadow-custard/5 group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-custard/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-custard/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group/avatar">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-custard/40 to-custard/10 blur-md opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-custard/30 to-custard/70 p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#151515] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-custard/80 group-hover/avatar:text-custard transition-colors duration-300"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold uppercase bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {userDetail.username}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 7L2 7" />
                  </svg>
                  <p className="text-sm truncate">{userDetail.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-[#262626] group-hover:border-custard/20 transition-all duration-300">
              <div className="text-right">
                <div className="text-3xl font-bold text-custard tabular-nums">
                  {userStats[0]?.total_xp ?? 0}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider flex items-center justify-end gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>XP</span>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-[#262626] group-hover:bg-custard/30 transition-colors" />
              <div className="hidden sm:block text-custard/40 text-xs font-mono">
                ⚡
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-custard/20 to-transparent" />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard title="درس‌های فعال" value={incompleteLessons.length} />

          <StatCard title="مراحل تکمیل شده" value={userCompletedStages} />

          <StatCard title="گواهی‌ها" value={certificatesCount} />

          <StatCard title="دستاوردها" value={certificates.length} />
        </div>

        {/* Achievements */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold">دست‌آوردهای اخیر</h2>

            <span className="text-sm text-gray-500">
              {certificates.length} مورد
            </span>
          </div>

          {certificates.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="
                  bg-[#151515]
                  border border-custard/20
                  rounded-2xl
                  p-5
                  hover:border-custard/40
                  transition-all
                "
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-custard/10 flex items-center justify-center">
                        {cert.subject_detail.image && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: cert.subject_detail.image,
                            }}
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-medium">
                          {cert.subject_detail.title}
                        </h3>

                        <p className="text-sm text-gray-400 mt-1">
                          {new Date(cert.issued_at).toLocaleDateString("fa-IR")}
                        </p>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-custard text-black flex items-center justify-center shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="currentColor"
                          d="M7 21v-2h4v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V7q0-.825.588-1.412T5 5h2V3h10v2h2q.825 0 1.413.588T21 7v1q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h4v2zm0-10.2V7H5v1q0 .95.55 1.713T7 10.8m10 0q.9-.325 1.45-1.088T19 8V7h-2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-red-900/20 border border-red-800 rounded-2xl p-5 text-center text-red-200">
              هیچ گواهی‌ای وجود ندارد!
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="max-w-md mx-auto">
          <button
            onClick={handleLogout}
            className="
            w-full
            bg-red-500/10
            border border-red-500/20
            text-red-300
            rounded-2xl
            py-4
            font-medium
            hover:bg-red-500/20
            transition-all
          "
          >
            خروج از حساب
          </button>
        </div>

        <div className="h-24" />
      </div>
    </div>
  );
};

export default Profile;
