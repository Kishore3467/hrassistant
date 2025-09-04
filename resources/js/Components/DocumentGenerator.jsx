import React, { useState } from "react";
import axios from "axios";

export default function DocumentGenerator() {
    const [form, setForm] = useState({
        type: "Offer Letter",
        recipient_name: "",
        position: "",
        company_name: ""
    });
    const [generated, setGenerated] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const generateDocument = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/generate-document", form);
            setGenerated(res.data.content);
        } catch (err) {
            setGenerated("Error generating document");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Document Generator</h2>
            <select name="type" value={form.type} onChange={handleChange}>
                <option>Offer Letter</option>
                <option>NDA</option>
            </select>
            <input name="recipient_name" placeholder="Recipient Name" onChange={handleChange} />
            <input name="position" placeholder="Position" onChange={handleChange} />
            <input name="company_name" placeholder="Company Name" onChange={handleChange} />
            <button onClick={generateDocument}>Generate</button>
            <pre>{generated}</pre>
        </div>
    );
}
