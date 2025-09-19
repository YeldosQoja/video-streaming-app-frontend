import "./styles.css";
import { Link } from "react-router-dom";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "@/components/button";

export default function SignIn() {
  return (
    <>
      <div className="auth-form-container">
        <h2 className="auth-title">Sign in to your account</h2>
        <div className="auth-body">
          <form
            action="#"
            method="POST"
            className="auth-form">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <div className="auth-password-header">
                <Label htmlFor="password"> Password</Label>
                <Link
                  to="#"
                  className="forgot-password-link">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>
            <Button
              title="Sign in"
              onClick={() => {}}
            />
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
