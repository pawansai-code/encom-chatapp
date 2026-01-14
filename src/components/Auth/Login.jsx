import { Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Although we might handle redirect in App based on authUser
  const { isLoggingIn, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card glass-effect text-light p-4 rounded-4 shadow-lg border-0">
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 p-3 rounded-circle mb-3">
                <MessageSquare size={32} className="text-primary-custom" />
              </div>
              <h2 className="fw-bold">Welcome Back</h2>
              <p className="text-secondary small">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small text-secondary">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0 border-secondary text-secondary">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    className="form-control bg-transparent border-start-0 border-secondary text-light shadow-none"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small text-secondary">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0 border-secondary text-secondary">
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    className="form-control bg-transparent border-start-0 border-secondary text-light shadow-none"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold d-flex justify-content-center align-items-center"
                disabled={isLoggingIn}
                style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' }}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 size={18} className="animate-spin me-2" />
                    Loading...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-secondary small mb-0">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary-custom text-decoration-none fw-semibold">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
