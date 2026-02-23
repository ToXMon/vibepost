"use client";

import { useEffect, useState } from "react";

type AgentRun = {
  id: string;
  topic: string;
  status: "QUEUED" | "COMPLETED" | "FAILED";
  freeTitle?: string;
  premiumTitle?: string;
  error?: string;
  createdAt: string;
};

export default function AgentStudio({ onDraftsCreated }: { onDraftsCreated?: () => void }) {
  const [topic, setTopic] = useState("");
  const [referenceMaterial, setReferenceMaterial] = useState("");
  const [loading, setLoading] = useState(false);
  const [runs, setRuns] = useState<AgentRun[]>([]);
  const [message, setMessage] = useState("");

  async function loadRuns() {
    const res = await fetch("/api/agent/runs");
    if (res.ok) setRuns(await res.json());
  }

  useEffect(() => {
    loadRuns();
  }, []);

  async function runAgent() {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, referenceMaterial }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Agent run failed");
      setMessage("Agent completed. Review output below and publish drafts.");
      setTopic("");
      setReferenceMaterial("");
      await loadRuns();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Agent run failed");
    } finally {
      setLoading(false);
    }
  }

  async function publishRun(id: string) {
    const res = await fetch(`/api/agent/publish/${id}`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Failed to publish drafts");
      return;
    }
    setMessage("Free + premium drafts created in your dashboard.");
    onDraftsCreated?.();
  }

  return (
    <section className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="mb-2 text-xl font-semibold text-white">Agent Service: Research → Free + Premium Drafts</h2>
      <p className="mb-4 text-sm text-zinc-400">Use Venice AI or AkashML based on your environment variables.</p>

      <div className="grid gap-3">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic (e.g. Deploying AI agents on Akash with wallet-native auth)"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
        />
        <textarea
          value={referenceMaterial}
          onChange={(e) => setReferenceMaterial(e.target.value)}
          placeholder="Paste your reference docs, links, notes, and constraints here"
          className="min-h-[140px] w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
        />
        <div>
          <button
            disabled={loading || !topic.trim() || !referenceMaterial.trim()}
            onClick={runAgent}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Running Agent..." : "Run Research Agent"}
          </button>
        </div>
      </div>

      {message && <p className="mt-3 text-sm text-zinc-300">{message}</p>}

      <div className="mt-6 space-y-3">
        {runs.map((run) => (
          <div key={run.id} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-white">{run.topic}</p>
                <p className="text-xs text-zinc-500">{new Date(run.createdAt).toLocaleString()}</p>
              </div>
              <span className="text-xs text-zinc-300">{run.status}</span>
            </div>
            {run.freeTitle && <p className="mt-2 text-sm text-zinc-300">Free: {run.freeTitle}</p>}
            {run.premiumTitle && <p className="text-sm text-zinc-300">Premium: {run.premiumTitle}</p>}
            {run.error && <p className="mt-2 text-sm text-red-400">{run.error}</p>}
            {run.status === "COMPLETED" && (
              <button
                onClick={() => publishRun(run.id)}
                className="mt-3 rounded-md border border-purple-500/40 bg-purple-600/20 px-3 py-1.5 text-xs text-purple-200"
              >
                Create Free + Premium Drafts
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
