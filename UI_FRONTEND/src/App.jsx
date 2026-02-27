import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import ShowTimes from "./pages/ShowTimes";
import SeatSelection from "./pages/SeatSelection"; // 👈 ADD THIS

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/shows/:movieId" element={<ShowTimes />} />

        {/* ✅ ADD THIS ROUTE */}
        <Route path="/seats/:showId" element={<SeatSelection />} />
      </Routes>
    </Layout>
  );
}

export default App;