import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../context/AuthContext";
import hostelImage from "../assets/Hostel.jpeg";

const ROLE_CARDS = [
  {
    role: ROLES.STUDENT,
    label: "Student",
    blurb: "Raise complaints, apply for leave, check mess menu & notices.",
  },
  {
    role: ROLES.WARDEN,
    label: "Warden",
    blurb: "Review leave requests, manage residents and room allotments.",
  },
  {
    role: ROLES.SECURITY,
    label: "Security",
    blurb: "Log visitor passes, gate entries and night-round checks.",
  },
  {
    role: ROLES.WORKER,
    label: "Worker",
    blurb: "View assigned maintenance jobs and update task status.",
  },
  {
    role: ROLES.ADMIN,
    label: "Admin",
    blurb: "Oversee every hostel block, staff accounts and reports.",
  },
];

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState(ROLES.STUDENT);

  const handleLogin = () => {
    switch (role) {
      case ROLES.STUDENT:
        navigate("/student");
        break;

      case ROLES.WARDEN:
        navigate("/warden");
        break;

      case ROLES.SECURITY:
        navigate("/security");
        break;

      case ROLES.WORKER:
        navigate("/worker");
        break;

      case ROLES.ADMIN:
        navigate("/admin");
        break;

      default:
        navigate("/login");
    }
  };


 return (
  <div
    style={{
      display: "flex",
      width: "100%",
      height: "100vh",
      background: "#111",
    }}
  >
    {/* LEFT SIDE */}
    <div
      style={{
        width: "55%",
        backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)), url(${hostelImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
        padding: "60px",
        color: "white",
      }}
    >
      <div
  style={{
    position: "absolute",
    top: "35px",
    left: "45px",
    color: "#f59e0b",
    fontSize: "32px",
    fontWeight: "700",
    letterSpacing: "1px",
  }}
>
  HOSTEL CONNECT
</div>
      <div>
        <p
          style={{
            color: "#f59e0b",
            letterSpacing: "3px",
            fontWeight: "600",
          }}
        >
          A MODERN HOSTEL EXPERIENCE
        </p>

        <h1
          style={{
            fontSize: "72px",
            lineHeight: "1",
            margin: "20px 0",
          }}
        >
          Live,
          <br />
          Learn,
          <br />
          <span style={{ color: "#f59e0b" }}>Belong.</span>
        </h1>

        <p
          style={{
            width: "500px",
            fontSize: "20px",
            color: "#ddd",
            lineHeight: "1.8",
          }}
        >
          One portal for complaints, leave requests,
          visitor passes, maintenance,
          mess and notices.
        </p>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div
      style={{
        width: "45%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f0f0f",
      }}
    >
      <div
        style={{
          width: "430px",
          background: "#181818",
          borderRadius: "20px",
          padding: "40px",
          color: "white",
        }}
      >
        <h2
          style={{
            color: "#f59e0b",
            marginBottom: "10px",
          }}
        >
          HostelConnect
        </h2>

        <p style={{ color: "#aaa", marginBottom: "30px" }}>
          GEETA UNIVERSITY
        </p>

        <h1 style={{ marginBottom: "35px" }}>
          Select Your Portal
        </h1>

        {ROLE_CARDS.map((card) => (
          <button
            key={card.role}
            onClick={() => {
              switch (card.role) {
                case ROLES.STUDENT:
                  navigate("/student");
                  break;
                case ROLES.WARDEN:
                  navigate("/warden");
                  break;
                case ROLES.SECURITY:
                  navigate("/security");
                  break;
                case ROLES.WORKER:
                  navigate("/worker");
                  break;
                case ROLES.ADMIN:
                  navigate("/admin");
                  break;
                default:
                  break;
              }
            }}
            style={{
              width: "100%",
              padding: "18px",
              marginBottom: "18px",
              border: "none",
              borderRadius: "12px",
              background: "#262626",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            {card.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);
}