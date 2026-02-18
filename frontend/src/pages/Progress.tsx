import { useEffect, useState } from "react";

import {
  CertificateList,
  IncompleteLessons,
  UserCompletedStages,
  CertificatesCount,
} from "@/services/api/api";
import type { IncompleteLesson, Certificate } from "@/types/types";

import Navbar from "@/components/Navbar";

import AchievementCard from "@/components/AchievementCard";

const Progress = () => {
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
      console.log(fetchIncompleteLessons.data);
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

    fetchIncompleteLessons();
    fetchUserCompletedStages();
    fetchCertificatesCount();
    fetchCertificateList();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-3">پیشرفت شما</h1>
        <p className="text-lg text-muted-foreground">
          مسیر یادگیری‌تان را دنبال کنید
        </p>
      </div>
      {/* Progress */}
      <div className="bg-linear-to-br from-card via-card to-custard/10 rounded-2xl p-6 mb-6 border border-secondary">
        <div className="flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-trending-up text-custard"
          >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
          <h2 className="text-xl">پیشرفت کلی</h2>
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">میزان تکمیل کل</span>
            <span className="text-3xl">{userOverall}%</span>
          </div>
          <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-custard rounded-full"
              style={{ width: `${userOverall}%` }}
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background/50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{userCompletedStages}</div>
            <div className="text-xs text-muted-foreground">مراحل تکمیل‌شده</div>
          </div>
          <div className="bg-background/50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{certificatesCount}</div>
            <div className="text-xs text-muted-foreground">
              درس‌های تکمیل‌شده
            </div>
          </div>
        </div>
      </div>
      {/* In Progress and Certificates */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-secondary">
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-target text-custard"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
            <span className="text-sm text-muted-foreground">درحال انجام</span>
          </div>
          <div className="text-2xl">{incompleteLessons.length}</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-secondary">
          <div
            className="flex items-center gap-2 mb-2"
            data-fg-z8p34="1.41:5.3416:/src/app/screens/Progress.tsx:97:17:4025:215:e:div"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-award text-custard"
            >
              <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
              <circle cx="12" cy="8" r="6"></circle>
            </svg>
            <span className="text-sm text-muted-foreground">گواهی‌ها</span>
          </div>
          <div className="text-2xl">{certificatesCount}</div>
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="mt-6">
        <h3 className="text-lg mb-3">دست‌آوردهای اخیر</h3>
        <div className="flex flex-col gap-3">
          {Array.isArray(incompleteLessons) &&
            certificates.map((cert) => (
              <AchievementCard
                key={cert.id}
                subjectDetail={cert.subject_detail}
                issued_at={cert.issued_at}
              />
            ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Progress;
