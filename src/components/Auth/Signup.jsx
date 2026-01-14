import { Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../store/authSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isSigningUp, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
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
              <h2 className="fw-bold">Create Account</h2>
              <p className="text-secondary small">Get started with your free account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small text-secondary">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0 border-secondary text-secondary">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-transparent border-start-0 border-secondary text-light shadow-none"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
              </div>

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
                    minLength={6}
                  />
                </div>
              </div>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold d-flex justify-content-center align-items-center"
                disabled={isSigningUp}
                style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' }}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 size={18} className="animate-spin me-2" />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-secondary small mb-0">
                Already have an account?{" "}
                <Link to="/login" className="text-primary-custom text-decoration-none fw-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
