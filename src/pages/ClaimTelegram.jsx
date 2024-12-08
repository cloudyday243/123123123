import React, { useState } from 'react';
import { useAction } from 'wasp/client/operations';
import { claimTelegram } from 'wasp/client/operations';

const ClaimTelegramPage = () => {
  const claimTelegramFn = useAction(claimTelegram);
  const [telegramHandle, setTelegramHandle] = useState('');
  const [message, setMessage] = useState('');

  const handleClaim = async () => {
    try {
      await claimTelegramFn({ telegramHandle });
      setMessage('Telegram handle claimed successfully!');
      setTelegramHandle('');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Claim Your Telegram Handle</h1>
      <input
        type="text"
        placeholder="Enter your Telegram handle"
        className="px-3 py-2 border rounded text-lg mb-4 w-full"
        value={telegramHandle}
        onChange={(e) => setTelegramHandle(e.target.value)}
      />
      <button
        onClick={handleClaim}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Claim Handle
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default ClaimTelegramPage;
