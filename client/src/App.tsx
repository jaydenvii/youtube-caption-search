import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import VideosPage from "./pages/VideosPage";
import NotFoundPage from "./pages/NotFoundPage";
import YouTubeVideoList from "./components/getContent";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
      
    )
  );

  return <> <div className="grid grid-cols-4"> <YouTubeVideoList/> </div> <RouterProvider router={router} /> 
  </>;
}

export default App;
