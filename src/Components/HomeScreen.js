import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Peer from "peerjs";
import { PeerContext } from "../PeerContext";

export default function HomeScreen() {
  const [username, setUsername] = useState("");
  const [peerId, setPeerId] = useState("");
  const { setPeer } = useContext(PeerContext);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      console.log("Generated Id: " + id);
      setPeer(peer);
      setPeerId(id);
    });
  }, [setPeer]);

  return (
    <>
      <form>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          title="username"
          onChange={(e) => setUsername(e.target.value)}
        />
    
        <Link to={`/call/${username}/${peerId}`}>
          <input type="button" value="Join Room" />
        </Link>
      </form>
      <h1>Hello world!</h1>
    </>
  );
}
