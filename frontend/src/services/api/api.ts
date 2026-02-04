import axios from "axios";
import Cookies from "js-cookie";

import type { Subject, IncompleteLesson } from "@/types/types";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

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
