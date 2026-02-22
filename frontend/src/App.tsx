import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import routes from "./pages/routes.tsx";

import { HashLoader } from "react-spinners";

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
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
        }
      >
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
