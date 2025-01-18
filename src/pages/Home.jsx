const API_URL = import.meta.env.VITE_SERVER_API;
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [jobData, setJobData] = useState(null);
  const [searchInp, setSearchInp] = useState("");

  const getJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/get/job`);

      setJobData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJobHandler = async (jobId) => {
    try {
      await axios.delete(`${API_URL}/delete/job/${jobId}`);
      toast.success("Job deleted");

      getJobs();
    } catch (error) {
      console.log(error);
      toast.success(error.response.message);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const searchedJob = searchInp.trim()
    ? jobData?.filter((job) =>
        job?.jobTitle?.toLowerCase().includes(searchInp.toLowerCase())
      )
    : [];

  return (
    <main className="container py-4">
      <input
        placeholder="Search by job title..."
        className="form-control"
        value={searchInp}
        onChange={(e) => setSearchInp(e.target.value)}
        style={{ maxWidth: "400px" }}
      />
      <h2 className="py-3">All Jobs</h2>

      <section className="row">
        {jobData === null ? (
          <h1 className="mt-5 text-center display-5 fw-normal">Loading...</h1>
        ) : searchedJob?.length > 0 ? (
          searchedJob?.map((job) => {
            return (
              <div
                className="col-12 col-md-6 col-lg-4 col-xxl-3 mb-4"
                key={job._id}
              >
                <div
                  className="card p-4 d-flex flex-column justify-content-around"
                  style={{ height: "20rem" }}
                >
                  <h3 className="card-heading">{job?.jobTitle}</h3>
                  <p>
                    <span className="fw-bold">Company name:</span>{" "}
                    {job?.companyName}
                  </p>
                  <p>
                    <span className="fw-bold">Location:</span>{" "}
                    {job?.companyLocation}
                  </p>
                  <p>
                    <span className="fw-bold">Job Type:</span> {job?.jobType}
                  </p>

                  <div className="d-flex gap-2">
                    <Link
                      className="btn btn-primary w-50"
                      to={`/job/details/${job._id}`}
                    >
                      See Details
                    </Link>
                    <button
                      className="btn btn-danger w-50"
                      onClick={() => deleteJobHandler(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          jobData?.map((job) => {
            return (
              <div
                className="col-12 col-md-6 col-lg-4 col-xxl-3 mb-4"
                key={job._id}
              >
                <div className="card p-4" style={{ height: "20rem" }}>
                  <h3 className="card-heading">{job?.jobTitle}</h3>
                  <p>
                    <span className="fw-bold">Company name:</span>{" "}
                    {job?.companyName}
                  </p>
                  <p>
                    <span className="fw-bold">Location:</span>{" "}
                    {job?.companyLocation}
                  </p>
                  <p>
                    <span className="fw-bold">Job Type:</span> {job?.jobType}
                  </p>

                  <div className="d-flex gap-2">
                    <Link
                      className="btn btn-primary w-50"
                      to={`/job/details/${job._id}`}
                    >
                      See Details
                    </Link>
                    <button
                      className="btn btn-danger w-50"
                      onClick={() => deleteJobHandler(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
};

export default Home;
