import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [records, setRecords] = useState([]);
  const [history, setHistory] = useState({});
  const nav = useNavigate();

  const fetchRecords = async () => {
    const res = await axios.get("http://localhost:5000/api/records");
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const createRecord = async () => {
    if (!title || !content) return alert("Fill all fields");
    await axios.post("http://localhost:5000/api/records/create", {
      title,
      content,
    });
    setTitle("");
    setContent("");
    fetchRecords();
  };

  const updateRecord = async (id) => {
    if (!content) return alert("Enter new content");
    await axios.put(
      `http://localhost:5000/api/records/update/${id}`,
      { content }
    );
    setContent("");
    fetchRecords();
  };

  const viewHistory = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/api/records/history/${id}`
    );
    setHistory({ ...history, [id]: res.data });
  };

  const deleteRecord = async (id) => {
    if (!confirm("Delete this record?")) return;
    await axios.delete(
      `http://localhost:5000/api/records/delete/${id}`
    );
    setHistory((p) => {
      const c = { ...p };
      delete c[id];
      return c;
    });
    fetchRecords();
  };

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand-inline">
          <div className="logo sm">V</div>
          <span>Version Manager</span>
        </div>
        <button className="btn ghost" onClick={logout}>
          Logout
        </button>
      </header>

      <div className="container">
        <div className="card form">
          <h3>Create / Update</h3>
          <div className="row">
            <input
              className="input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="input"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="btn primary" onClick={createRecord}>
              Create
            </button>
          </div>
        </div>

        <div className="grid">
          {records.map((r) => (
            <div key={r._id} className="card record">
              <div className="record-head">
                <h4>{r.title}</h4>
                <span className="badge">v{r.version}</span>
              </div>

              <p className="content">{r.content}</p>

              <div className="actions">
                <button
                  className="btn"
                  onClick={() => updateRecord(r._id)}
                >
                  Update
                </button>
                <button
                  className="btn"
                  onClick={() => viewHistory(r._id)}
                >
                  History
                </button>
                <button
                  className="btn danger"
                  onClick={() => deleteRecord(r._id)}
                >
                  Delete
                </button>
              </div>

              {history[r._id] && (
                <div className="history">
                  {history[r._id].map((v) => (
                    <div key={v._id} className="history-item">
                      <span>v{v.versionNumber}</span>
                      <p>{v.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}