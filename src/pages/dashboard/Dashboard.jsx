import { useState } from "react";
import axios from "axios";
import { useFirebase } from "../../context/FirebaseContext";

const Dashboard = () => {
  const firebase = useFirebase(); // ✅ Now used
  const [trustedContacts, setTrustedContacts] = useState([]);
  const [contactEmail, setContactEmail] = useState("");

  // ✅ Add Contact Function
  const handleAddContact = () => {
    if (contactEmail) {
      setTrustedContacts((prevContacts) => [...prevContacts, contactEmail]);
      setContactEmail(""); // Clear input
    }
  };

  // ✅ Send Emergency Alert
  const sendEmergencyAlert = async () => {
    if (trustedContacts.length === 0) {
      alert("No trusted contacts added!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;

        try {
          const response = await axios.post("http://localhost:5000/api/alert", {
            emails: trustedContacts,
            location,
          });

          alert(response.data.message); // Show success message
        } catch (error) {
          console.error("Error sending alert:", error);
          alert("Failed to send alert!");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Please allow location access!");
      }
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* <p>Logged in as: <strong>{firebase.user?.email}</strong></p>  */}
      {/* ✅ Displays logged-in user */}

      {/* ✅ Contact Input & Add Button */}
      <div className="mt-4">
        <input
          type="email"
          placeholder="Add Trusted Contact"
          className="input input-bordered w-full"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <button className="btn btn-primary w-full mt-2" onClick={handleAddContact}>
          Add Contact
        </button>
      </div>

      {/* ✅ Show List of Contacts */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Trusted Contacts:</h2>
        {trustedContacts.length > 0 ? (
          <ul className="list-disc pl-5">
            {trustedContacts.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        ) : (
          <p>No contacts added.</p>
        )}
      </div>

      {/* ✅ Emergency Alert Button */}
      <button className="btn btn-error w-full mt-4" onClick={sendEmergencyAlert}>
        🚨 Danger! Send Alert
      </button>
    </div>
  );
};

export default Dashboard;
