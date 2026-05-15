"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [repoName, setRepoName] =
    useState("");

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [repoLoading, setRepoLoading] =
    useState(false);

  async function ingestRepo() {
    if (!url) return;

    setRepoLoading(true);

    try {
      const response = await fetch(
        "/api/ingest",
        {
          method: "POST",
          body: JSON.stringify({ url })
        }
      );

      const data = await response.json();

      setRepoName(data.repoName);

      setMessages([
        {
          role: "assistant",
          content:
            `Repository "${data.repoName}" ingested successfully. You can now ask questions about the codebase.`
        }
      ]);

    } catch (error) {
      console.error(error);

      setMessages([
        {
          role: "assistant",
          content:
            "Failed to ingest repository."
        }
      ]);
    }

    setRepoLoading(false);
  }

  async function askQuestion() {
    if (!question || !repoName) return;

    const userMessage = {
      role: "user" as const,
      content: question
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    const currentQuestion = question;

    setQuestion("");

    setLoading(true);

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",
          body: JSON.stringify({
            repoName,
            question: currentQuestion
          })
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer
        }
      ]);

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong."
        }
      ]);
    }

    setLoading(false);
  }

  return (
    <main className="h-screen bg-gradient-to-b from-sky-900 to-slate-950 text-zinc-200 flex flex-col p-4">

      {/* Header */}
      <div className="border-b border-zinc-900 !items-center p-4">

        <h1 className="text-3xl font-bold mb-7 mt-2 text-center  " >
          GitHub Repo AI Agent
        </h1>

        <div className="flex gap-2">

          <input
            className="
              flex-1
              bg-zinc-300
              border
              border-zinc-500
              rounded-lg
              px-4
              py-3
              outline-none
              text-black
            "
            placeholder="Paste GitHub repository URL..."
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
          />

          <button
            onClick={ingestRepo}
            disabled={repoLoading}
            className="
              bg-zinc-200
              text-black
              px-5 
              rounded-lg
              font-medium
              hover:bg-zinc-300
              transition
            "
          >
            {repoLoading
              ? "Loading..."
              : "Ingest"}
          </button>

        </div>

        {repoName && (
          <p className="text-md text-zinc-200 mt-2">
            Active Repo: {repoName}
          </p>
        )}

      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {messages.length === 0 && (
          <div className="text-zinc-200 text-center  text-xl mt-20 !text-heading">
            Enter a repository to begin chatting! The Agent will process the codebase and provide answers to your questions.
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`
              flex
              ${message.role === "user"
                ? "justify-end"
                : "justify-start"}
            `}
          >

            <div
              className={`
                max-w-[75%]
                rounded-2xl
                px-4
                py-3
                whitespace-pre-wrap
                ${
                  message.role === "user"
                    ? "bg-slate-300 text-black"
                    : "bg-slate-400 text-black"
                }
              `}
            >
              {message.content}
            </div>

          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="
              bg-slate-300
              rounded-2xl
              px-4
              py-3
              text-zinc-900
            ">
              Thinking...
            </div>
          </div>
        )}

      </div>

      {/* Input */}
      <div className="
        border-t
        border-zinc-800
        p-4
      ">

        <div className="flex gap-2">

          <input
            className="
              flex-1
              bg-slate-900
              border
              border-zinc-700
              rounded-lg
              px-4
              py-3
              outline-none
              text-white
            "
            placeholder="Ask a question about the repository..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askQuestion();
              }
            }}
          />

          <button
            onClick={askQuestion}
            disabled={loading}
            className="
              bg-zinc-300
              text-black
              px-5
              rounded-lg
              font-medium
              hover:bg-zinc-400
              transition
            "
          >
            Send
          </button>

        </div>

      </div>

    </main>
  );
}