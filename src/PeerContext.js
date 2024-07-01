// PeerContext.js
import React, { createContext, useState } from 'react';

export const PeerContext = createContext();

export const PeerProvider = ({ children }) => {
  const [peer, setPeer] = useState(null);

  return (
    <PeerContext.Provider value={{ peer, setPeer }}>
      {children}
    </PeerContext.Provider>
  );
};
