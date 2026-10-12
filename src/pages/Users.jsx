import { useState } from "react";

const blankUser = { name: "", membershipId: "", role: "Member", username: "", password: "" };

export function LoginPage({ users, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    const user = users.find((item) => item.username.toLowerCase() === username.trim().toLowerCase() && item.password === password);
    if (!user) { setError("Username or password is incorrect."); return; }
    onLogin(user);
  }

  return (
    <div className="login-page">
      <div className="login-art"><div className="brand-mark large-mark">CL</div><span className="eyebrow light-eyebrow">COMMUNITY LIBRARY</span><h1>Knowledge grows when it is shared.</h1><p>A simple place to manage your collection, track books, and support your community.</p><div className="book-stack"><span>▤</span><span>▤</span><span>▤</span></div></div>
      <div className="login-panel"><form className="login-form" onSubmit={submit}><span className="eyebrow">WELCOME BACK</span><h2>Sign in to your library</h2><p className="muted">Use your library account to continue.</p>{error && <div className="alert alert-error">{error}</div>}<label>Username<input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required placeholder="Enter username" /></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required placeholder="Enter password" /></label><button className="primary-button full-width" type="submit">Sign in →</button><div className="demo-credentials"><strong>Demo accounts</strong><p>Admin: <code>admin</code> / <code>admin123</code></p><p>Librarian: <code>librarian</code> / <code>lib123</code></p></div></form></div>
    </div>
  );
}

export default function Users({ users, currentUser, onSaveUser, onDeleteUser }) {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blankUser);
  const [error, setError] = useState("");
  const isAdmin = currentUser.role === "Admin";

  function startEdit(user) {
    setEditing(user);
    setForm({ ...user, password: user.password || "" });
    setShowForm(true);
    setError("");
  }
  function startNew() {
    setEditing(null); setForm(blankUser); setShowForm(true); setError("");
  }
  function submit(event) {
    event.preventDefault(); setError("");
    if (!form.name.trim() || !form.membershipId.trim() || !form.username.trim() || (!editing && !form.password)) {
      setError("Complete all required fields. A password is required for new users."); return;
    }
    const duplicate = users.find((u) => u.id !== editing?.id && (u.membershipId.toLowerCase() === form.membershipId.trim().toLowerCase() || u.username.toLowerCase() === form.username.trim().toLowerCase()));
    if (duplicate) { setError("Membership ID and username must be unique."); return; }
    onSaveUser({ ...form, name: form.name.trim(), membershipId: form.membershipId.trim(), username: form.username.trim(), password: form.password });
    setEditing(null); setForm(blankUser); setShowForm(false);
  }
  function remove(user) {
    if (user.id === currentUser.id) { alert("You cannot delete the account you are currently using."); return; }
    if (window.confirm(`Delete user "${user.name}"?`)) onDeleteUser(user.id);
  }

  return (
    <>
      <div className="page-heading"><div><span className="eyebrow">PEOPLE & ACCESS</span><h1>User management</h1><p className="page-subtitle">Manage library members, membership IDs, and roles.</p></div>{isAdmin && <button className="primary-button" onClick={showForm ? () => setShowForm(false) : startNew}>{showForm ? "Close form" : "＋ Add user"}</button>}</div>
      {!isAdmin && <div className="alert alert-info">You are signed in as a {currentUser.role}. Only Admin users can add, update, or delete accounts.</div>}
      {showForm && isAdmin && <form className="form-card user-form" onSubmit={submit}><div className="form-heading"><div><span className="eyebrow">{editing ? "EDIT ACCOUNT" : "NEW ACCOUNT"}</span><h2>{editing ? "Update user details" : "Add a user"}</h2></div></div>{error && <div className="alert alert-error">{error}</div>}
        <div className="form-row"><label>Full name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label><label>Membership ID<input value={form.membershipId} onChange={(e) => setForm({ ...form, membershipId: e.target.value })} required /></label></div>
        <div className="form-row"><label>Username<input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required /></label><label>Role<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option>Member</option><option>Librarian</option><option>Admin</option></select></label></div>
        <label>Password {editing && <span className="muted small">(leave unchanged to keep the current password)</span>}<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required={!editing} autoComplete="new-password" /></label>
        <div className="form-actions"><button className="primary-button" type="submit">{editing ? "Save changes" : "Create user"}</button><button className="secondary-button" type="button" onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button></div>
      </form>}
      <section className="content-card"><div className="section-heading"><div><h2>Registered users</h2><p>Account and membership directory.</p></div><span className="count-badge">{users.length} users</span></div>
        {users.length === 0 ? <div className="empty-state"><strong>No users registered</strong><p>Add a user account to get started.</p></div> : <div className="table-wrap"><table><thead><tr><th>USER</th><th>MEMBERSHIP ID</th><th>USERNAME</th><th>ROLE</th>{isAdmin && <th>ACTIONS</th>}</tr></thead><tbody>{users.map((user) => <tr key={user.id}><td><div className="user-cell"><span className="user-avatar table-avatar">{user.name.slice(0, 1).toUpperCase()}</span><strong>{user.name}</strong>{user.id === currentUser.id && <span className="you-tag">You</span>}</div></td><td>{user.membershipId}</td><td>{user.username}</td><td><span className={`role-pill role-${user.role.toLowerCase()}`}>{user.role}</span></td>{isAdmin && <td><div className="action-buttons"><button className="text-button" onClick={() => startEdit(user)}>Edit</button><button className="text-button danger-text" onClick={() => remove(user)}>Delete</button></div></td>}</tr>)}</tbody></table></div>}
      </section>
      <p className="security-note">Assignment note: this demonstration stores account details in browser local storage. It is suitable for coursework only, not for real production authentication.</p>
    </>
  );
}
