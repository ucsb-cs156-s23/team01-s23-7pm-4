
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { restaurantUtils }  from 'main/utils/restaurantUtils';
import RestaurantForm from 'main/components/Restaurants/RestaurantForm';
import { useNavigate } from 'react-router-dom'


export default function RestaurantEditPage() {
    let { id } = useParams();
    console.log("id=", id);

    let navigate = useNavigate(); 

    const response = restaurantUtils.getById(id);
    console.log("response=", response);

    const onSubmit = async (restaurant) => {
        console.log(`RestaurantEditPage, onSubmit: ${JSON.stringify(restaurant)}`);
        const result = restaurantUtils.update(restaurant);
        console.log(`RestaurantEditPage result: ${JSON.stringify(result)}`);
        navigate("/restaurants");
    }  

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Edit Restaurant</h1>
                {
                    // (response?.error) ?
                    //     <p>
                    //         {response.error}
                    //     </p>
                    //     :

                    <RestaurantForm submitAction={onSubmit} initialContents={response.restaurant}/>

                }
            </div>
        </BasicLayout>
    )
}