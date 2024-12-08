import { HttpError } from 'wasp/server'

export const claimTelegram = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  const { telegramHandle } = args;
  if (!telegramHandle) { throw new HttpError(400, 'Telegram handle is required'); }

  return context.entities.User.update({
    where: { id: context.user.id },
    data: { telegramHandle }
  });
}

export const createInviteLink = async ({ contractAddress }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const token = await context.entities.Token.findFirst({
    where: {
      contractAddress: contractAddress,
      ownerId: context.user.id
    }
  });
  
  if (!token) { throw new HttpError(403, 'User does not own the specified token.'); }

  const inviteLink = `https://example.com/invite?user=${context.user.id}`;
  return { inviteLink };
}
