import HomePage from "./components/home-page";
import Navbar from "./components/navbar";
import { useState, createContext, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import SeenitPage from "./components/seenit-page";
import Submit from "./components/new-post";
export const UserContext = createContext(null);
function App() {
  //App -> Navbar -> Login/Signup -> setUser on account creation or login
  const [user, setUser] = useState<any | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [user]);
  return (
    <UserContext.Provider value={user}>
      <div className="h-full w-full">
        <div className="flex flex-col">
          <Navbar setUser={setUser} />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="r/:name/*" element={<SeenitPage />} />
            <Route path="r/:name/submit" element={<Submit />} />
            <Route path="submit" element={<Submit />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
