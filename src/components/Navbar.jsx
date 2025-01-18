import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <NavLink className="navbar-brand fw-medium text-light" to="/">
            Intern House
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link fs-6 fw-medium text-white-50"
                  aria-current="page"
                  to="/"
                >
                  Job Postings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fs-6 fw-medium text-white-50"
                  aria-current="page"
                  to="/post/job"
                >
                  Post a Job
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
