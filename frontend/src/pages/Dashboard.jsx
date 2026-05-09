import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [records, setRecords] = useState([]);
  const [history, setHistory] = useState({});

  const nav = useNavigate();

  const role = localStorage.getItem("role");

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

  // CREATE RECORD
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

  // UPDATE RECORD
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

  // VIEW HISTORY
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

  // DELETE RECORD
  const deleteRecord = async (id) => {

    try {

      const ok = confirm(
        "Delete this record?"
      );

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
    localStorage.removeItem("role");

    nav("/");

  };

  return (

    <div className="app">

      {/* TOPBAR */}
      <header className="topbar">

        <div className="topbar-left">

          <div className="logo sm">
            V
          </div>

          <span className="topbar-sep" />

          <span className="topbar-title">
            Version Manager
          </span>

          <span className="topbar-sub">
            My Workspace
          </span>

        </div>

        <button
          className="btn ghost"
          onClick={logout}
        >
          Logout
        </button>

      </header>

      {/* MAIN */}
      <div className="container">

        {/* CREATE */}
        {role === "EDITOR" && (

          <div className="card form">

            <h3 className="section-title">
              Create / Update Record
            </h3>

            <div className="row">

              <input
                className="input"
                placeholder="Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Content"
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
              />

              <button
                className="btn primary"
                onClick={createRecord}
              >
                Create
              </button>

            </div>

          </div>

        )}

        {/* RECORDS */}
        <div className="grid">

          {records.map((r) => (

            <div
              key={r._id}
              className="card record"
            >

              {/* HEADER */}
              <div className="record-head">

                <div>

                  <h3 className="record-name">
                    {r.title}
                  </h3>

                </div>

                <span className="badge version">

                  Version {r.version}

                </span>

              </div>

              {/* CONTENT */}
              <p className="content">

                {r.content}

              </p>

              {/* ACTIONS */}
              <div className="actions">

                {role === "EDITOR" && (
                  <>
                    <button
                      className="btn"
                      onClick={() =>
                        updateRecord(r._id)
                      }
                    >
                      Update
                    </button>

                    <button
                      className="btn danger"
                      onClick={() =>
                        deleteRecord(r._id)
                      }
                    >
                      Delete
                    </button>
                  </>
                )}

                <button
                  className="btn"
                  onClick={() =>
                    viewHistory(r._id)
                  }
                >
                  History
                </button>

              </div>

              {/* HISTORY */}
              {history[r._id] && (

                <div className="history">

                  <h4 className="history-title">

                    Version History

                  </h4>

                  {history[r._id].map((v) => (

                    <div
                      key={v._id}
                      className="history-item"
                    >

                      <strong className="history-version">

                        v{v.versionNumber}

                      </strong>

                      <p>
                        {v.content}
                      </p>

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