import React from "react";
import { useFirebase } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logging Out...");
    const result = await firebase.logoutUser();
    navigate("/login");
    console.log("Successfully logged out", result);
  };

  return (
    <div>
      Home Page
      <button className="btn btn-primary w-full" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
