"use client";
import { useRef, useState } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import Link from "next/link";

export default function PlaygroundChurn() {
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
    Accountlength: "",
    International_plan: "",
    Voice_mail_plan: "",
    Number_vmail_messages: "",
    Total_day_minutes: "",
    Total_day_calls: "",
    Total_day_charge: "",
    Total_eve_minutes: "",
    Total_eve_calls: "",
    Total_eve_charge: "",
    Total_night_minutes: "",
    Total_night_calls: "",
    Total_night_charge: "",
    Total_intl_minutes: "",
    Total_intl_calls: "",
    Total_intl_charge: "",
    Customer_service_calls: "",
  });

  const fillRandomData = () => {
    setFormData({
      Accountlength: String(Math.floor(Math.random() * 200) + 1),
      International_plan: Math.random() > 0.5 ? "Yes" : "No",
      Voice_mail_plan: Math.random() > 0.5 ? "Yes" : "No",
      Number_vmail_messages: String(Math.floor(Math.random() * 50)),
      Total_day_minutes: (Math.random() * 300 + 50).toFixed(1),
      Total_day_calls: String(Math.floor(Math.random() * 150) + 20),
      Total_day_charge: (Math.random() * 50 + 10).toFixed(2),
      Total_eve_minutes: (Math.random() * 350 + 50).toFixed(1),
      Total_eve_calls: String(Math.floor(Math.random() * 120) + 30),
      Total_eve_charge: (Math.random() * 30 + 10).toFixed(2),
      Total_night_minutes: (Math.random() * 300 + 50).toFixed(1),
      Total_night_calls: String(Math.floor(Math.random() * 120) + 30),
      Total_night_charge: (Math.random() * 15 + 5).toFixed(2),
      Total_intl_minutes: (Math.random() * 20 + 1).toFixed(1),
      Total_intl_calls: String(Math.floor(Math.random() * 15) + 1),
      Total_intl_charge: (Math.random() * 5 + 0.5).toFixed(2),
      Customer_service_calls: String(Math.floor(Math.random() * 5) + 1),
    });

    turnstileRef.current?.reset();
    setTurnstileToken(null);
    setResult(null);
  };

  const triggerRequest = async () => {
    if (!turnstileToken) {
      alert(
        "Please wait until the Turnstile security check is completed before using the playground.",
      );
      return;
    }

    const numericFields = [
      "Accountlength",
      "Number_vmail_messages",
      "Total_day_minutes",
      "Total_day_calls",
      "Total_day_charge",
      "Total_eve_minutes",
      "Total_eve_calls",
      "Total_eve_charge",
      "Total_night_minutes",
      "Total_night_calls",
      "Total_night_charge",
      "Total_intl_minutes",
      "Total_intl_calls",
      "Total_intl_charge",
      "Customer_service_calls",
    ];

    for (const field of numericFields) {
      if (formData[field as keyof typeof formData] === "") {
        setResult(`Error: ${field} is required.`);
        return;
      }
      if (Number(formData[field as keyof typeof formData]) < 0) {
        setResult(`Error: ${field} cannot be negative.`);
        return;
      }
    }

    if (!formData.International_plan || !formData.Voice_mail_plan) {
      setResult(
        "Error: Please select options for International and Voice Mail plans.",
      );
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const API = "/api/predict";
      const response = await fetch(API, {
        method: "POST",
        headers: { TO: "churn" },
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
    <div className="w-full max-w-5xl mx-auto mt-8">
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
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
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
              Back to Services
            </Link>
          </div>
          <h3 className="font-mono text-lg font-bold tracking-widest text-zinc-300 uppercase">
            Mobile Churn Prediction
          </h3>
        </div>

        <div className="mb-6 flex justify-end">
          <button
            onClick={fillRandomData}
            disabled={loading}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              loading
                ? "cursor-not-allowed bg-zinc-800 text-zinc-600"
                : "border border-violet-600/50 bg-violet-600/10 text-violet-400 hover:bg-violet-600/20 hover:text-violet-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Fill Random Data
            </span>
          </button>
        </div>

        <div className="mb-6">
          <h4 className="mb-4 text-sm font-semibold text-violet-400 border-b border-zinc-800 pb-2">
            Account Information
          </h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label className={labelStyles}>Account Length</label>
              <input
                type="number"
                name="Accountlength"
                value={formData.Accountlength}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 117"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>International Plan</label>
              <select
                name="International_plan"
                value={formData.International_plan}
                onChange={handleChange}
                className={inputStyles}
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className={labelStyles}>Voice Mail Plan</label>
              <select
                name="Voice_mail_plan"
                value={formData.Voice_mail_plan}
                onChange={handleChange}
                className={inputStyles}
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className={labelStyles}>Voicemail Messages</label>
              <input
                type="number"
                name="Number_vmail_messages"
                value={formData.Number_vmail_messages}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 0"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Service Calls (1-10)</label>
              <input
                type="number"
                name="Customer_service_calls"
                value={formData.Customer_service_calls}
                onChange={handleChange}
                min="0"
                max="10"
                placeholder="e.g. 1"
                className={inputStyles}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="mb-4 text-sm font-semibold text-cyan-400 border-b border-zinc-800 pb-2">
            Day Usage
          </h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label className={labelStyles}>Day Minutes</label>
              <input
                type="number"
                name="Total_day_minutes"
                value={formData.Total_day_minutes}
                onChange={handleChange}
                min="0"
                step="0.1"
                placeholder="e.g. 184.5"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Day Calls</label>
              <input
                type="number"
                name="Total_day_calls"
                value={formData.Total_day_calls}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 97"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Day Charge ($)</label>
              <input
                type="number"
                name="Total_day_charge"
                value={formData.Total_day_charge}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g. 31.37"
                className={`${inputStyles} text-lg md:text-2xl font-semibold tracking-widest py-3`}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="mb-4 text-sm font-semibold text-emerald-400 border-b border-zinc-800 pb-2">
            Evening Usage
          </h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label className={labelStyles}>Evening Minutes</label>
              <input
                type="number"
                name="Total_eve_minutes"
                value={formData.Total_eve_minutes}
                onChange={handleChange}
                min="0"
                step="0.1"
                placeholder="e.g. 351.6"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Evening Calls</label>
              <input
                type="number"
                name="Total_eve_calls"
                value={formData.Total_eve_calls}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 80"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Evening Charge ($)</label>
              <input
                type="number"
                name="Total_eve_charge"
                value={formData.Total_eve_charge}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g. 29.89"
                className={inputStyles}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="mb-4 text-sm font-semibold text-amber-400 border-b border-zinc-800 pb-2">
            Night Usage
          </h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label className={labelStyles}>Night Minutes</label>
              <input
                type="number"
                name="Total_night_minutes"
                value={formData.Total_night_minutes}
                onChange={handleChange}
                min="0"
                step="0.1"
                placeholder="e.g. 215.8"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Night Calls</label>
              <input
                type="number"
                name="Total_night_calls"
                value={formData.Total_night_calls}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 90"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Night Charge ($)</label>
              <input
                type="number"
                name="Total_night_charge"
                value={formData.Total_night_charge}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g. 9.71"
                className={inputStyles}
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="mb-4 text-sm font-semibold text-rose-400 border-b border-zinc-800 pb-2">
            International Usage
          </h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label className={labelStyles}>Intl Minutes</label>
              <input
                type="number"
                name="Total_intl_minutes"
                value={formData.Total_intl_minutes}
                onChange={handleChange}
                min="0"
                step="0.1"
                placeholder="e.g. 8.7"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Intl Calls</label>
              <input
                type="number"
                name="Total_intl_calls"
                value={formData.Total_intl_calls}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 4"
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Intl Charge ($)</label>
              <input
                type="number"
                name="Total_intl_charge"
                value={formData.Total_intl_charge}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g. 2.35"
                className={inputStyles}
              />
            </div>
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
        <div className="mx-auto mt-6 w-full max-w-5xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
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
