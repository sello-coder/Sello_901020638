import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: "▦" },
  { to: "/books", label: "Book management", icon: "▤" },
  { to: "/transactions", label: "Transactions", icon: "↔" },
  { to: "/users", label: "User management", icon: "♙" }
];

export default function Layout({ currentUser, onLogout }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">CL</div>
          <div><strong>Community Library</strong><span>Management system</span></div>
        </div>
        <div className="side-label">WORKSPACE</div>
        <nav className="nav-list">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="user-avatar">{currentUser.name.slice(0, 1).toUpperCase()}</div>
          <div className="user-mini">
            <strong>{currentUser.name}</strong>
            <span>{currentUser.role}</span>
          </div>
          <button className="icon-button logout-button" onClick={onLogout} title="Log out" aria-label="Log out">↪</button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div><span className="eyebrow">LIBRARY WORKSPACE</span><div className="topbar-title">Library operations</div></div>
          <div className="topbar-right"><span className="status-dot"></span><span>Saved in this browser</span></div>
        </header>
        <div className="page-content"><Outlet /></div>
        <footer className="footer">BIWA2110 · Web Application Development · Assignment 2</footer>
      </main>
    </div>
  );
}
