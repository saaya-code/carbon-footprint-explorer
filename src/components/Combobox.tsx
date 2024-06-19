'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from './Modal';

interface SearchResult {
  name: string;
  id: string;
  [key: string]: any;
}

interface ComboboxProps {
  onSearch: (query: string) => void;
  results: SearchResult[];
  onSave: (result: SearchResult) => void;
  savedResults: SearchResult[];
}

export default function Combobox({ onSearch, results, onSave, savedResults }: ComboboxProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState<{open: boolean, message:string}>({open: false, message: ''});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };
  const closeModal = () => {
    setModalState({open:false, message:''});
  };
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!comboboxRef.current?.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const isSaved = (result: SearchResult) => {
    return savedResults.some(saved => saved.name === result.name);
  };

  const handleSave = async (result: SearchResult) => {
      try {
        await axios.post(`/api/save`, result);
        onSave(result);
        console.log(result)
        //alert('Result saved successfully');
        setIsFocused(false);
        setModalState({open:true, message:`${result.name} saved successfully`});

      } catch (error) {
        alert('Error Saving Result');
        console.error(error);
      }
  };

  return (
    <div
      className="p-4 relative"
      onFocus={handleFocus}
      onBlur={handleBlur}
      ref={comboboxRef}
    ><div className='flex justify-end items-center'>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="border border-ecoGreen rounded p-2 w-full"
        placeholder="Search for carbon footprint..."
      />
      <button
        onClick={() => {setQuery(''); setIsFocused(false);}}
        className="bg-ecoBrown text-white rounded p-2 ml-2"
      >
        Clear
      </button>
      </div>
      {isFocused && results.length > 0 && (
        <ul className="absolute bg-white border border-ecoGreen rounded mt-2 w-full max-h-60 overflow-y-auto z-10">
          {results.map((result, index) => (
            <li
              key={result.name}
              className="p-2 hover:bg-ecoLightGreen cursor-pointer flex justify-between"
            >
              <span>{result.name}</span>
              <button
                className={`rounded p-1 ${isSaved(result) ? 'bg-ecoBrown text-white cursor-not-allowed' : 'bg-ecoGreen text-white'}`}
                onClick={() => handleSave(result)}
                disabled={isSaved(result)}
              >
                {isSaved(result) ? 'Saved' : 'Save'}
                </button>
            </li>
          ))}
        </ul>
      )}
        <Modal isOpen={modalState.open} message={modalState.message} onClose={closeModal} />

    </div>
  );
}
