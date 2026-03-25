// © 2026 John Doe. All rights reserved. Unauthorized use prohibited.

import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const fakeTrace = {
  id: "abc123",
  columns: [
    {
      id: "initial",
      title: "Initial Run",
      prompt: "explain gravity",
      responseLabel: "Computed",
      response: "Gravity is a force that attracts objects with mass.",
      responseStyle: "computed",
      cost: "0.008",
    },
    {
      id: "subsequent",
      title: "Subsequent Runs",
      prompt: "explain gravity",
      responseLabel: "Retrieved",
      response: "Gravity is a force that attracts objects with mass.",
      responseStyle: "retrieved",
      savings: "0.008",
    },
  ],
  metrics: {
    total_cost: 0.012,
    cache_savings: 0.008,
    net_cost: 0.004,
  },
};

const baseTrace = {
  id: "base",
  prompt: "Explain in one sentence",
  input: "gravity",
  steps: [
    {
      id: "step1",
      type: "prompt_loaded",
      input: { prompt: "Explain in one sentence" },
      output: {},
      cached: true,
    },
    {
      id: "step2",
      type: "model_call",
      input: { input: "gravity" },
      output: {
        output: "Gravity is a force that attracts objects with mass toward each other.",
      },
      cached: false,
    },
  ],
  metrics: {
    total_cost: 0.012,
    cache_savings: 0.0,
    net_cost: 0.012,
  },
};

const improvedTrace = {
  id: "improved",
  prompt: "Explain simply in one short sentence",
  input: "gravity",
  steps: [
    {
      id: "step1",
      type: "prompt_loaded",
      input: { prompt: "Explain simply in one short sentence" },
      output: {},
      cached: false,
    },
    {
      id: "step2",
      type: "model_call",
      input: { input: "gravity" },
      output: {
        output: "Gravity is the force that pulls things toward each other.",
      },
      cached: false,
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
  const [comparisonTrace, setComparisonTrace] = useState(null);

  const runDemo = () => {
    setTrace(fakeTrace);
  };

  const runComparisonDemo = () => {
    setComparisonTrace({ base: baseTrace, improved: improvedTrace });
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
            See Demo
          </button>

          <button 
            onClick={runComparisonDemo}
            className="btn-secondary"
          >
            Optimization
          </button>
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

          <div className="trace-columns-wrapper">
            {trace.columns.map((column, index) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                className="trace-column"
              >
                <div className="column-header">
                  <h3>{column.title}</h3>
                </div>

                {/* Prompt Box */}
                <div className="trace-box prompt-box">
                  <div className="box-label">Prompt:</div>
                  <div className="box-content">{column.prompt}</div>
                </div>

                {/* Response Box */}
                <div className={`trace-box response-box response-${column.responseStyle}`}>
                  <div className="box-label">{column.responseLabel}</div>
                  <div className="box-content">{column.response}</div>
                </div>

                {/* Cost Box */}
                <div className="trace-box cost-box">
                  <div className="box-content">
                    {column.cost ? `cost = $${column.cost}` : `savings = $${column.savings}`}
                  </div>
                </div>
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

      {/* COMPARISON DEMO */}
      {comparisonTrace && (
        <section className="demo-container">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="demo-heading"
          >
            Prompt Optimization
          </motion.h2>

          <div className="trace-columns-wrapper">
            {[
              { title: "Base Prompt", data: comparisonTrace.base, style: "base" },
              { title: "Optimized Prompt", data: comparisonTrace.improved, style: "improved" },
            ].map((column, index) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                className="trace-column"
              >
                <div className="column-header">
                  <h3>{column.title}</h3>
                </div>

                {/* Prompt Box */}
                <div className="trace-box prompt-box">
                  <div className="box-label">Prompt:</div>
                  <div className="box-content">{column.data.prompt}</div>
                </div>

                {/* Response Box */}
                <div className={`trace-box response-box response-${column.style}`}>
                  <div className="box-label">Response</div>
                  <div className="box-content">{column.data.steps[1].output.output}</div>
                </div>

                {/* Cost Box */}
                <div className="trace-box cost-box">
                  <div className="box-content">
                    cost = ${column.data.metrics.net_cost}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* METRICS */}
          <div className="metrics-grid">
            <MetricCard label="Base Cost" value={`$${comparisonTrace.base.metrics.net_cost}`} />
            <MetricCard label="Optimized Cost" value={`$${comparisonTrace.improved.metrics.net_cost}`} />
            <MetricCard label="Savings" value={`$${comparisonTrace.base.metrics.net_cost - comparisonTrace.improved.metrics.net_cost}`} highlight />
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




