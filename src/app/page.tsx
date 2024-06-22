'use client';
import { useState, useEffect, useCallback  } from 'react';
import Combobox from '@/components/Combobox';
import SavedResults from '@/components/SavedResults';
import Modal from '@/components/Modal';
import SearchResult from '@/types/searchResult';
import debounce from '@/utils/debounce';
import NewsletterModal from '@/components/NewsletterModal';
export default function Home() {
  // results contain the data fetched from the API
  const [results, setResults] = useState<SearchResult[]>([]);
  // saved contains the elements the user saved in the database
  const [saved, setSaved] = useState<SearchResult[]>([]);
  // used to show a loading spinner when fetching data
  const [loading, setLoading] = useState(false); 
  const [loadingData, setLoadingData] = useState(true);
  // modalState contains the state of the modal
  const [modalState, setModalState] = useState<{open: boolean, message:string}>({open: false, message: ''});
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);


  const handleSearch = async (query: string) => {
    if (query.trim().length === 0) {
        setResults([]);
    } else {
        setLoading(true); 
        const res = await fetch(`/api/query?q=${query}`);
        const data = await res.json();
        setResults(data.results);
        console.log(data);
        setLoading(false); 
    }
  };

  const openNewsletterModal = () => {
    setNewsletterModalOpen(true);
  };

  const closeNewsletterModal = () => {
    setNewsletterModalOpen(false);
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  const handleInputChange = (query: string) => {
    debouncedHandleSearch(query);
  };

  useEffect(() => {
    const getSavedResults = async () => {
        setLoadingData(true);
        const res = await fetch('/api/getSaved');
        const data = await res.json();
        setSaved(data);
        setLoadingData(false);
    }
    getSavedResults();

  }, []);

  const closeModal = () => {
    setModalState({open:false, message:''});
};

  const handleSave = (result: SearchResult) => {
    setSaved([...saved, result]);
  };

  const handleDelete = (e: React.MouseEvent, index: any)=>{

    setModalState({open:true, message:`${saved[index].name} deleted successfully`});

    fetch(`/api/deleteSaved/${saved[index].name}`, {
        method: 'DELETE',
    }).then(() => {
        setSaved(saved.filter((_, i) => i !== index));
    })
}

  return (
    <div className="min-h-screen bg-ecoBeige text-ecoDarkGreen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-4">Carbon Footprint Explorer</h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={openNewsletterModal}
            className="bg-transparent text-ecoGreen hover:text-ecoDarkGreen hover:underline focus:outline-none transition duration-300"
          >
            Subscribe to our Newsletter
          </button>
        </div>
        {loading ? (
            <>
            <Combobox onSearch={handleInputChange} results={results} onSave={handleSave} savedResults={saved} setResults={setResults} />
          <div className="flex justify-center items-center h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-400 h-32 w-32"></div>
          </div>
          </>
        ) : (
          <>
            <Combobox onSearch={handleInputChange} results={results} onSave={handleSave} savedResults={saved} setResults={setResults}/>
            {
                loadingData ? (
                    <>
                        <p>Loading Saved Results...</p>
                        <div className="flex justify-start items-start h-screen">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-400 h-16 w-16">
                        </div>
                        </div>
                    </>
                ) : <SavedResults saved={saved} handleDelete={handleDelete} />
            }
          </>
        )}
        
      </div>
      <Modal isOpen={modalState.open} message={modalState.message} onClose={closeModal} />
        {newsletterModalOpen && <NewsletterModal onClose={closeNewsletterModal} />}
    </div>
  );
}
