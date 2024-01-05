import React from "react";

function LandingPage() {
  return (
    <div className="bg-dark text-white min-h-screen">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">Coadapt: Your AI Chat Companion</h1>
        <p className="text-xl">
          Explore real-time AI chat experiences powered by Google Gemini.
        </p>
      </header>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Why Coadapt?</h2>
          <p className="text-lg">
            Coadapt's AI chat platform uses Google Gemini's cutting-edge
            language model to provide engaging and adaptable chat experiences.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">How does it work?</h2>
          <p className="text-lg">
            Simply visit our website and type in your desired conversation
            topic. Our AI chatbot will then provide real-time responses,
            adapting its language style based on the context of your
            conversation.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Privacy and Trust</h2>
          <p className="text-lg">
            Coadapt takes your privacy seriously. Your interactions with our AI
            chatbot are end-to-end encrypted, ensuring that your conversations
            remain private.
          </p>
        </section>
      </main>
      <footer className="text-center py-4">
        <p>Copyright © {new Date().getFullYear()} Your Company Name</p>
      </footer>
    </div>
  );
}

export default LandingPage;
