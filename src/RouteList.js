import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Components/HomeScreen";
import CallScreen from "./Components/CallScreen";
import { PeerProvider } from "./PeerContext";

export default function RouteList() {
  return (
    <PeerProvider>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/call/:username/:peerId" element={<CallScreen />} />
      </Routes>
    </PeerProvider>
  );
}