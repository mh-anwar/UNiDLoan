'use client';
import "@/app/globals.css";
import { Navigation } from "./components/Navigation";
import React from "react";
import { AnimatePresence } from "framer-motion";
import ContractOverlay from "./components/contract";
import { useState } from "react";
import CreateContractOverlay from "./components/createContract";
import Login from "./components/Login";

// context
export const UserContext = React.createContext(null);

// Layout Component
export default function RootLayout({ children })
{
  const [displayCreateContract, setDisplayCreateContract ] = useState(false);
  const [displayContract, setDisplayContract] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ displayContract: displayContract, setDisplayContract: setDisplayContract, username: username, setUsername: setUsername, displayLogin: displayLogin, setDisplayLogin: setDisplayLogin }}>
      <html lang="en" className="dark">
        <body className="flex flex-col">
          <div className="w-full h-screen">
            <Navigation />
            <br/>
            {children}
            <AnimatePresence
              initial={false}
              mode="wait"
              onExitComplete={() => null}
            >
              {displayCreateContract && <CreateContractOverlay />}
              {displayContract && <ContractOverlay/>}
              {displayLogin && <Login/>}
            </AnimatePresence>
          </div>

        </body>
      </html>
    </UserContext.Provider>
  );
}
