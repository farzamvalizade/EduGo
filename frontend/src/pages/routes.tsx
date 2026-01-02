import { lazy } from "react";

const Home = lazy(() => import("./Home.tsx"));
const Login = lazy(() => import("./Login.tsx"));
const Signup = lazy(() => import("./Signup.tsx"));
const Profile = lazy(() => import("./Profile.tsx"));

// Routes
const routes: { path: string; element: any }[] = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
];

export default routes;
