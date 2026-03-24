import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'




// © 2026 John Doe. All rights reserved. Unauthorized use prohibited.

import React, { useState } from "react";

// -----------------------------
// FAKE DEMO DATA
// -----------------------------

const fakeTrace = {
  id: "abc123",
  steps: [
    {
      id: "step1",
      type: "prompt_loaded",
      input: { prompt: "Explain" },
      output: {},
    },
    {
      id: "step2",
      type: "model_call",
      input: { input: "gravity" },
      output: { output: "Gravity is a force that attracts objects with mass." },
    },
  ],
  metrics: {
    total_cost: 0.012,
    cache_savings: 0.008,
    net_cost: 0.004,
  },
};

// -----------------------------
// COMPONENT
// -----------------------------

export default function LandingPage() {
  const [trace, setTrace] = useState(null);

  const runDemo = () => {
    setTrace(fakeTrace);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-6">
          Debug your AI systems and cut LLM costs by up to 50%
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Deterministic replay, step-level caching, and prompt evaluation — all in one platform.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={runDemo} className="px-6 py-3 bg-black text-white rounded-2xl shadow">
            Run Demo
          </button>
          <button className="px-6 py-3 border rounded-2xl">
            View Docs
          </button>
        </div>
      </section>

      {/* DEMO OUTPUT */}
      {trace && (
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Execution Trace</h2>

          <div className="space-y-4">
            {trace.steps.map((step) => (
              <div key={step.id} className="p-4 border rounded-xl">
                <p className="font-bold">{step.type}</p>
                <pre className="text-sm text-gray-600">
                  {JSON.stringify(step.input, null, 2)}
                </pre>
                {step.output.output && (
                  <p className="mt-2 text-green-700">{step.output.output}</p>
                )}
              </div>
            ))}
          </div>

          {/* METRICS */}
          <div className="mt-8 p-6 bg-black text-white rounded-2xl">
            <p>Total cost: ${trace.metrics.total_cost}</p>
            <p>Saved via cache: ${trace.metrics.cache_savings}</p>
            <p>Net cost: ${trace.metrics.net_cost}</p>
          </div>
        </section>
      )}

      {/* PROBLEM */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Your AI system works… until it doesn’t
        </h2>
        <ul className="space-y-3 text-lg text-gray-700">
          <li>Prompts break silently</li>
          <li>Outputs change unpredictably</li>
          <li>Costs keep rising</li>
          <li>Debugging is guesswork</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Start optimizing your AI today
        </h2>
        <button className="px-8 py-4 bg-black text-white rounded-2xl shadow">
          Get Started
        </button>
      </section>

    </div>
  );
}


