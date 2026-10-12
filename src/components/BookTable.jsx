export default function BookTable({ books, onEdit, onDelete, showActions = true }) {
  if (books.length === 0) {
    return <div className="empty-state"><div className="empty-icon">▤</div><strong>No books found</strong><p>Add a book or change your search.</p></div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>BOOK</th><th>AUTHOR</th><th>GENRE</th><th>ISBN</th><th>IN STOCK</th>{showActions && <th>ACTIONS</th>}</tr></thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td><div className="book-title">{book.title}</div><div className="muted small">Book ID: {book.id.slice(-8)}</div></td>
              <td>{book.author}</td><td>{book.genre}</td><td className="isbn">{book.isbn}</td>
              <td><span className={`stock-pill ${book.quantity < 2 ? "stock-low" : "stock-ok"}`}>{book.quantity} {book.quantity === 1 ? "copy" : "copies"}</span>{book.quantity < 2 && <div className="low-note">Low stock</div>}</td>
              {showActions && <td><div className="action-buttons"><button className="text-button" onClick={() => onEdit(book)}>Edit</button><button className="text-button danger-text" onClick={() => onDelete(book)}>Delete</button></div></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
