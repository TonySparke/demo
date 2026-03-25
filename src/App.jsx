// © 2026 John Doe. All rights reserved. Unauthorized use prohibited.

import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

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
    <div className="page-container">

      {/* HERO */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Debug AI Systems <br />
          <span>Cut LLM Costs by 50%</span>
        </motion.h1>

        <p>
          Deterministic replay, step-level caching, and prompt evaluation — all in one powerful platform.
        </p>

        <div className="button-group">
          <button
            onClick={runDemo}
            className="btn-primary"
          >
            Run Live Demo
          </button>

          <button className="btn-secondary">
            View Docs
          </button>
        </div>
      </section>

      {/* LOCAL CHECK: custom App.css card and button */}
      <section className="sanity-check-section">
        <div className="card sanity-check-card">
          <h3>CSS Sanity Check</h3>
          <p>If you see this still-glassy translucent card style, App.css is active.</p>
          <button className="btn-primary">I am styled from App.css</button>
        </div>
      </section>

      {/* DEMO */}
      {trace && (
        <section className="demo-container">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="demo-heading"
          >
            Execution Trace
          </motion.h2>

          <div>
            {trace.steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                className="trace-item"
              >
                <div className="trace-header">
                  <p>{step.type}</p>
                  <span className="trace-id">#{step.id}</span>
                </div>

                <pre className="code-block">
                  {JSON.stringify(step.input, null, 2)}
                </pre>

                {step.output.output && (
                  <div className="output-success">
                    {step.output.output}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* METRICS */}
          <div className="metrics-grid">
            <MetricCard label="Total Cost" value={`$${trace.metrics.total_cost}`} />
            <MetricCard label="Cache Savings" value={`$${trace.metrics.cache_savings}`} />
            <MetricCard label="Net Cost" value={`$${trace.metrics.net_cost}`} highlight />
          </div>
        </section>
      )}

      {/* PROBLEM */}
      <section className="section-container text-center">
        <h2 className="section-title">AI Systems Break Silently</h2>

        <div className="grid-cards">
          {[
            "Prompts break silently",
            "Outputs change unpredictably",
            "Costs keep rising",
            "Debugging is guesswork",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-container section-footer">
        <h2 className="section-title">
          Start Optimizing Today
        </h2>
        <p className="cta-subtitle">
          Join developers building reliable AI systems.
        </p>

        <button className="btn-primary">
          Get Started
        </button>
      </section>

    </div>
  );
}

function MetricCard({ label, value, highlight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`metric-card ${highlight ? 'highlight' : ''}`}
    >
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
    </motion.div>
  );
}




