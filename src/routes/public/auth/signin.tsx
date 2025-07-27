import "./styles.css";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <>
      <div className="auth-form-container">
        <div>
          <h2 className="auth-title">Sign in to your account</h2>
        </div>
        <div className="auth-body">
          <form
            action="#"
            method="POST"
            className="auth-form">
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
              <div className="auth-password-header">
                <label
                  htmlFor="password"
                  className="auth-input-label">
                  Password
                </label>
                <div>
                  <a
                    href="#"
                    className="forgot-password-link">
                    Forgot password?
                  </a>
                </div>
              </div>
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
                Sign in
              </button>
            </div>
          </form>
        </div>
        <p className="auth-footer-text">
          Don't have an account yet?{" "}
          <Link
            to="../signup"
            className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
