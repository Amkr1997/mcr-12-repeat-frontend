import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/job" element={<PostJob />} />
          <Route path="/job/details/:id" element={<JobDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
