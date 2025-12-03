// FlashcardDetails.jsx
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

function ShareModal({ open, onClose, link, title }) { // Added 'title' prop
  if (!open) return null;
  
  // Define URLs for sharing (adjust based on your actual social media links)
  const shareText = `Check out my Flashcard Group: ${title}!`;
  const encodedShareText = encodeURIComponent(shareText);
  const encodedLink = encodeURIComponent(link);

  const platforms = [
    { 
      name: "WhatsApp", 
      color: "bg-green-500 hover:bg-green-600", 
      url: `https://wa.me/?text=${encodedShareText} ${encodedLink}`
    },
    { 
      name: "LinkedIn", 
      color: "bg-blue-700 hover:bg-blue-800", 
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}` 
    },
    { 
      name: "Twitter (X)", 
      color: "bg-black hover:bg-gray-800", 
      url: `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedLink}` 
    },
    { 
      name: "Facebook", 
      color: "bg-blue-600 hover:bg-blue-700", 
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}` 
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded shadow-lg w-[500px]">
        <h3 className="font-semibold mb-4">Share Flashcard</h3>
        
        {/* Link Copy Section */}
        <div className="flex gap-2 items-center">
          <input readOnly value={link} className="flex-1 p-2 border rounded" />
          <button
            className="btn border px-3"
            onClick={() => {
              navigator.clipboard.writeText(link);
              alert("Copied to clipboard");
            }}
          >
            Copy
          </button>
        </div>

        {/* New Social Share Buttons */}
        <div className="mt-5 border-t pt-4">
          <h4 className="font-medium mb-3 text-gray-700">Share Directly:</h4>
          <div className="flex flex-wrap gap-3">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 min-w-[100px] text-center text-white py-2 px-3 rounded text-sm font-semibold transition duration-150 ${p.color}`}
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 text-right">
          <button className="btn border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function FlashcardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = useSelector((s) => s.flash.cards.find((c) => c.id === id));
  const [selected, setSelected] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  if (!card) {
    return <div>Not found <button onClick={() => navigate(-1)} className="ml-2 text-blue-600">Go back</button></div>;
  }

  const link = `${location.origin}/flashcard/${card.id}`;

  return (
    <div>
      {/* Back Button (as added in previous step) */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/my-flashcards')}
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-md transition duration-200 hover:bg-gray-50"
        >
          <span className="text-xl">←</span> Back to My Flashcards
        </button>
      </div>

      <div className="flex items-start gap-6 mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{card.title}</h2>
          <p className="text-sm text-gray-600">{card.description}</p>
        </div>

        <div className="flex gap-2">
          <button className="btn border px-4" onClick={() => setShareOpen(true)}>Share</button>
          <button className="btn border px-4" onClick={() => window.print()}>Print</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <div className="card">
            <h4 className="font-medium mb-3">Terms</h4>
            <ul className="space-y-3">
              {card.terms.map((t, i) => (
                <li key={i}>
                  <button
                    onClick={() => setSelected(i)}
                    className={`w-full text-left p-2 rounded ${selected === i ? "bg-gray-100" : ""}`}
                  >
                    <div className="font-semibold">{t.term}</div>
                    <div className="text-xs text-gray-500">{t.definition.slice(0, 60)}{t.definition.length > 60 ? "..." : ""}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-span-9">
          <div className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{card.terms[selected]?.term}</h3>
                <p className="text-sm text-gray-700 mt-2">{card.terms[selected]?.definition}</p>
              </div>
              <div>
                {card.terms[selected]?.image ? <img src={card.terms[selected].image} alt="" className="w-40 h-28 object-cover rounded" /> : <div className="w-40 h-28 bg-gray-100 rounded" />}
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div>
                <button onClick={() => setSelected((s) => Math.max(0, s - 1))} className="btn border px-4 mr-2">← Prev</button>
                <button onClick={() => setSelected((s) => Math.min(card.terms.length - 1, s + 1))} className="btn border px-4">Next →</button>
              </div>

              <div className="text-sm text-gray-500">Card {selected + 1} of {card.terms.length}</div>
            </div>
          </div>
        </div>
      </div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} link={link} title={card.title} /> {/* Passed card.title */}
    </div>
  );
}