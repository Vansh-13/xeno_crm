import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RuleBuilder from "./RuleBuilder";

const CampaignF = ({ user }) => {
  const nav = useNavigate();
  const [custs, setCusts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    msg: "",
    segment: {},
    custId: "",
  });

  useEffect(() => {
    async function loadCusts() {
      try {
        const res = await api.get("/api/customers");
        setCusts(res.data);
      } catch (e) {
        toast.error("Could not load customers");
      }
    }
    loadCusts();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onRuleChange = (logic, rules) => {
    setForm((f) => ({ ...f, segment: { logic, rules } }));
  };

  const onCustChange = (e) => {
    setForm((f) => ({ ...f, custId: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.title.trim() ||
      !form.msg.trim() ||
      !form.segment.rules?.length ||
      !form.custId
    ) {
      toast.warn("Fill all fields and select customer");
      return;
    }

    try {
      await api.post("/api/campaigns", {
        title: form.title,
        message: form.msg,
        segmentrule: form.segment,
        customerId: form.custId,
      });
      toast.success("Campaign created!");
      setTimeout(() => {
        nav(user?._id ? "/dashboard" : "/");
      }, 1500);
    } catch (err) {
      toast.error("Failed to create campaign");
    }
  };

  return (
    <div
      style={{
        maxWidth: "520px",
        width: "90%",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #dce3ea",
        borderRadius: "12px",
        backgroundColor: "#f9fbfd",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#34495e",
          marginBottom: "20px",
          fontSize: "1.5rem",
        }}
      >
        📢 New Campaign
      </h2>

      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <label style={{ fontSize: 15 }}>⚙️ Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Campaign Title"
          onChange={onChange}
          style={{
            padding: "10px",
            fontSize: "15px",
            width: "100%",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <label style={{ fontSize: 15 }}>✉️ Message</label>
        <textarea
          name="msg"
          value={form.msg}
          placeholder="Write your message..."
          onChange={onChange}
          style={{
            minHeight: "90px",
            padding: "10px",
            fontSize: "15px",
            width: "100%",
            borderRadius: 6,
            border: "1px solid #ccc",
            resize: "vertical",
          }}
        />

        <label style={{ fontSize: 15 }}>👥 Select Customer</label>
        <select
          value={form.custId}
          onChange={onCustChange}
          style={{
            padding: "10px",
            fontSize: "15px",
            width: "100%",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        >
          <option value="">-- Select Customer --</option>
          {custs.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <RuleBuilder onChange={onRuleChange} />

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#2ecc71",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
          }}
        >
          🚀 Submit
        </button>
      </form>
    </div>
  );
};

export default CampaignF;
