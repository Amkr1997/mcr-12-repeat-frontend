import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_SERVER_API;

const JobDetails = () => {
  const [foundJob, setFoundJob] = useState(null);
  const { id } = useParams();

  const getJobs = async () => {
    try {
      const fetchJobs = await axios.get(`${API_URL}/get/job`);

      setFoundJob(fetchJobs?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const jobDetails = foundJob?.find((job) => job._id === id);

  return (
    <main className="container">
      {!jobDetails ? (
        <h2 className="mt-5 text-center">Loading...</h2>
      ) : (
        <>
          <h2 className="py-4">{jobDetails?.jobTitle}</h2>
          <div className="card px-2 py-4">
            <h4 className="fw-bold d-flex align-items-start gap-2 py-2">
              Company Name:{" "}
              <span className="fw-normal">{jobDetails?.companyName}</span>
            </h4>
            <h4 className="fw-bold d-flex align-items-start gap-2 py-2">
              Location:{" "}
              <span className="fw-normal">{jobDetails?.companyLocation}</span>
            </h4>
            <h4 className="fw-bold d-flex align-items-start gap-2 py-2">
              Salary: <span className="fw-normal">{jobDetails?.jobSalary}</span>
            </h4>
            <h4 className="fw-bold d-flex align-items-start gap-2 py-2">
              Job Type: <span className="fw-normal">{jobDetails?.jobType}</span>
            </h4>
            <h4 className="fw-bold d-flex align-items-start gap-2 py-2">
              Description:{" "}
              <span className="fw-normal">{jobDetails?.jobDescription}.</span>
            </h4>
            <h4 className="fw-bold py-2">
              Qualifications:{" "}
              <ol className="ps-5 py-2">
                {jobDetails?.qualifications
                  ?.split(",")
                  .map((qualification, index) => {
                    return (
                      <li className="fw-normal" key={index}>
                        {qualification}
                      </li>
                    );
                  })}
              </ol>
            </h4>
          </div>
        </>
      )}
    </main>
  );
};

export default JobDetails;
