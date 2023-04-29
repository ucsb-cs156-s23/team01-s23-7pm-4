import React from 'react'
import Button from 'react-bootstrap/Button';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import GroceryTable from 'main/components/Groceries/GroceryTable';
import { groceryUtils } from 'main/utils/groceryUtils';
import { useNavigate, Link } from 'react-router-dom';

export default function GroceryIndexPage() {

    const navigate = useNavigate();

    const groceryCollection = groceryUtils.get();
    const groceries = groceryCollection.groceries;

    const showCell = (cell) => JSON.stringify(cell.row.values);

    const deleteCallback = async (cell) => {
        console.log(`GroceryIndexPage deleteCallback: ${showCell(cell)})`);
        groceryUtils.del(cell.row.values.id);
        navigate("/groceries");
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                <Button style={{ float: "right" }} as={Link} to="/groceries/create">
                    Create Grocery
                </Button>
                <h1>Groceries</h1>
                <GroceryTable groceries={groceries} deleteCallback={deleteCallback} />
            </div>
        </BasicLayout>
    )
}