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
  const [loading, setLoading] = useState(true); 
  const [loadingData, setLoadingData] = useState(true);

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
      setLoading(true); // Set loading to true before fetching data
      //const apiKey = process.env.NEXT_PUBLIC_CLIMATIQ_API_KEY;
      const res = await fetch(`https://swapi.dev/api/people/`);
      const data = await res.json();
      setAllResults(data.results);
      setLoading(false); // Set loading to false after data is fetched

    };
    const getSavedResults = async () => {
        setLoadingData(true);
        const res = await fetch('/api/getSaved');
        const data = await res.json();
        let saved = [];
        for(let i = 0; i < data.length; i++){
            saved.push(data[i].name);
        }
        setSaved(data);
        setLoadingData(false);
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
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-400 h-32 w-32"></div>
          </div>
        ) : (
          <>
            <Combobox onSearch={handleSearch} results={results} onSave={handleSave} savedResults={saved} />
            {
                loadingData ? (
                    <>
                        <p>Loading Saved Results...</p>
                        <div className="flex justify-start items-start h-screen">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-400 h-16 w-16">
                        </div>
                        </div>
                    </>
                ) : <SavedResults saved={saved} handleDelete={(e, index)=>{
                    console.log(saved[index].name);
                    fetch(`/api/deleteSaved/${saved[index].name}`, {
                        method: 'DELETE',
                    }).then(() => {
                        setSaved(saved.filter((_, i) => i !== index));
                    })
                }}/>
            }
          </>
        )}
      </div>
    </div>
  );
}
