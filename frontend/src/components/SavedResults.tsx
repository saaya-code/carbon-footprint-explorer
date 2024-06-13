'use client';

interface SearchResult {
  name: string;
  [key: string]: any;
}

interface SavedResultsProps {
  saved: SearchResult[];
}

export default function SavedResults({ saved }: SavedResultsProps) {
  return (
    <div className="p-4">
      <h2 className="text-ecoDarkGreen text-lg font-bold">Saved Results</h2>
      <ul className="space-y-2 mt-2">
        {saved.map((item, index) => (
          <li key={item.name} className="border border-ecoBeige rounded p-2">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
