import { useMemo, useState } from "react";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";

export default function Books({ books, onSaveBook, onDeleteBook }) {
  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredBooks = useMemo(() => {
    const query = search.toLowerCase().trim();
    return books.filter((book) => [book.title, book.author, book.genre, book.isbn].some((value) => value.toLowerCase().includes(query)));
  }, [books, search]);

  function saveBook(book) {
    onSaveBook(book);
    setEditingBook(null);
    setShowForm(false);
  }

  function editBook(book) {
    setEditingBook(book);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteBook(book) {
    if (window.confirm(`Delete "${book.title}" from the catalogue?`)) {
      onDeleteBook(book.id);
      if (editingBook?.id === book.id) setEditingBook(null);
    }
  }

  return (
    <>
      <div className="page-heading"><div><span className="eyebrow">CATALOGUE</span><h1>Book management</h1><p className="page-subtitle">Create, update, search, and remove book records.</p></div><button className="primary-button" onClick={() => { setEditingBook(null); setShowForm((value) => !value); }}>{showForm ? "Close form" : "＋ Add a book"}</button></div>
      {showForm && <div className="form-layout"><BookForm bookToEdit={editingBook} onSave={saveBook} onCancel={() => { setEditingBook(null); setShowForm(false); }} /></div>}
      <section className="content-card">
        <div className="section-heading book-list-heading"><div><h2>Book catalogue <span className="count-badge">{filteredBooks.length}</span></h2><p>All books currently registered in the library.</p></div><div className="search-box"><span>⌕</span><input aria-label="Search books" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, author, ISBN..." /></div></div>
        <BookTable books={filteredBooks} onEdit={editBook} onDelete={deleteBook} />
      </section>
    </>
  );
}
