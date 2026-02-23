import { getSessionAddress } from "./wallet-auth";

export async function getAuthenticatedAuthor() {
  const address = await getSessionAddress();
  if (!address) return null;
  return {
    id: address,
    address,
    name: `${address.slice(0, 6)}...${address.slice(-4)}`,
  };
}

export async function requireAuthor() {
  const author = await getAuthenticatedAuthor();
  if (!author) throw new Error("Unauthorized");
  return author;
}
