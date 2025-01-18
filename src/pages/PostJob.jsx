import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_SERVER_API;

const PostJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    companyLocation: "",
    jobSalary: "",
    jobDescription: "",
    qualifications: "",
  });
  const [jobType, setJobType] = useState(null);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (
        formData.jobTitle !== "" &&
        formData.jobSalary !== "" &&
        formData.jobDescription !== "" &&
        formData.companyLocation !== "" &&
        formData.companyName !== "" &&
        formData.qualifications !== "" &&
        jobType !== null
      ) {
        await axios.post(`${API_URL}/post/job`, { ...formData, jobType });
        toast.success("Job added successfully");

        navigate("/");

        setFormData({
          jobTitle: "",
          companyName: "",
          companyLocation: "",
          jobSalary: "",
          jobDescription: "",
          qualifications: "",
        });
      } else {
        toast.warn("Fill All Details");
      }
    } catch (error) {
      if (error.response) {
        if (error.status === 409) {
          toast.warn("jobTitle already exists!");
        } else {
          console.log(error);
          toast.warn("Something bad happened");
        }
      } else {
        console.log(error);
        toast.error("Internal server error");
      }
    }
  };

  return (
    <main className="container">
      <h2 className="py-2">Post a Job</h2>
      <form className="pb-4" onSubmit={submitHandler}>
        <label className="form-label">Job Title</label>
        <input
          type="text"
          className="form-control"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={changeHandler}
          required
        />
        <br />
        <label className="form-label">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          className="form-control"
          onChange={changeHandler}
          required
        />
        <br />
        <label className="form-label">Location</label>
        <input
          type="text"
          name="companyLocation"
          value={formData.companyLocation}
          className="form-control"
          onChange={changeHandler}
          required
        />
        <br />
        <label className="form-label">Salary</label>
        <input
          type="text"
          name="jobSalary"
          value={formData.jobSalary}
          className="form-control"
          onChange={changeHandler}
          required
        />
        <br />
        <label className="form-label">Job Type</label>
        <select
          className="form-select"
          onChange={(e) => setJobType(e.target.value)}
          required
        >
          <option>--Select Job Type--</option>
          <option value="Full-Time (On-Site)">Full-Time (On-Site)</option>
          <option value="Full-Time (Remote)">Full-Time (Remote)</option>
          <option value="Part-Time (On-Site)">Part-Time (On-Site)</option>
          <option value="Part-Time (Remote)">Part-Time (Remote)</option>
        </select>
        <br />
        <label className="form-label">Job Description</label>
        <input
          type="text"
          name="jobDescription"
          value={formData.jobDescription}
          className="form-control"
          onChange={changeHandler}
          required
        />
        <br />
        <label className="form-label">Job Qualifications</label>
        <input
          type="text"
          name="qualifications"
          value={formData.qualifications}
          className="form-control"
          onChange={changeHandler}
          required
        />
        <br />
        <button className="btn btn-primary">Post Job</button>
      </form>
    </main>
  );
};

export default PostJob;
