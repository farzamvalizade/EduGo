import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";

import authService from "../services/auth/authService";

import { HashLoader } from "react-spinners";

import {
  UserDetails,
  UserCompletedStages,
  CertificatesCount,
  IncompleteLessons,
  CertificateList,
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

    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchUserDetail(),
          fetchUserCompletedStages(),
          fetchCertificatesCount(),
          fetchIncompleteLessons(),
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
      className="flex flex-col min-h-screen bg-secondary p-6 text-white"
      dir="rtl"
    >
      <div className="flex flex-col items-center justify-center  text-black">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-custard/30 to-custard rounded-full mb-4 border-4 border-card">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user text-custard-foreground"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>

        <h1 className="text-2xl mb-1 text-white uppercase">
          {userDetail.username}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{userDetail.email}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 mt-8">
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-secondary text-center">
          <div className="flex justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-open text-custard"
            >
              <path d="M12 7v14"></path>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
            </svg>
          </div>
          <div className="text-2xl mb-1">
            {incompleteLessons.length ? incompleteLessons.length : 0}
          </div>
          <div className="text-xs text-muted-foreground">درس‌ها</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-secondary text-center">
          <div className="flex justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          </div>
          <div className="text-2xl mb-1">
            {userCompletedStages ? userCompletedStages : 0}
          </div>
          <div className="text-xs text-muted-foreground">مراحل</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-secondary text-center">
          <div className="flex justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-award text-custard"
            >
              <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
              <circle cx="12" cy="8" r="6"></circle>
            </svg>
          </div>
          <div className="text-2xl mb-1">
            {certificatesCount ? certificatesCount : 0}
          </div>
          <div className="text-xs text-muted-foreground">گواهی‌ها</div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg mb-3">دست‌آوردهای اخیر</h3>
        <div className="flex flex-col gap-3">
          {Array.isArray(incompleteLessons) &&
            certificates.map((cert) => (
              <div key={cert.id} className="space-y-3">
                <div className="bg-linear-to-br from-[#1a1a1a] to-custard/5 rounded-2xl p-5 border border-custard/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: "rgba(255, 255, 203, 0.125)",
                        }}
                      >
                        {cert.subject_detail.image && (
                          <div
                            className=" fill-current"
                            dangerouslySetInnerHTML={{
                              __html: cert.subject_detail.image,
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="mb-0.5">{cert.subject_detail.title}</h4>
                      </div>
                    </div>
                    <div className="w-10 h-10 text-black bg-custard rounded-xl flex items-center justify-center shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-award text-custard-foreground"
                      >
                        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                        <circle cx="12" cy="8" r="6"></circle>
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      اخذ شده در{" "}
                      {new Date(cert.issued_at).toLocaleDateString("fa-IR")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {certificates.length === 0 && (
          <div className="flex items-center justify-center">
            <div className="w-full mx-auto text-center text bg-red-300 text-red-800 rounded-xl px-4 py-2 mb-2">
              هیچ گواهی‌‌ای وجود ندارد!
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 mt-4">
        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-secondary-light text-secondary-foreground hover:bg-secondary/80 w-full flex items-center justify-center gap-3 hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" x2="9" y1="12" y2="12"></line>
          </svg>
          <span>خروج</span>
        </button>
      </div>

      <Navbar />
    </div>
  );
};

export default Profile;
