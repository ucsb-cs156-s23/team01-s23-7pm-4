import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import AvilaBeachPage from "main/pages/Towns/AvilaBeachPage";
import LosAlamosPage from "main/pages/Towns/LosAlamosPage";
import ArroyoGrandePage from "main/pages/Towns/ArroyoGrandePage";

import "bootstrap/dist/css/bootstrap.css";
import RestaurantCreatePage from "main/pages/Restaurants/RestaurantCreatePage";
import RestaurantEditPage from "main/pages/Restaurants/RestaurantEditPage";
import RestaurantIndexPage from "main/pages/Restaurants/RestaurantIndexPage";
import RestaurantDetailsPage from "main/pages/Restaurants/RestaurantDetailsPage";

import GroceryCreatePage from "main/pages/Groceries/GroceryCreatePage";
import GroceryEditPage from "main/pages/Groceries/GroceryEditPage";
import GroceryIndexPage from "main/pages/Groceries/GroceryIndexPage";
import GroceryDetailsPage from "main/pages/Groceries/GroceryDetailsPage";

import HotelCreatePage from "main/pages/Hotels/HotelCreatePage";
import HotelEditPage from "main/pages/Hotels/HotelEditPage";
import HotelIndexPage from "main/pages/Hotels/HotelIndexPage";
import HotelDetailsPage from "main/pages/Hotels/HotelDetailsPage";


function App() {

  const reload = () => window.location.reload();

  return (
    <BrowserRouter basename="/team01-s23-7pm-4">
      <Routes>
        <Route path="/storybook-static" onEnter={reload}/>
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/towns/AvilaBeach" element={<AvilaBeachPage />} />
        <Route exact path="/towns/LosAlamos" element={<LosAlamosPage />} />
        <Route exact path="/towns/ArroyoGrande" element={<ArroyoGrandePage />} />
        
        <Route exact path="/restaurants/create" element={<RestaurantCreatePage />} />
        <Route exact path="/restaurants/edit/:id" element={<RestaurantEditPage />} />
        <Route exact path="/restaurants/details/:id" element={<RestaurantDetailsPage />} />
        <Route exact path="/restaurants/" element={<RestaurantIndexPage />} />

        <Route exact path="/groceries/create" element={<GroceryCreatePage />} />
        <Route exact path="/groceries/edit/:id" element={<GroceryEditPage />} />
        <Route exact path="/groceries/details/:id" element={<GroceryDetailsPage />} />
        <Route exact path="/groceries/" element={<GroceryIndexPage />} />

        <Route exact path="/hotels/create" element={<HotelCreatePage />} />
        <Route exact path="/hotels/edit/:id" element={<HotelEditPage />} />
        <Route exact path="/hotels/details/:id" element={<HotelDetailsPage />} />
        <Route exact path="/hotels/" element={<HotelIndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
