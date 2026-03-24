// © 2026 John Doe. All rights reserved. Unauthorized use prohibited.

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fakeTrace = {
  id: "abc123",
  steps: [
    {
      id: "step1",
      type: "Prompt Loaded",
      input: { prompt: "Explain" },
      output: {},
    },
    {
      id: "step2",
      type: "Model Call",
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

  const runDemo = () => setTrace(fakeTrace);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">

      {/* HERO */}
      <section className="text-center py-24 px-6 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-6 leading-tight"
        >
          Understand, Debug, and Optimize Your AI Systems
        </motion.h1>
        <p className="text-xl text-gray-600 mb-10">
          Deterministic replay. Step-level caching. Full transparency.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={runDemo} className="rounded-2xl px-6 py-4 text-lg">
            Run Live Demo
          </Button>
          <Button variant="outline" className="rounded-2xl px-6 py-4 text-lg">
            View Docs
          </Button>
        </div>
      </section>

      {/* DEMO */}
      {trace && (
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Live Execution Trace</h2>

          <div className="space-y-6">
            {trace.steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-2xl shadow-md">
                  <CardContent className="p-5">
                    <p className="font-semibold mb-2">{step.type}</p>
                    <pre className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(step.input, null, 2)}
                    </pre>
                    {step.output.output && (
                      <p className="mt-3 text-green-600 font-medium">
                        {step.output.output}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* METRICS */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard label="Total Cost" value={`$${trace.metrics.total_cost}`} />
            <MetricCard label="Cache Savings" value={`$${trace.metrics.cache_savings}`} />
            <MetricCard label="Net Cost" value={`$${trace.metrics.net_cost}`} />
          </div>
        </section>
      )}

      {/* PROBLEM */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              AI systems fail silently
            </h2>
            <ul className="space-y-4 text-lg text-gray-600">
              <li>❌ Prompts degrade over time</li>
              <li>❌ Outputs become inconsistent</li>
              <li>❌ Costs spiral without visibility</li>
              <li>❌ Debugging is reactive, not proactive</li>
            </ul>
          </div>

          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 text-lg">
              <p>
                Most teams ship AI without observability. You're flying blind.
                <br /><br />
                This platform gives you full control.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-gradient-to-r from-gray-900 to-black text-white">
        <h2 className="text-4xl font-bold mb-6">
          Take control of your AI stack
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Reduce costs. Improve reliability. Ship faster.
        </p>
        <Button className="rounded-2xl px-8 py-5 text-lg">
          Get Started
        </Button>
      </section>

    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <Card className="rounded-2xl shadow">
      <CardContent className="p-6 text-center">
        <p className="text-sm text-gray-500 mb-2">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
