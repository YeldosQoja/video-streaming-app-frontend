import "./styles.css";
import { Link } from "react-router-dom";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

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
              <Label htmlFor="firstName">First name</Label>
              <div>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <div>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Username</Label>
              <div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                title="Sign up"
              />
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
