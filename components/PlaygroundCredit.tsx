"use client";
import { useRef, useState } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import Link from "next/link";

export default function PlaygroundCredit() {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,

      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleJobChange = (e: any) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      Job: value,
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

  const jobDescriptions: Record<number, { title: string; desc: string }> = {
    0: { title: "Unskilled", desc: "Non-resident workers or simple laborers" },
    1: {
      title: "Skilled",
      desc: "Standard skilled workers with steady employment",
    },
    2: {
      title: "Highly Skilled",
      desc: "Experienced professionals, managers, or civil servants",
    },
    3: {
      title: "Executive",
      desc: "High-level executives, qualified professionals, or self-employed with high income",
    },
  };

  const currentJobLevel =
    formData.Job !== "" ? jobDescriptions[Number(formData.Job)] : null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-700 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 p-8 shadow-2xl sm:p-10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-zinc-100 opacity-[0.03] blur-3xl"></div>

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
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
            <Link
              href="/projects/mlp_services"
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-zinc-100"
            >
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to Projects
            </Link>
          </div>
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

          <div className="sm:col-span-2 md:col-span-3">
            <div className="flex items-center gap-2">
              <label className={labelStyles}>Job Category</label>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip("job")}
                  onMouseLeave={() => setShowTooltip(null)}
                  className="rounded-full bg-zinc-800 p-1 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                {showTooltip === "job" && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-lg border border-zinc-700 bg-zinc-900 p-3 shadow-xl z-50">
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Select the job category that best describes the
                      applicant's employment status and skill level.
                    </p>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-zinc-900 border-r border-b border-zinc-700 rotate-45 -mt-1" />
                  </div>
                )}
              </div>
            </div>

            <input
              type="range"
              name="Job"
              value={formData.Job}
              onChange={handleJobChange}
              min="0"
              max="3"
              step="1"
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500 mt-2"
            />

            <div className="flex justify-between mt-2 text-xs text-zinc-500 font-mono">
              <span className="text-center">0</span>
              <span className="text-center">1</span>
              <span className="text-center">2</span>
              <span className="text-center">3</span>
            </div>

            {currentJobLevel && (
              <div className="mt-3 p-3 rounded-lg border border-violet-500/30 bg-violet-500/5">
                <p className="text-sm font-semibold text-violet-300">
                  Level {formData.Job}: {currentJobLevel.title}
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  {currentJobLevel.desc}
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <label className={labelStyles}>Saving Accounts</label>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip("saving")}
                  onMouseLeave={() => setShowTooltip(null)}
                  className="rounded-full bg-zinc-800 p-1 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                {showTooltip === "saving" && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg border border-zinc-700 bg-zinc-900 p-3 shadow-xl z-50">
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Average monthly savings balance in the account.
                    </p>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-zinc-900 border-r border-b border-zinc-700 rotate-45 -mt-1" />
                  </div>
                )}
              </div>
            </div>
            <select
              name="Saving accounts"
              value={formData["Saving accounts"]}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="NA">No Account</option>
              <option value="little">€0 - €100 / month</option>
              <option value="moderate">€100 - €500 / month</option>
              <option value="rich">€500 - €2000 / month</option>
              <option value="quite rich">{">"} €2000 / month</option>
            </select>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <label className={labelStyles}>Checking Account</label>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip("checking")}
                  onMouseLeave={() => setShowTooltip(null)}
                  className="rounded-full bg-zinc-800 p-1 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                {showTooltip === "checking" && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg border border-zinc-700 bg-zinc-900 p-3 shadow-xl z-50">
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Average monthly checking account balance.
                    </p>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-zinc-900 border-r border-b border-zinc-700 rotate-45 -mt-1" />
                  </div>
                )}
              </div>
            </div>
            <select
              name="Checking account"
              value={formData["Checking account"]}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="NA">No Account</option>
              <option value="little">€0 - €100 / month</option>
              <option value="moderate">€100 - €500 / month</option>
              <option value="rich">{">"} €500 / month</option>
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
