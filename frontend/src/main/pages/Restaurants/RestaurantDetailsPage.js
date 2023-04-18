import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import RestaurantTable from 'main/components/Restaurants/RestaurantTable';
import { restaurantUtils } from 'main/utils/restaurantUtils';

export default function RestaurantDetailsPage() {
  let { id } = useParams();
  console.log("id=", id);

  const response = restaurantUtils.getById(id);
  console.log("response=", response);

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Restaurant Details</h1>
        {
          // (response?.error) ?
          //     <p>
          //         {response.error}
          //     </p>
          //     :
          <RestaurantTable restaurants={[response.restaurant]} showButtons={false} />
        }
      </div>
    </BasicLayout>
  )
}
