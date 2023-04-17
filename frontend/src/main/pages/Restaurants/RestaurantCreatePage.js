import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RestaurantForm from "main/components/Restaurants/RestaurantForm";
import { _Navigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { _restaurantUtils } from "main/utils/restaurantUtils";

export default function RestaurantCreatePage() {

  const onSubmit = async (restaurant) => {
    console.log(`onSubmit: ${JSON.stringify(restaurant)}`);
    toast(`New restaurant Created - id: ${restaurant.id} name: ${restaurant.name}`);
  }

  // return <Navigate to="/personalschedules/list" />
  // toast(`Error: ${error.response.data.message}`);

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Restaurant</h1>
        <RestaurantForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  )
}
