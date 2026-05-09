import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [records, setRecords] = useState([]);
  const [history, setHistory] = useState({});

  const nav = useNavigate();

  // FETCH RECORDS
  const fetchRecords = async () => {
    try {

      const res = await axios.get(
        "https://version-system.onrender.com/api/records"
      );

      setRecords(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // CREATE
  const createRecord = async () => {
    try {

      if (!title || !content) {
        return alert("Fill all fields");
      }

      await axios.post(
        "https://version-system.onrender.com/api/records/create",
        {
          title,
          content,
        }
      );

      setTitle("");
      setContent("");

      fetchRecords();

    } catch (err) {
      console.log(err);
      alert("Create failed");
    }
  };

  // UPDATE
  const updateRecord = async (id) => {
    try {

      if (!content) {
        return alert("Enter new content");
      }

      await axios.put(
        `https://version-system.onrender.com/api/records/update/${id}`,
        {
          content,
        }
      );

      setContent("");

      fetchRecords();

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // HISTORY
  const viewHistory = async (id) => {
    try {

      const res = await axios.get(
        `https://version-system.onrender.com/api/records/history/${id}`
      );

      setHistory({
        ...history,
        [id]: res.data,
      });

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteRecord = async (id) => {
    try {

      const ok = confirm("Delete this record?");

      if (!ok) return;

      await axios.delete(
        `https://version-system.onrender.com/api/records/delete/${id}`
      );

      fetchRecords();

    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div className="app">

      {/* TOPBAR */}
      <header className="topbar">

        <div className="brand-inline">
          <div className="logo sm">V</div>
          <span>Version Manager</span>
        </div>

        <button className="btn ghost" onClick={logout}>
          Logout
        </button>

      </header>

      {/* MAIN */}
      <div className="container">

        {/* CREATE */}
        <div className="card form">

          <h3>Create / Update Record</h3>

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

            <button
              className="btn primary"
              onClick={createRecord}
            >
              Create
            </button>

          </div>
        </div>

        {/* RECORDS */}
        <div className="grid">

          {records.map((r) => (

            <div key={r._id} className="card record">

              <div className="record-head">

                <h3>{r.title}</h3>

                <span className="badge">
                  Version {r.version}
                </span>

              </div>

              <p className="content">
                {r.content}
              </p>

              {/* ACTIONS */}
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

              {/* HISTORY */}
              {history[r._id] && (

                <div className="history">

                  <h4>Version History</h4>

                  {history[r._id].map((v) => (

                    <div
                      key={v._id}
                      className="history-item"
                    >

                      <strong>
                        Version {v.versionNumber}
                      </strong>

                      <p>{v.content}</p>

                      <hr />

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