import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Collection from "./Collection";
import CardsList from "./Cards_list";
import Information from "./Information";
import Account from "./Account";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Collection />} />
          <Route path="collection" element={<Collection />} />
          <Route path="cards_list" element={<CardsList />} />
          <Route path="information" element={<Information />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
