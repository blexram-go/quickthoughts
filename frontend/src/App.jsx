import { Route, Routes } from "react-router";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Components/Home.jsx";
import ThoughtsList from "./Components/ThoughtsList.jsx";
import CreateEntry from "./Components/CreateEntry.jsx";

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/thoughts" element={<ThoughtsList />}></Route>
        <Route path="/create" element={<CreateEntry />}></Route>
      </Routes>
    </>
  )
}

export default App
