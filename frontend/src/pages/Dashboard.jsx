import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const nav = useNavigate();

  // fetch latest records
  const fetchRecords = () => {
    axios.get("http://localhost:5000/api/records").then((res) => setRecords(res.data));
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // CREATE new record (version 1)
  const createRecord = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/records",
      { title, content },
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    );

    console.log("CREATED:", res.data);

    setTitle("");
    setContent("");
    fetchRecords();

  } catch (err) {
    console.log("ERROR:", err.response?.status, err.response?.data);
  }
};

  // UPDATE record → creates NEW VERSION
  const updateRecord = async (id) => {
    if (!title || !content) {
      alert("Enter new title/content to update");
      return;
    }

    await axios.put(`http://localhost:5000/api/records/${id}`, { title, content });

    setTitle("");
    setContent("");
    fetchRecords();
  };

  return (
    <>
      <h2>Create / Update Record</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={createRecord}>Create</button>

      <h2>Records</h2>

      {records.map((r) => (
        <div
          key={r._id}
          style={{
            border: "1px solid black",
            margin: 10,
            padding: 10
          }}
        >
          <p><b>{r.title}</b></p>
          <p>Version: {r.version}</p>

          <button onClick={() => updateRecord(r.recordId)}>
            Update (New Version)
          </button>

          <button onClick={() => nav(`/history/${r.recordId}`)}>
            View History
          </button>
        </div>
      ))}
    </>
  );
}