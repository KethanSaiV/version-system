import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function History() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`/records/${id}/history`)
      .then((res) => setHistory(res.data));
  }, [id]);

  return (
    <>
      <h2>Version History</h2>

      {history.map((r) => (
        <div key={r._id} style={{ border: "1px solid black", margin: 10 }}>
          <p>Title: {r.title}</p>
          <p>Content: {r.content}</p>
          <p>Version: {r.version}</p>
        </div>
      ))}
    </>
  );
}