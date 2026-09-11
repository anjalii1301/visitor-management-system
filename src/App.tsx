import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import VisitorListPage from "./pages/VisitorsListPage";
import AddVisitorPage from "./pages/AddVisitorPage";

import Layout from "./component/Layout";
import ProtectedRoute from "./routes/protectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route
            path="/visitors"
            element={<VisitorListPage />}
          />

          <Route
            path="/visitors/add"
            element={<AddVisitorPage />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to="/visitors"
            replace
          />
        }
      />
    </Routes>
  );
};

export default App;