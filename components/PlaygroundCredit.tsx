"use client";

import { debug, log } from "console";
import { useState } from "react";
export default function PlaygroundCredit() {

  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const [formData, setFormData] = useState({
    "Age": 0,
    "Sex": "",
    "Job": 0,
    "Housing": "",
    "Saving accounts": "NA",
    "Checking account": "NA",
    "Credit amount": 0,
    "Duration": 0,
    "Purpose": ""
  });


  const triggerRequest = async () => {
    if (formData.Duration <= 0) {
      setResult("Error: Duration must be greater than 0.");
      return; 
    } 
    if (formData.Age < 18) {
      setResult("Error: Requester need to be at least 18 years old.");
      return; 
    }
    if (formData["Credit amount"] <= 0) {
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
        body: JSON.stringify(formData),

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
    }
  };

  return (
    <div style={{ border: '2px dashed blue', padding: '1.5rem', marginTop: '2rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        padding: '1.5rem',
        border: '2px dashed blue',
        marginTop: '2rem',
        color: 'black'
      }}>

        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Age (18-100)</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            min="18"
            max="100"
            style={{ padding: '0.5rem', border: '1px solid gray', borderRadius: '4px' }}
          />
        </div>

        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Sex</label>
          <select name="Sex" value={formData.Sex} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid gray', borderRadius: '4px' }}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Job Category (0-3)</label>
          <input
            type="number"
            name="Job"
            value={formData.Job}
            onChange={handleChange}
            min="0"
            max="3"
            style={{ padding: '0.5rem', border: '1px solid gray', borderRadius: '4px' }}
          />
        </div>

        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Housing</label>
          <select name="Housing" value={formData.Housing} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid gray', borderRadius: '4px' }}>
            <option value="">Select...</option>
            <option value="own">Own</option>
            <option value="rent">Rent</option>
            <option value="free">Free</option>
          </select>
        </div>

        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Saving Accounts</label>
          <select name="Saving accounts" value={formData["Saving accounts"]} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid gray', borderRadius: '4px' }}>
            <option value="NA">NA</option>
            <option value="little">Little</option>
            <option value="moderate">Moderate</option>
            <option value="rich">Rich</option>
            <option value="quite rich">Quite Rich</option>
          </select>
        </div>

        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Checking Account</label>
          <select name="Checking account" value={formData["Checking account"]} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid gray', borderRadius: '4px' }}>
            <option value="NA">NA</option>
            <option value="little">Little</option>
            <option value="moderate">Moderate</option>
            <option value="rich">Rich</option>
            <option value="quite rich">Quite Rich</option>
          </select>
        </div>

       
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Credit Amount ($)</label>
          <input
            type="number"
            name="Credit amount"
            value={formData["Credit amount"]}
            onChange={handleChange}
            min="100"
            style={{ padding: '0.5rem', border: '1px solid gray', borderRadius: '4px' }}
          />
        </div>

        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Duration (Months)</label>
          <input
            type="number"
            name="Duration"
            value={formData.Duration}
            onChange={handleChange}
            min="1"
            max="72"
            style={{ padding: '0.5rem', border: '1px solid gray', borderRadius: '4px' }}
          />
        </div>

        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Purpose</label>
          <select name="Purpose" value={formData.Purpose} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid gray', borderRadius: '4px' }}>
            <option value="">Select...</option>
            <option value="business">Business</option>
            <option value="car">Car</option>
            <option value="domestic appliances">Domestic Appliances</option>
            <option value="education">Education</option>
            <option value="forniture/equipment">Furniture/Equipment</option>
            <option value="radio/TV">Radio/TV</option>
            <option value="repairs">Repairs</option>
            <option value="vacation/others">Vacation/Others</option>
          </select>
        </div>
      </div>

      <h3>Playground: Credit Scoring</h3>

      <button
        onClick={triggerRequest}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: loading ? 'gray' : 'black',
          color: 'white',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        {loading ? 'Thinking...' : 'Launch model prediction'}
      </button>


      {result && (
        <pre style={{ backgroundColor: '#f4f4f4', padding: '1rem', marginTop: '1rem', color: 'black' }}>
          {result}
        </pre>
      )}
    </div>
  );
}