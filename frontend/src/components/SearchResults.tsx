'use client';

interface SearchResult {
  name: string;
  [key: string]: any;
}

interface SearchResultsProps {
  results: SearchResult[];
  onSave: (result: SearchResult) => void;
}

export default function SearchResults({ results, onSave }: SearchResultsProps) {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {results.length > 0 ? (
        results.map((result) => (
          <div key={result.name} className="border border-ecoLightGreen rounded p-4 flex flex-col justify-between">
            <span className="font-bold">{result.name}</span>
            <button
              onClick={() => onSave(result)}
              className="bg-ecoGreen text-white rounded p-2 mt-2"
            >
              Save
            </button>
          </div>
        ))
      ) : (
        <p className="col-span-full">No results found.</p>
      )}
    </div>
  );
}
