"use client";
import { useRef, useState } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

export default function PlaygroundCredit() {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,

      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const [formData, setFormData] = useState({
    Age: "",
    Sex: "",
    Job: "",
    Housing: "",
    "Saving accounts": "NA",
    "Checking account": "NA",
    "Credit amount": "",
    Duration: "",
    Purpose: "",
  });

  const triggerRequest = async () => {
    if (!turnstileToken) {
      alert(
        "Please wait until the Turnstile security check is completed before using the playground.",
      );
      return;
    }

    if (formData.Duration === "" || Number(formData.Duration) <= 0) {
      setResult("Error: Duration must be greater than 0.");
      return;
    }
    if (formData.Age === "" || Number(formData.Age) < 18) {
      setResult("Error: Requester need to be at least 18 years old.");
      return;
    }
    if (
      formData["Credit amount"] === "" ||
      Number(formData["Credit amount"]) <= 0
    ) {
      setResult("Error: Credit amount must be greater than 0.");
      return;
    }
    if (!formData.Sex || !formData.Housing || !formData.Purpose) {
      setResult("Error: Please select all options from the dropdown menus.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const API = "/api/predict";
      const response = await fetch(API, {
        method: "POST",
        headers: { TO: "credit" },
        body: JSON.stringify({ formData, turnstileToken }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResult(`Connection error: ${error.message}`);
    } finally {
      setLoading(false);
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  const inputStyles =
    "w-full rounded-md border border-zinc-700 bg-zinc-900/50 p-2.5 text-zinc-100 placeholder-zinc-500 transition-all focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400";
  const labelStyles =
    "mb-1.5 block text-xs font-mono tracking-wider text-zinc-400 uppercase";

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-700 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 p-8 shadow-2xl sm:p-10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-zinc-100 opacity-[0.03] blur-3xl"></div>

        <div className="mb-8 flex items-center justify-between">
          <svg
            className="h-12 w-12 text-zinc-500 opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
          <h3 className="font-mono text-lg font-bold tracking-widest text-zinc-300 uppercase">
            Credit Scoring Model
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="sm:col-span-2 md:col-span-3">
            <label className={labelStyles}>Credit Amount ($)</label>
            <input
              type="number"
              name="Credit amount"
              value={formData["Credit amount"]}
              onChange={handleChange}
              min="100"
              placeholder="e.g. 5000"
              className={`${inputStyles} text-lg md:text-2xl font-semibold tracking-widest py-3`}
            />
          </div>

          <div>
            <label className={labelStyles}>Duration (Months)</label>
            <input
              type="number"
              name="Duration"
              value={formData.Duration}
              onChange={handleChange}
              min="1"
              max="72"
              placeholder="e.g. 24"
              className={inputStyles}
            />
          </div>

          <div>
            <label className={labelStyles}>Purpose</label>
            <select
              name="Purpose"
              value={formData.Purpose}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="">Select...</option>
              <option value="business">Business</option>
              <option value="car">Car</option>
              <option value="domestic appliances">Domestic Appliances</option>
              <option value="education">Education</option>
              <option value="radio/TV">Radio/TV</option>
              <option value="repairs">Repairs</option>
              <option value="vacation/others">Vacation/Others</option>
            </select>
          </div>

          <div>
            <label className={labelStyles}>Age (18-100)</label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              min="18"
              max="100"
              placeholder="e.g. 35"
              className={inputStyles}
            />
          </div>

          <div>
            <label className={labelStyles}>Sex</label>
            <select
              name="Sex"
              value={formData.Sex}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className={labelStyles}>Housing</label>
            <select
              name="Housing"
              value={formData.Housing}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="">Select...</option>
              <option value="own">Own</option>
              <option value="rent">Rent</option>
              <option value="free">Free</option>
            </select>
          </div>

          <div>
            <label className={labelStyles}>Job Category (0-3)</label>
            <input
              type="number"
              name="Job"
              value={formData.Job}
              onChange={handleChange}
              min="0"
              max="3"
              placeholder="0-3"
              className={inputStyles}
            />
          </div>

          <div>
            <label className={labelStyles}>Saving Accounts</label>
            <select
              name="Saving accounts"
              value={formData["Saving accounts"]}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="NA">NA</option>
              <option value="little">Little</option>
              <option value="moderate">Moderate</option>
              <option value="rich">Rich</option>
              <option value="quite rich">Quite Rich</option>
            </select>
          </div>

          <div>
            <label className={labelStyles}>Checking Account</label>
            <select
              name="Checking account"
              value={formData["Checking account"]}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="NA">NA</option>
              <option value="little">Little</option>
              <option value="moderate">Moderate</option>
              <option value="rich">Rich</option>
              <option value="quite rich">Quite Rich</option>
            </select>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-zinc-700/50 pt-8 md:flex-row">
          <div className="flex justify-center bg-zinc-950 p-2 rounded-lg border border-zinc-800">
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => setTurnstileToken(token)}
            />
          </div>

          <button
            onClick={triggerRequest}
            disabled={loading}
            className={`w-full md:w-auto rounded-lg px-8 py-3.5 font-bold transition-all ${
              loading
                ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                : "bg-zinc-100 text-zinc-950 hover:bg-white hover:scale-[1.02] active:scale-95"
            }`}
          >
            {loading ? "Authorizing..." : "Launch Prediction"}
          </button>
        </div>
      </div>

      {result && (
        <div className="mx-auto mt-6 w-full max-w-4xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
          <div className="border-b border-zinc-800 bg-zinc-900 px-4 py-2">
            <span className="font-mono text-xs text-zinc-500">
              Output Terminal
            </span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-sm text-emerald-400">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
