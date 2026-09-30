import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = () => {
    if (!password) return "";

    let score = 0;

    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";
    return "Strong";
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(username, password, remember);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔐</div>

          <h1>Welcome Back</h1>
          <p>Login to access your Task Manager</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {password && (
            <div className="password-strength">
              <div className="strength-header">
                <span>Password Strength</span>

                <strong className={strength.toLowerCase()}>
                  {strength}
                </strong>
              </div>

              <div className="strength-track">
                <div
                  className={`strength-fill ${strength.toLowerCase()}`}
                ></div>
              </div>
            </div>
          )}

          <label className="remember-user">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />

            <span>Remember me</span>
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-submit">
            Login
          </button>
        </form>

        <div className="login-footer">
          <strong>Authentication Demo</strong>

          <p>
            Username must contain at least 3 characters and
            password must contain at least 6 characters.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;