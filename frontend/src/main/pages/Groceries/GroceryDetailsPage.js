import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import GroceryTable from "main/components/Groceries/GroceryTable";
import { groceryUtils } from "main/utils/groceryUtils";

export default function GroceryDetailsPage() {
  let { id } = useParams();

  const response = groceryUtils.getById(id);

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Grocery Details</h1>
        <GroceryTable groceries={[response.grocery]} showButtons={false} />
      </div>
    </BasicLayout>
  )
}
