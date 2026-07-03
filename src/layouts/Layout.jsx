import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="md:pl-sidebar-width flex flex-col min-h-screen">
        <Navbar onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 p-4 md:p-container-margin">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
