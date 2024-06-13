'use client';
import { useState, useEffect } from 'react';
import Combobox from '@/components/Combobox';
import SavedResults from '@/components/SavedResults';

interface SearchResult {
  name: string;
  id: string;
  [key: string]: any;
}

export default function Home() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [saved, setSaved] = useState<SearchResult[]>([]);
  const [allResults, setAllResults] = useState<SearchResult[]>([]);

  const handleSearch = (query: string) => {
    if (query === '') {
      setResults([]);
    } else {
      const filteredResults = allResults.filter(result =>
        result.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      //const apiKey = process.env.NEXT_PUBLIC_CLIMATIQ_API_KEY;
      const res = await fetch(`https://swapi.dev/api/people/`);
      const data = await res.json();
      setAllResults(data.results);
    };
    const getSavedResults = async () => {
        const res = await fetch('http://localhost:5000/getSaved');
        const data = await res.json();
        let saved = [];
        for(let i = 0; i < data.length; i++){
            saved.push(data[i].name);
        }
        setSaved(data);
    }

    fetchResults();
    getSavedResults();
  }, []);

  const handleSave = (result: SearchResult) => {
    setSaved([...saved, result]);
  };

  return (
    <div className="min-h-screen bg-ecoBeige text-ecoDarkGreen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-4">Carbon Footprint Explorer</h1>
        <Combobox onSearch={handleSearch} results={results} onSave={handleSave} savedResults={saved} />
        <SavedResults saved={saved} />
      </div>
    </div>
  );
}
