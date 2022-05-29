import "./App.css";
import Navbar from "./components/general/Navbar";
import HeroSection from "./components/general/HeroSection";
import Blogs from "./pages/Blogs";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
//import SingleBlog from "./pages/SingleBlog";
import CreatePost from "./pages/CreatePost";
import CreateNewPostBtn from "./components/general/CreateNewPostBtn";

function App() {
  //const currentUser = false;
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  const Layout1 = ({ children }) => {
    return (
      <div className="w-full pt-24 text-white">
        <div>
          <Navbar />
        </div>
        <RequireAuth>
          <CreateNewPostBtn />
        </RequireAuth>
        {children}
      </div>
    );
  };

  return (
    <div className="App h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <Layout1>
              <HeroSection />
            </Layout1>
          }
        />
        <Route
          path="/blogs"
          element={
            <Layout1>
              <RequireAuth>
                <Blogs />
              </RequireAuth>
            </Layout1>
          }
        />
        <Route
          path="/createpost"
          element={
            <Layout1>
              <RequireAuth>
                <CreatePost />
              </RequireAuth>
            </Layout1>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
