import { HttpError } from 'wasp/server'

export const searchToken = async ({ contractAddress }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const token = await context.entities.Token.findUnique({
    where: { contractAddress },
    select: {
      id: true,
      contractAddress: true,
      owner: {
        select: {
          id: true,
          walletAddress: true
        }
      }
    }
  });

  if (!token) throw new HttpError(404, 'No token with contract address ' + contractAddress);

  return token;
}
