import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { StudentProvider } from "./context/StudentContext";
import { ComplaintProvider } from "./context/ComplaintContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LeaveProvider } from "./context/LeaveContext";
import { VisitorProvider } from "./context/VisitorContext";
import { MessProvider } from "./context/MessContext";
import { MeetingProvider } from "./context/MeetingContext";
import { NoticeProvider } from "./context/NoticeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <StudentProvider>
            <ComplaintProvider>
              <LeaveProvider>
                <VisitorProvider>
                  <MessProvider>
                    <MeetingProvider>
                      <NoticeProvider>
                      <NotificationProvider>
                       <App />
                      </NotificationProvider>
                      </NoticeProvider>
                    </MeetingProvider>
                  </MessProvider>
                </VisitorProvider>
              </LeaveProvider>
            </ComplaintProvider>
          </StudentProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);