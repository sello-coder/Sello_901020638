import { useState } from "react";

export default function Transactions({ books, transactions, currentUser, onTransact }) {
  const [bookId, setBookId] = useState("");
  const [type, setType] = useState("Added stock");
  const [quantity, setQuantity] = useState("1");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError(""); setSuccess("");
    const selectedBook = books.find((book) => book.id === bookId);
    const amount = Number(quantity);
    if (!selectedBook) { setError("Please select a book."); return; }
    if (!Number.isInteger(amount) || amount < 1) { setError("Quantity must be a whole number of at least 1."); return; }
    if (type === "Borrowed" && amount > selectedBook.quantity) { setError(`Only ${selectedBook.quantity} copies are available.`); return; }
    const result = onTransact({ book: selectedBook, type, quantity: amount, note, userName: currentUser.name });
    if (!result.ok) { setError(result.message); return; }
    setSuccess("Transaction recorded and stock updated.");
    setQuantity("1"); setNote("");
  }

  return (
    <>
      <div className="page-heading"><div><span className="eyebrow">INVENTORY CONTROL</span><h1>Transactions</h1><p className="page-subtitle">Record new stock and book borrowing. Every change is logged.</p></div></div>
      <div className="two-column-layout">
        <form className="form-card transaction-form" onSubmit={handleSubmit}>
          <div className="form-heading"><div><span className="eyebrow">NEW TRANSACTION</span><h2>Update book stock</h2><p>Choose a book, transaction type, and quantity.</p></div></div>
          {error && <div className="alert alert-error" role="alert">{error}</div>}
          {success && <div className="alert alert-success" role="status">{success}</div>}
          <label>Select book<select value={bookId} onChange={(event) => setBookId(event.target.value)} required><option value="">Choose a book...</option>{books.map((book) => <option key={book.id} value={book.id}>{book.title} ({book.quantity} in stock)</option>)}</select></label>
          <label>Transaction type<select value={type} onChange={(event) => setType(event.target.value)}><option>Added stock</option><option>Borrowed</option></select></label>
          <label>Quantity<input type="number" min="1" step="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} required /></label>
          <label>Note (optional)<textarea value={note} onChange={(event) => setNote(event.target.value)} rows="3" placeholder="Supplier, borrower, or other details" /></label>
          <button className="primary-button full-width" type="submit">Record transaction</button>
          <p className="form-hint">Borrowing deducts copies. Added stock increases copies.</p>
        </form>
        <section className="content-card stock-summary-card"><div className="section-heading"><div><h2>Stock overview</h2><p>Current available quantities.</p></div></div>
          {books.length === 0 ? <p className="muted">No books in the catalogue yet.</p> : <div className="stock-overview-list">{books.map((book) => <div className="stock-overview-item" key={book.id}><div className="stock-book-name"><strong>{book.title}</strong><span>{book.author}</span></div><div className="stock-bar-area"><div className="stock-bar"><span style={{ width: `${Math.min(100, book.quantity * 12.5)}%` }} /></div><span className={`stock-number ${book.quantity < 2 ? "negative" : ""}`}>{book.quantity}</span></div></div>)}</div>}
        </section>
      </div>
      <section className="content-card">
        <div className="section-heading"><div><h2>Transaction history</h2><p>Newest transactions appear first.</p></div><span className="count-badge">{transactions.length} records</span></div>
        {transactions.length === 0 ? <div className="empty-state"><div className="empty-icon">↔</div><strong>No transactions yet</strong><p>Your recorded stock movements will appear here.</p></div> : <div className="table-wrap"><table><thead><tr><th>DATE & TIME</th><th>BOOK</th><th>TYPE</th><th>QUANTITY</th><th>RECORDED BY</th><th>NOTE</th></tr></thead><tbody>{transactions.map((tx) => <tr key={tx.id}><td className="date-cell">{tx.date}</td><td><strong>{tx.bookTitle}</strong></td><td><span className={`type-pill ${tx.type === "Added stock" ? "type-add" : "type-borrow"}`}>{tx.type}</span></td><td className={tx.type === "Added stock" ? "positive" : "negative"}>{tx.type === "Added stock" ? "+" : "−"}{tx.quantity}</td><td>{tx.userName}</td><td>{tx.note || "—"}</td></tr>)}</tbody></table></div>}
      </section>
    </>
  );
}
