// © 2026 John Doe. All rights reserved. Unauthorized use prohibited.

import React, { useState } from "react";
import { motion } from "framer-motion";

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

export default function LandingPage() {
  const [trace, setTrace] = useState(null);

  const runDemo = () => {
    setTrace(fakeTrace);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">

      {/* HERO */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Debug AI Systems <br /> <span className="text-gray-400">Cut LLM Costs by 50%</span>
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Deterministic replay, step-level caching, and prompt evaluation — all in one powerful platform.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={runDemo}
            className="px-8 py-4 bg-white text-black rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Run Live Demo
          </button>

          <button className="px-8 py-4 border border-gray-700 rounded-2xl hover:bg-gray-800 transition">
            View Docs
          </button>
        </div>
      </section>

      {/* DEMO */}
      {trace && (
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Execution Trace</h2>

          <div className="space-y-6">
            {trace.steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg"
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-lg">{step.type}</p>
                  <span className="text-xs text-gray-500">#{step.id}</span>
                </div>

                <pre className="text-sm text-gray-400 bg-black p-4 rounded-xl overflow-x-auto">
                  {JSON.stringify(step.input, null, 2)}
                </pre>

                {step.output.output && (
                  <p className="mt-4 text-green-400 font-medium">
                    {step.output.output}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* METRICS */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard label="Total Cost" value={`$${trace.metrics.total_cost}`} />
            <MetricCard label="Cache Savings" value={`$${trace.metrics.cache_savings}`} />
            <MetricCard label="Net Cost" value={`$${trace.metrics.net_cost}`} highlight />
          </div>
        </section>
      )}

      {/* PROBLEM */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">AI Systems Break Silently</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            "Prompts break silently",
            "Outputs change unpredictably",
            "Costs keep rising",
            "Debugging is guesswork",
          ].map((item, i) => (
            <div key={i} className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Start Optimizing Today</h2>
        <p className="text-gray-400 mb-8">Join developers building reliable AI systems.</p>

        <button className="px-10 py-5 bg-white text-black rounded-2xl font-semibold shadow-lg hover:scale-105 transition">
          Get Started
        </button>
      </section>

    </div>
  );
}

function MetricCard({ label, value, highlight }) {
  return (
    <div
      className={`p-6 rounded-2xl border ${
        highlight ? "bg-white text-black" : "bg-gray-900 border-gray-800"
      }`}
    >
      <p className="text-sm opacity-70">{label}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
