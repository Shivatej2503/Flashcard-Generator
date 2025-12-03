export default function FlashcardCard({ card, to }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{card.title}</h4>
          <p className="text-sm text-gray-500 mt-1">{card.terms.length} Cards</p>
        </div>
        <div>
          {card.image ? <img src={card.image} className="w-28 h-16 object-cover rounded" /> : <div className="w-28 h-16 bg-gray-100 rounded" />}
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-4 line-clamp-3">{card.description}</p>

      <div className="mt-4">
        <a href={to} className="text-primary border border-primary px-3 py-2 rounded">View Cards</a>
      </div>
    </div>
  );
}
