# Github Repository AI Agent  

  <a href="https://www.youtube.com/watch?v=LUFkL5DFWEE" target="_blank" rel="noopener noreferrer">
  <img width="800" height="450" alt="github Agent" src="https://github.com/user-attachments/assets/4d7fa67c-e544-4aaa-ba85-3c22f002b0e8"/>
</a>
  <br />  <br />
An AI powered repository analysis tool that injects repositories and answers natural language questions. Instead of manually searching through files, simply provide a GitHub repository URL and ask questions about the codebase.


## Overview & Demo
__Demo:__ Please click the GIF above or follow this hyperlink  <a href="https://www.youtube.com/watch?v=LUFkL5DFWEE">https://www.youtube.com/watch?v=LUFkL5DFWEE</a>

Understanding a new codebase can be time-consuming. This project simplifies that process by transforming any GitHub repository into an AI-powered conversational assistant. The application clones a repository, processes its source code, generates vector embeddings, and retrieves the most relevant code before sending it to a language model for response generation.

The result is an interactive developer tool capable of explaining:

⭐ Project architecture  
⭐ Functionality  
⭐ Implementation details  
⭐ Code organization  
⭐ Repository-specific questions  




## How It Works

The application follows a **Retrieval-Augmented Generation (RAG)** pipeline.

### 1. Repository Ingestion

After a GitHub repository URL is submitted, the backend:

- Clones the repository locally
- Scans the project files
- Parses the source code
- Splits large files into smaller chunks for efficient processing
  <br /><br />
### 2. Embedding Generation

Each code chunk is converted into a vector embedding using OpenAI embeddings.  
These embeddings allow the application to perform semantic search rather than relying on keyword matching.
<br /><br />
### 3. Semantic Retrieval

When a user asks a question:

1. The query is converted into an embedding.
2. The system compares it against all stored code embeddings.
3. The most relevant code snippets are retrieved.
4. Those snippets are injected into the AI prompt.


### 4. AI Response Generation

The language model generates an answer grounded in the retrieved repository context, allowing it to provide accurate explanations about the codebase.

## Features

- Clone GitHub repositories automatically
- Parse and chunk repository source code
- Generate embeddings using OpenAI
- Perform semantic search over repository code
- Chat with repositories using natural language
- Explain architecture, functionality, and implementation details
- Retrieval-Augmented Generation (RAG) pipeline


## Technologies Used

| Technology | Purpose |
|------------|---------|
| **Next.js** | Full-stack React framework |
| **TypeScript** | Type-safe development |
| **OpenAI API** | Embeddings & conversational AI |
| **LangChain** | Text splitting and chunking |
| **Tailwind CSS** | Modern responsive UI |
| **In-Memory Vector Store** | Fast semantic retrieval during development |

---

## Why I Built It

Modern software development is rapidly shifting toward **AI-assisted workflows**.

I built this project to explore how large language models can improve developer productivity by helping developers navigate and understand unfamiliar codebases more efficiently.

Rather than simply integrating an AI API, this project focuses on the engineering behind AI systems, including:

- Repository ingestion
- Code chunking strategies
- Vector embeddings
- Semantic retrieval
- Context-aware prompting
- Retrieval-Augmented Generation (RAG)

## Workflow

<img width="1087" height="384" alt="githubimage2png" src="https://github.com/user-attachments/assets/1409db8b-be64-41a6-96b3-c359e9fdb150" />

This the flow of the program, both behind-the-scenes and trigger actions with the user.


## Use Cases

- Learn unfamiliar codebases quickly
- Understand project architecture
- Explore open-source repositories
- Ask implementation-specific questions
- Speed up onboarding for new developers
- Improve developer productivity

---

## Final Thoughts

This project demonstrates how AI can be integrated into developer tooling to create more efficient and interactive workflows.

By combining **semantic retrieval** with **conversational AI**, the application transforms static GitHub repositories into searchable, explainable systems that developers can explore naturally through chat.

