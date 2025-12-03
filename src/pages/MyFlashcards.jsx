import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CardItem({ card }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-lg">{card.title}</div>
          <div className="text-sm text-gray-500 mt-1">{card.terms.length} Cards</div>
        </div>
        <div>
          {card.image ? <img src={card.image} alt="" className="w-20 h-14 rounded-md object-cover" /> : <div className="w-20 h-14 bg-gray-100 rounded-md" />}
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-4 line-clamp-3">{card.description}</p>

      <div className="mt-4">
        <Link to={`/flashcard/${card.id}`} className="inline-block border border-primary text-primary px-4 py-2 rounded">View Cards</Link>
      </div>
    </div>
  );
}

export default function MyFlashcards() {
  const cards = useSelector((s) => s.flash.cards);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Flashcards</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.length === 0 && <div className="text-gray-600">No flashcards yet. Create one!</div>}
        {cards.map((c) => <CardItem key={c.id} card={c} />)}
      </div>
    </div>
  );
}

