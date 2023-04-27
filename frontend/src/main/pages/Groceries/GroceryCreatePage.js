import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import GroceryForm from "main/components/Groceries/GroceryForm";
import { useNavigate } from 'react-router-dom'
import { groceryUtils } from 'main/utils/groceryUtils';

export default function GroceryCreatePage() {

  let navigate = useNavigate(); 

  const onSubmit = async (grocery) => {
    const createdGrocery = groceryUtils.add(grocery);
    console.log("createdGrocery: " + JSON.stringify(createdGrocery));
    navigate("/groceries");
  }  

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Grocery</h1>
        <GroceryForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  )
}
