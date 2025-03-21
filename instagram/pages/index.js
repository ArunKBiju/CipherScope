import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    if (!username) return;
    setLoading(true);

    const response = await fetch(`/api/fetchProfile?username=${username}`);
    const result = await response.json();

    setData(result);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Instagram Profile Viewer</h1>
      <input
        type="text"
        placeholder="Enter Instagram username or link"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchProfile} disabled={loading}>
        {loading ? "Fetching..." : "Get Profile"}
      </button>

      {data && (
        <div className="profile">
          <img src={data.profilePic} alt="Profile Pic" />
          <h2>{data.fullName} (@{data.username})</h2>
          <p>{data.bio}</p>
          {data.email && <p>Email: {data.email}</p>}
          {data.phone && <p>Phone: {data.phone}</p>}
          <a href={data.profilePic} download>
            <button>Download Profile Picture</button>
          </a>
        </div>
      )}
    </div>
  );
}
