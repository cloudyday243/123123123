import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, searchToken, createInviteLink } from 'wasp/client/operations';

const TokenPage = () => {
  const { contractAddress } = useParams();
  const { data: token, isLoading, error } = useQuery(searchToken, { contractAddress });
  const createInviteLinkFn = useAction(createInviteLink);

  const handleCreateInviteLink = async () => {
    try {
      const { inviteLink } = await createInviteLinkFn({ contractAddress });
      alert(`Invite link created: ${inviteLink}`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (isLoading) return 'Loading...';
  if (error) return `Error: ${error}`;

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Token Details</h1>
      <p><strong>Contract Address:</strong> {token.contractAddress}</p>
      <p><strong>Owner Wallet Address:</strong> {token.owner.walletAddress}</p>
      <button
        onClick={handleCreateInviteLink}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Create Invite Link
      </button>
    </div>
  );
};

export default TokenPage;
