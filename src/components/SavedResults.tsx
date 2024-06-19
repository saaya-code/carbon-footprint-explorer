'use client';

import { Trash } from "lucide-react";
import { Button } from "./Button";

interface SearchResult {
  name: string;
  [key: string]: any;
}

interface SavedResultsProps {
    saved: SearchResult[];
    handleDelete: (e:React.MouseEvent ,index: number) => void;
}

export default function SavedResults({ saved, handleDelete }: SavedResultsProps) {
    

  return (
    <div className="p-4">
      <h2 className="text-ecoDarkGreen text-lg font-bold">Saved Results</h2>
      <ul className="space-y-2 mt-2">
        {saved.map((item, index) => (
          <li key={item.name+index} className="border border-gray-400 rounded p-2 w-half flex justify-between">
            <span className="font-bold">{item.name}</span>
            <Button className="bg-ecoBrown text-white rounded p-1" onClick={(e)=>{handleDelete(e,index)}}>
              <Trash/>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
