import { Routes, Route } from "react-router-dom";
import CreateFlashcard from "./pages/CreateFlashcard";
import MyFlashcards from "./pages/MyFlashcards";
import FlashcardDetails from "./pages/FlashcardDetails";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Responsive padding */}
      <main className="container py-6 sm:py-10">
        <Routes>
          <Route path="/" element={<CreateFlashcard />} />
          <Route path="/my-flashcards" element={<MyFlashcards />} />
          <Route path="/flashcard/:id" element={<FlashcardDetails />} />
        </Routes>
      </main>
    </div>
  );
}
