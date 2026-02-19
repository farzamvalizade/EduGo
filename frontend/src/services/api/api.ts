import Cookies from "js-cookie";

import type { Subject, IncompleteLesson } from "@/types/types";

import { api } from "@/services/auth/authService";

export const SubjectList = async () => {
  const subjects: Subject[] = await api.get("/subjects");
  return subjects;
};

export const IncompleteLessons = async () => {
  const token = Cookies.get("access_token");

  if (!token) {
    return [];
  }

  const incompleteLessons: IncompleteLesson[] = await api.get(
    "/incomplete-stages",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return incompleteLessons;
};

export const UserCompletedStages = async () => {
  const token = Cookies.get("access_token");

  if (!token) {
    return [];
  }

  const userCompletedStages: {
    completed_stages_count: number;
    total_stages_count: number;
  } = await api.get("/user-completed-stages", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return userCompletedStages;
};

export const CertificatesCount = async (): Promise<number> => {
  const token = Cookies.get("access_token");
  if (!token) return 0;

  const res = await api.get("/certificates", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.length;
};

export const CertificateList = async () => {
  const token = Cookies.get("access_token");
  if (!token) return [];

  const res = await api.get("/certificates", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const UserDetails = async () => {
  const token = Cookies.get("access_token");
  if (!token) return {};

  const res = await api.get("/auth/user/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const Register = async (data: {
  username: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  email: string;
}) => {
  const response = await api.post("/register/", data);
  return response.data;
};

export const SubjectStageList = async (subjectId: number) => {
  const token = Cookies.get("access_token");
  if (!token) return [];

  const res = await api.get(`/subjects/${subjectId}/stages/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const StageQuestionList = async (stageId: number) => {
  const token = Cookies.get("access_token");
  if (!token) return [];

  const res = await api.get(`/stages/${stageId}/questions/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const checkStageAnswers = async (
  subjectId: number,
  stageId: number,
  answers: Record<number, number>,
) => {
  const response = await api.post(
    `/subjects/${subjectId}/stages/${stageId}/check/`,
    {
      answers,
    },
  );
  return response.data;
};

export const completeSubject = async (subjectId: number) => {
  const token = Cookies.get("access_token");
  if (!token) return {};
  const response = await api.post(`/subjects/${subjectId}/complete/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
