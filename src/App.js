import "./App.css";
import Navbar from "./components/general/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import SingleBlog from "./pages/SingleBlog";
import CreatePost from "./pages/CreatePost";
import EditPost from "./components/herosection/EditPost";
import Footer from "./components/general/Footer";
import useTitle from "./customhooks/useTitle";

import ScrollToTop from "./components/general/ScrollToTop";

function App() {
  useTitle("pharma blog app");
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  const Layout1 = ({ children }) => {
    return (
      <div className="w-full bg-[#f5f5f5] font-workSans pt-24 text-white">
        <div>
          <Navbar />
        </div>
        {children}
        <>
          <Footer />
        </>
      </div>
    );
  };

  return (
    <div className="App h-screen">
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout1>
              <Blogs />
            </Layout1>
          }
        />

        <Route path="/blog/:id/:slug" element={<SingleBlog />} />
        <Route
          path="/createpost"
          element={
            <RequireAuth>
              <CreatePost />
            </RequireAuth>
          }
        />
        <Route
          path="/editpost/:id"
          element={
            <RequireAuth>
              <EditPost />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
