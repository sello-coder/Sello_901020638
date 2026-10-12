import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Users, { LoginPage } from "./pages/Users";
import { starterBooks, starterUsers } from "./data";
import { loadData, makeId, saveData } from "./utils/storage";

export default function App() {
  const [books, setBooks] = useState(() => loadData("biwa2110_books", starterBooks));
  const [users, setUsers] = useState(() => loadData("biwa2110_users", starterUsers));
  const [transactions, setTransactions] = useState(() => loadData("biwa2110_transactions", []));
  const [currentUser, setCurrentUser] = useState(() => loadData("biwa2110_current_user", null));
  const navigate = useNavigate();

  // useEffect saves each state change so data remains after refreshing the page.
  useEffect(() => saveData("biwa2110_books", books), [books]);
  useEffect(() => saveData("biwa2110_users", users), [users]);
  useEffect(() => saveData("biwa2110_transactions", transactions), [transactions]);
  useEffect(() => saveData("biwa2110_current_user", currentUser), [currentUser]);

  function login(user) {
    // Only keep the account fields needed for the active session.
    setCurrentUser({ id: user.id, name: user.name, membershipId: user.membershipId, role: user.role, username: user.username });
    navigate("/");
  }

  function logout() {
    setCurrentUser(null);
    navigate("/login");
  }

  function saveBook(bookData) {
    if (bookData.id) {
      setBooks((oldBooks) => oldBooks.map((book) => book.id === bookData.id ? { ...book, ...bookData } : book));
    } else {
      const newBook = { ...bookData, id: makeId("book") };
      setBooks((oldBooks) => [...oldBooks, newBook]);
    }
  }

  function deleteBook(bookId) {
    const book = books.find((item) => item.id === bookId);
    // Keep the transaction history accurate instead of deleting old records.
    if (book && transactions.some((tx) => tx.bookId === bookId)) {
      const okay = window.confirm("This book has transaction history. Delete it from the catalogue anyway? Its past transactions will remain in the log.");
      if (!okay) return;
    }
    setBooks((oldBooks) => oldBooks.filter((book) => book.id !== bookId));
  }

  function transact({ book, type, quantity, note, userName }) {
    const currentBook = books.find((item) => item.id === book.id);
    if (!currentBook) return { ok: false, message: "That book no longer exists." };
    if (type === "Borrowed" && quantity > currentBook.quantity) {
      return { ok: false, message: `Only ${currentBook.quantity} copies are available.` };
    }
    const newQuantity = type === "Added stock" ? currentBook.quantity + quantity : currentBook.quantity - quantity;
    setBooks((oldBooks) => oldBooks.map((item) => item.id === book.id ? { ...item, quantity: newQuantity } : item));
    const record = {
      id: makeId("tx"), bookId: book.id, bookTitle: book.title, type, quantity, note: note.trim(),
      userName, date: new Date().toLocaleString()
    };
    setTransactions((oldTransactions) => [record, ...oldTransactions]);
    return { ok: true };
  }

  function saveUser(userData) {
    if (userData.id) {
      setUsers((oldUsers) => oldUsers.map((user) => user.id === userData.id ? { ...user, ...userData } : user));
      // Update the displayed session if the current user's details were changed.
      if (userData.id === currentUser?.id) {
        setCurrentUser({ id: userData.id, name: userData.name, membershipId: userData.membershipId, role: userData.role, username: userData.username });
      }
    } else {
      setUsers((oldUsers) => [...oldUsers, { ...userData, id: makeId("user") }]);
    }
  }

  function deleteUser(userId) {
    setUsers((oldUsers) => oldUsers.filter((user) => user.id !== userId));
  }

  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <LoginPage users={users} onLogin={login} />} />
      <Route path="/" element={currentUser ? (
        <Layout currentUser={currentUser} onLogout={logout} />
      ) : <Navigate to="/login" replace />}>
        <Route index element={<Dashboard books={books} transactions={transactions} users={users} />} />
        <Route path="books" element={<Books books={books} onSaveBook={saveBook} onDeleteBook={deleteBook} />} />
        <Route path="transactions" element={<Transactions books={books} transactions={transactions} currentUser={currentUser || { name: "Unknown" }} onTransact={transact} />} />
        <Route path="users" element={<Users users={users} currentUser={currentUser || { id: "", role: "Member", name: "Unknown" }} onSaveUser={saveUser} onDeleteUser={deleteUser} />} />
      </Route>
      <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
    </Routes>
  );
}
