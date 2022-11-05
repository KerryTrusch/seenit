import HomePage from "./components/home-page";
import Navbar from "./components/navbar";
import { useState, createContext, useEffect } from "react";

export const UserContext = createContext(null);
function App() {
    //App -> Navbar -> Login/Signup -> setUser on account creation or login
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <UserContext.Provider value={user}>
      <div className="h-full w-full">
        <div className="flex flex-col">
          <Navbar setUser={setUser} />
          <HomePage />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
