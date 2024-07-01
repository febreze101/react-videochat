import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { PeerContext } from "../PeerContext";
import { connect, io } from "socket.io-client";

export default function CallScreen() {
  const { username, peerId } = useParams();
  const { peer } = useContext(PeerContext);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // init socket.io connection
    const newSocket = io("https://localhost:9000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!peer) {
      return;
    }

    // get local media stream
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        peer.on("call", (call) => {
          console.log("Receiving a call");
          call.answer(stream);

          call.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        });

        if (socket) {
          socket.emit("join-room", peerId, username);

          socket.on("user-connected", (userId) => {
            connectToNewUser(userId, stream);
          });

          socket.on("user-disconnected", (userId) => {
            console.log(`${userId} disconnected`);
          });
        }
      });

    return () => {
      if (peer) {
        peer.disconnect();
      }
    };
  }, [peer, socket]);

  // const [remotePeerIdValue, setRemotePeerIdValue] = useState('')

  // console.log(`Username: ${username}, Peer ID: ${peerId}`);
  // console.log("Peer connection:", peer);

  const connectToNewUser = (userId, stream) => {
    const call = peerInstance.call(userId, stream);
    call.on("stream", (userVideoStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = userVideoStream;
      }
    });
  };

  return (
    <>
      <div>
        <label>{"Username: " + username}</label>
        <label>{"Room Id: " + peerId}</label>
        <video
          height={500}
          width={500}
          autoPlay
          muted
          playsInline
          ref={localVideoRef}
        />
        <video
          height={500}
          width={500}
          autoPlay
          muted
          playsInline
          ref={remoteVideoRef}
        />
      </div>
    </>
  );
}
