import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layout/Layout";

function Home() {
  return <h1>Home Page</h1>;
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;