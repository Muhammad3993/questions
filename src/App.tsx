// Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// pages
import InputPage from "./pages/InputPage";
import Home from "./pages/Home";
import DetailLayout from "./layouts/DetailLayout";
import OneLvl from "./pages/test_lvl/OneLvl";
import TwoLvl from "./pages/test_lvl/TwoLvl";
import FlashCard from "./pages/test_lvl/FlashCard";
import Language from "./pages/Language";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Home />} />
        <Route path='/language' element={<Language />} />
        <Route path='/create-quiz' element={<InputPage />} />
        <Route path="/details/:id" element={<DetailLayout />}>
          <Route index element={<FlashCard />} />
          <Route path='one-lvl' element={<OneLvl />} />
          <Route path='two-lvl' element={<TwoLvl />} />
        </Route>
      </Route>,
    ),
  );
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
