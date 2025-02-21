import { useEffect, useState } from "react";
import { useFirebase } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signin up a user...");
    const result = await firebase.signupUserWithEmailAndPassword(
      user.email,
      user.password
    );
    console.log("Successful", result);
    setUser({
      email: "",
      password: "",
    });
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Logging in with Google...");
      const result = await firebase.signinWithGoogle();
      console.log("Google Login Successful:", result);
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Email Field */}
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button className="btn btn-primary w-full">Sign Up</button>
          </div>
        </form>

        <div className="divider">OR</div>

        <button className="btn btn-outline w-full" onClick={handleGoogleLogin}>
          Sign Up with Google
        </button>
        
        {/* Login Link */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
