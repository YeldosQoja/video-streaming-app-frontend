import "./styles.css";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <>
      <div className="auth-form-container">
        <div>
          <h2 className="auth-title">Create an account</h2>
        </div>
        <div className="auth-body">
          <form
            action="#"
            method="POST"
            className="auth-form">
            <div>
              <label
                htmlFor="firstName"
                className="auth-input-label">
                First name
              </label>
              <div>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="auth-input"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="auth-input-label">
                Last name
              </label>
              <div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="auth-input"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="auth-input-label">
                Username
              </label>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="email"
                  className="auth-input"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="auth-input-label">
                Password
              </label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="auth-input"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="auth-btn">
                Sign up
              </button>
            </div>
          </form>
        </div>
        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link
            to="../signin"
            className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
