import { Route, Routes } from "react-router";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Components/Home.jsx";
import EntryList from "./Components/EntryList.jsx";
import CreateEntry from "./Components/CreateEntry.jsx";



function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/entries" element={<EntryList />}></Route>
        <Route path="/create" element={<CreateEntry />}></Route>
      </Routes>
    </>
  )
}

export default App
