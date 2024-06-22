'use client';
import { Trash } from "lucide-react";
import { Button } from "./Button";
import { useState } from "react";

interface SearchResult {
    name: string;
    id: string;
    eye_color?: string;
    hair_color?: string;
    gender?: string;
    height?: string;
    [key: string]: any;
  }

interface SavedResultsProps {
  saved: SearchResult[];
  handleDelete: (e: React.MouseEvent, index: number) => void;
}

export default function SavedResults({ saved, handleDelete }: SavedResultsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="p-4">
      <h2 className="text-ecoDarkGreen text-lg font-bold">Saved Results</h2>
      <ul className="space-y-2 mt-2">
        {saved.map((item, index) => (
          <li
            key={item.name + index}
            className="relative border border-gray-400 rounded p-2 w-half flex justify-between"

          >
            <div >
              <span             
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="font-bold">{item.name}
              </span>
            </div>
            <Button className="bg-ecoBrown text-white rounded p-1" onClick={(e) => { handleDelete(e, index) }}>
              <Trash />
            </Button>
            {hoveredIndex === index && (
              <div className="absolute left-0 top-full mt-2 p-2 bg-white border border-gray-300 rounded shadow-lg z-10 w-64">
                <div className="text-sm flex">
                  <strong>Eye Color:</strong> {item.eye_color}
                  <div
                    className="ml-2 w-4 h-4 border border-gray-400 rounded"
                    style={{ backgroundColor: item.eye_color || 'transparent' }}
                  ></div>
                </div>
                <div className="text-sm flex">
                  <strong>Hair Color:</strong> {item.hair_color}
                  <div
                    className="ml-2 w-4 h-4 border border-gray-400 rounded"
                    style={{ backgroundColor: item.hair_color || 'transparent' }}
                  ></div>
                </div>
                <div className="text-sm">
                  <strong>Gender:</strong> {item.gender}
                </div>
                <div className="text-sm">
                  <strong>Height:</strong> {item.height}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
