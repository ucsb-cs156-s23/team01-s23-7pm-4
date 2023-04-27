
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { groceryUtils }  from 'main/utils/groceryUtils';
import GroceryForm from 'main/components/Groceries/GroceryForm';
import { useNavigate } from 'react-router-dom'


export default function GroceryEditPage() {
    let { id } = useParams();

    let navigate = useNavigate(); 

    const response = groceryUtils.getById(id);

    const onSubmit = async (grocery) => {
        const updatedGrocery = groceryUtils.update(grocery);
        console.log("updatedGrocery: " + JSON.stringify(updatedGrocery));
        navigate("/groceries");
    }  

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Edit Grocery</h1>
                <GroceryForm submitAction={onSubmit} buttonLabel={"Update"} initialContents={response.grocery}/>
            </div>
        </BasicLayout>
    )
}