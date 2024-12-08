import React, { useState } from 'react';
import { useQuery } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { searchToken } from 'wasp/client/operations';

const HomePage = () => {
  const [contractAddress, setContractAddress] = useState('');
  const { data: token, refetch, isLoading, error } = useQuery(
    searchToken,
    { contractAddress },
    { enabled: false }
  );

  const handleSearch = () => {
    refetch();
  };

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Token Search</h1>
      <div className="flex gap-x-4 mb-4">
        <input
          type="text"
          placeholder="Enter Contract Address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className="px-2 py-2 border rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {token && (
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Token Details</h2>
          <p>Contract Address: {token.contractAddress}</p>
          <p>Owner Wallet Address: {token.owner.walletAddress}</p>
          <Link to={`/token/${token.contractAddress}`} className="text-blue-500 hover:underline">
            View Token Page
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
