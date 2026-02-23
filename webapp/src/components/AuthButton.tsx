"use client";

import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

type WalletUser = {
  address: string;
  name: string;
};

export default function AuthButton() {
  const [user, setUser] = useState<WalletUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null));
  }, []);

  async function handleSignIn() {
    if (!window.ethereum) {
      alert("No wallet found. Install MetaMask or Rabby.");
      return;
    }

    setLoading(true);

    try {
      const [address] = (await window.ethereum.request({ method: "eth_requestAccounts" })) as string[];
      const nonceRes = await fetch("/api/auth/siwe/nonce");
      const { nonce } = await nonceRes.json();

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in to VibePost with Ethereum",
        uri: window.location.origin,
        version: "1",
        chainId: 1,
        nonce,
      }).prepareMessage();

      const signature = (await window.ethereum.request({
        method: "personal_sign",
        params: [message, address],
      })) as string;

      const verifyRes = await fetch("/api/auth/siwe/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature }),
      });

      if (!verifyRes.ok) throw new Error("wallet verification failed");

      const data = await verifyRes.json();
      setUser({ address: data.address, name: `${data.address.slice(0, 6)}...${data.address.slice(-4)}` });
      window.location.reload();
    } catch {
      alert("Wallet sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.reload();
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-neutral-400">{user.name}</span>
        <button
          onClick={handleSignOut}
          className="px-3 py-1.5 text-sm border border-neutral-700 rounded-lg text-neutral-300 hover:bg-neutral-800 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white rounded-lg transition-colors text-sm"
    >
      {loading ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
