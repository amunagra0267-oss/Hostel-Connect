import { PORTAL_LINKS } from "../config/portalLinks";
import hostelImage from "../assets/Hostel.jpeg";

// This app is a landing page only -- it does not log anyone in itself.
// Each portal below is its own separate app with its own login screen.
// Clicking a card just takes you to that portal's URL.
export default function Login() {
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
          position: "relative",
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
            One portal for complaints, leave requests, visitor passes,
            maintenance, mess and notices.
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
          <h2 style={{ color: "#f59e0b", marginBottom: "10px" }}>
            HostelConnect
          </h2>

          <p style={{ color: "#aaa", marginBottom: "30px" }}>
            GEETA UNIVERSITY
          </p>

          <h1 style={{ marginBottom: "8px" }}>Choose Your Portal</h1>
          <p style={{ color: "#888", fontSize: "14px", marginBottom: "27px" }}>
            Each portal has its own sign-in screen.
          </p>

          {PORTAL_LINKS.map((portal) => (
            <a
              key={portal.role}
              href={portal.url}
              style={{
                display: "block",
                width: "100%",
                padding: "18px",
                marginBottom: "14px",
                border: "none",
                borderRadius: "12px",
                background: "#262626",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              {portal.label}
              <div style={{ color: "#999", fontSize: "12px", marginTop: "4px" }}>
                {portal.blurb}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
