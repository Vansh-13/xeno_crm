import React, { useEffect, useState } from "react";
import api from "../../api.js";

const CampaignH = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/campaigns");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch campaigns:", err);
      }
    };
    fetchData();
  }, []);

  const renderSegmentRule = (rule) => {
    if (!rule) return "-";

    if (Array.isArray(rule)) {
      return rule.length > 0
        ? rule.map((r, i) => (
            <div key={i}>
              {r.field} {r.operator} {r.value} <strong>{r.logic}</strong>
            </div>
          ))
        : "-";
    }

    if (rule.rules?.length) {
      return (
        <>
          <div>
            <strong>Logic:</strong> {rule.logic}
          </div>
          {rule.rules.map((r, i) => (
            <div key={i}>
              {r.field} {r.operator} {r.value}
            </div>
          ))}
        </>
      );
    }

    return "-";
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>📊 Campaign History</h2>

      <div style={styles.responsiveTable}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>📌 Title</th>
              <th style={styles.th}>💬 Message</th>
              <th style={styles.th}>📋 Segment Rule</th>
              <th style={styles.th}>🕒 Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((c, i) => (
                <tr
                  key={c._id}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#f8f9fb" : "#ffffff",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#eaf4ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      i % 2 === 0 ? "#f8f9fb" : "#ffffff")
                  }
                >
                  <td style={styles.td}>{c.title}</td>
                  <td style={styles.td}>{c.message}</td>
                  <td style={styles.td}>{renderSegmentRule(c.segmentrule)}</td>
                  <td style={styles.td}>
                    {new Date(c.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.noData}>
                  No campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const styles = {
  wrapper: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "20px",
    textAlign: "center",
    color: "#2c3e50",
  },
  responsiveTable: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px",
  },
  th: {
    padding: "12px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "left",
    fontSize: "15px",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #ddd",
    color: "#333",
    fontSize: "14px",
    verticalAlign: "top",
    wordWrap: "break-word",
  },
  noData: {
    padding: "20px",
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    fontSize: "16px",
  },
};

export default CampaignH;
