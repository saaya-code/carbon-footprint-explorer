'use client';

import { useState, FormEvent } from 'react';
import { subscribe } from '../app/actions/subscribe';

interface NewsletterModalProps {
  onClose: () => void;
}

export default function NewsletterModal({ onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const responseMessage = await subscribe(email);
      setMessage(responseMessage);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-2"
            required
          />
          <button type="submit" className="bg-ecoGreen text-white rounded p-2 w-full">
            Subscribe
          </button>
        </form>
        {message && <p className="mt-2">{message}</p>}
        <button onClick={onClose} className="mt-4 bg-gray-500 text-white rounded p-2">
          Close
        </button>
      </div>
    </div>
  );
}
