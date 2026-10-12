import { useEffect, useState } from "react";

const emptyBook = { title: "", author: "", genre: "", isbn: "", quantity: "1" };

export default function BookForm({ bookToEdit, onSave, onCancel }) {
  const [form, setForm] = useState(emptyBook);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fill the form when editing, or clear it when adding a new book.
    setForm(bookToEdit ? { ...bookToEdit, quantity: String(bookToEdit.quantity) } : emptyBook);
    setError("");
  }, [bookToEdit]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const quantity = Number(form.quantity);
    if (!form.title.trim() || !form.author.trim() || !form.genre.trim() || !form.isbn.trim()) {
      setError("Please complete every field.");
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      setError("Quantity must be a whole number of zero or more.");
      return;
    }
    onSave({ ...form, title: form.title.trim(), author: form.author.trim(), genre: form.genre.trim(), isbn: form.isbn.trim(), quantity });
    setForm(emptyBook);
    setError("");
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-heading"><div><span className="eyebrow">{bookToEdit ? "EDIT RECORD" : "NEW RECORD"}</span><h2>{bookToEdit ? "Update book details" : "Add a new book"}</h2></div></div>
      {error && <div className="alert alert-error" role="alert">{error}</div>}
      <label>Book title<input name="title" value={form.title} onChange={updateField} placeholder="e.g. Things Fall Apart" required /></label>
      <label>Author<input name="author" value={form.author} onChange={updateField} placeholder="Author's full name" required /></label>
      <div className="form-row">
        <label>Genre<input name="genre" value={form.genre} onChange={updateField} placeholder="e.g. Fiction" required /></label>
        <label>Initial quantity<input name="quantity" type="number" min="0" step="1" value={form.quantity} onChange={updateField} required /></label>
      </div>
      <label>ISBN<input name="isbn" value={form.isbn} onChange={updateField} placeholder="Book ISBN" required /></label>
      <div className="form-actions"><button type="submit" className="primary-button">{bookToEdit ? "Save changes" : "Add book"}</button>{bookToEdit && <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>}</div>
    </form>
  );
}
