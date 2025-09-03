"use client";

import { useEffect, useState } from "react";

type Participant = {
  id: number;
  name: string;
  start: string | null;
  end: string | null;
};

export default function Home() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState("");

  const fetchParticipants = async () => {
    const res = await fetch("/api/participants");
    const data = await res.json();
    setParticipants(data);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const addParticipant = async () => {
    if (!name) return;
    await fetch("/api/participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchParticipants();
  };

  const startTime = async (id: number) => {
    await fetch(`/api/start/${id}`, { method: "POST" });
    fetchParticipants();
  };

  const stopTime = async (id: number) => {
    await fetch(`/api/stop/${id}`, { method: "POST" });
    fetchParticipants();
  };

  const formatTime = (t: string | null) =>
    t ? new Date(t).toLocaleTimeString() : "--";

  const formatDuration = (start: string | null, end: string | null) => {
    if (!start || !end) return "--";
    const sec = Math.floor(
      (new Date(end).getTime() - new Date(start).getTime()) / 1000
    );
    return `${sec}s`;
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏃 Obstacle Course Timer</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter participant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={addParticipant}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </div>

      <div className="space-y-4">
        {participants.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm">Start: {formatTime(p.start)}</p>
              <p className="text-sm">End: {formatTime(p.end)}</p>
              <p className="text-sm">
                Duration: {formatDuration(p.start, p.end)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startTime(p.id)}
                disabled={!!p.start && !p.end}
                className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Start
              </button>
              <button
                onClick={() => stopTime(p.id)}
                disabled={!p.start || !!p.end}
                className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Stop
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
