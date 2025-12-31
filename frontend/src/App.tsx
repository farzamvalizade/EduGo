import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import routes from "./pages/routes.tsx";

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={<div className="text-center mt-20 text-xl">Loading...</div>}
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
