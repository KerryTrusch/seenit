import HomePage from "./components/home-page";
import Navbar from "./components/navbar";
function App() {
    return (
        <div className="h-full w-full">
            <div className="flex flex-col">
                <Navbar />
                <HomePage />
            </div>
        </div>
    )
}

export default App;