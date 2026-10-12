import { Link } from "react-router-dom";
import BookTable from "../components/BookTable";

export default function Dashboard({ books, transactions, users }) {
  const totalCopies = books.reduce((sum, book) => sum + book.quantity, 0);
  const lowStock = books.filter((book) => book.quantity < 2);
  const recentTransactions = [...transactions].slice(0, 5);

  return (
    <>
      <div className="page-heading">
        <div><span className="eyebrow">OVERVIEW</span><h1>Dashboard</h1><p className="page-subtitle">A clear view of your library's books and activity.</p></div>
        <Link className="primary-button link-button" to="/books">＋ Add a book</Link>
      </div>
      <section className="stats-grid">
        <article className="stat-card"><div className="stat-top"><span className="stat-icon green-icon">▤</span><span className="stat-caption">CATALOGUE</span></div><div className="stat-number">{books.length}</div><div className="stat-label">Book titles</div><div className="stat-foot">Unique book records</div></article>
        <article className="stat-card"><div className="stat-top"><span className="stat-icon blue-icon">▣</span><span className="stat-caption">INVENTORY</span></div><div className="stat-number">{totalCopies}</div><div className="stat-label">Total copies in stock</div><div className="stat-foot">Across all titles</div></article>
        <article className="stat-card"><div className="stat-top"><span className="stat-icon amber-icon">!</span><span className="stat-caption">ATTENTION</span></div><div className="stat-number">{lowStock.length}</div><div className="stat-label">Low-stock titles</div><div className="stat-foot">Fewer than 2 copies</div></article>
        <article className="stat-card"><div className="stat-top"><span className="stat-icon purple-icon">♙</span><span className="stat-caption">MEMBERS</span></div><div className="stat-number">{users.length}</div><div className="stat-label">Registered users</div><div className="stat-foot">All membership roles</div></article>
      </section>
      <section className="content-card">
        <div className="section-heading"><div><h2>Current book availability</h2><p>Books with fewer than two copies are highlighted.</p></div><Link to="/books" className="subtle-link">Manage books ↗</Link></div>
        <BookTable books={books} showActions={false} />
      </section>
      <section className="content-card">
        <div className="section-heading"><div><h2>Recent transactions</h2><p>The latest stock movements recorded by the system.</p></div><Link to="/transactions" className="subtle-link">View history ↗</Link></div>
        {recentTransactions.length === 0 ? <p className="muted padded">No transactions have been recorded yet.</p> : <div className="transaction-list">{recentTransactions.map((tx) => <div className="transaction-row" key={tx.id}><span className={`transaction-symbol ${tx.type === "Added stock" ? "symbol-add" : "symbol-remove"}`}>{tx.type === "Added stock" ? "+" : "−"}</span><div className="transaction-description"><strong>{tx.bookTitle}</strong><span>{tx.type} · {tx.userName}</span></div><strong className={tx.type === "Added stock" ? "positive" : "negative"}>{tx.type === "Added stock" ? "+" : "−"}{tx.quantity}</strong><span className="muted small">{tx.date}</span></div>)}</div>}
      </section>
    </>
  );
}
