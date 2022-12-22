import HomePage from "./Project/home-page";
import Navbar from "./Project/navbar";
import { useState, createContext, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import SeenitPage from "./Project/seenit-page";
import Submit from "./Project/CreatePost/new-post";
import ProfilePage from "./Project/Profile";
import ProtectedRoute from "./Auth/ProtectedRoute";
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
            <ProtectedRoute user={user}>
              <Route path="profile" element={<ProfilePage />} />
            </ProtectedRoute>
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
