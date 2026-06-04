import { lazy } from "react";

const Start = lazy(() => import("./Start.tsx"));
const Home = lazy(() => import("./Home.tsx"));
const Login = lazy(() => import("./Login.tsx"));
const Signup = lazy(() => import("./Signup.tsx"));
const Profile = lazy(() => import("./Profile.tsx"));
const Subjects = lazy(() => import("./Subjects.tsx"));
const Progress = lazy(() => import("./Progress.tsx"));
const SubjectDetail = lazy(() => import("./SubjectDetail.tsx"));
const StageDetail = lazy(() => import("./StageDetail.tsx"));
const Contact = lazy(() => import("./Contact.tsx"));
const ContestDashboard = lazy(() => import("./ContestDashboard.tsx"));
const ContestResultCard = lazy(() => import("./ContestResultCard.tsx"));

// Routes
const routes: { path: string; element: any }[] = [
  { path: "/", element: <Start /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/subjects", element: <Subjects /> },
  { path: "/subjects/:id", element: <SubjectDetail /> },
  { path: "/subjects/:id/stages/:stageId", element: <StageDetail /> },
  { path: "/progress", element: <Progress /> },
  { path: "/contact", element: <Contact /> },
  { path: "/contest", element: <ContestDashboard /> },
];

export default routes;
