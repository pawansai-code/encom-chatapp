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
              <div className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle mb-3" style={{ background: "rgba(255, 46, 99, 0.1)" }}>
                <MessageSquare size={32} color="#ff2e63" />
              </div>
              <h2 className="fw-bold text-light">Create Account</h2>
              <p className="small" style={{ color: "rgba(255, 255, 255, 0.6)" }}>Get started with your free account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Full Name</label>
                <div className="input-group">
                  <span className="input-group-text border-end-0 border-white border-opacity-10 text-secondary" style={{ background: "rgba(5, 5, 10, 0.5)" }}>
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 border-white border-opacity-10 text-light shadow-none"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    style={{ background: "rgba(5, 5, 10, 0.5)" }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Email</label>
                <div className="input-group">
                  <span className="input-group-text border-end-0 border-white border-opacity-10 text-secondary" style={{ background: "rgba(5, 5, 10, 0.5)" }}>
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0 border-white border-opacity-10 text-light shadow-none"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{ background: "rgba(5, 5, 10, 0.5)" }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Password</label>
                <div className="input-group">
                  <span className="input-group-text border-end-0 border-white border-opacity-10 text-secondary" style={{ background: "rgba(5, 5, 10, 0.5)" }}>
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0 border-white border-opacity-10 text-light shadow-none"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={6}
                    style={{ background: "rgba(5, 5, 10, 0.5)" }}
                  />
                </div>
              </div>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}

              <button
                type="submit"
                className="btn btn-primary-custom w-100 py-2 fw-semibold d-flex justify-content-center align-items-center"
                disabled={isSigningUp}
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
              <p className="small mb-0" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none fw-semibold" style={{ color: "#ff2e63" }}>
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
