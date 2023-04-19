import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useNavigate } from "react-router-dom";


const showCell = (cell) => JSON.stringify(cell.row.values);

export default function RestaurantTable({ restaurants, showButtons=true }) {
    const navigate = useNavigate();

    const testIdPrefix = "RestaurantTable";


    const editCallback = (cell) => {
        console.log(`editCallback: ${showCell(cell)})`);
        navigate(`/restaurant/edit/${cell.row.values.id}`)
    }

    const detailsCallback = (cell) => {
        console.log(`detailsCallback: ${showCell(cell)})`);
        navigate(`/restaurant/details/${cell.row.values.id}`)
    }

    const deleteCallback = async (cell) => { 
        console.log(`deleteCallback: ${showCell(cell)})`);
    }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Description',
            accessor: 'description',
        }
    ];

    const buttonColumns = [
        ...columns,
        ButtonColumn("Details", "primary", detailsCallback, testIdPrefix),
        ButtonColumn("Edit", "primary", editCallback, testIdPrefix),
        ButtonColumn("Delete", "danger", deleteCallback, testIdPrefix),
    ]

    const columnsToDisplay = showButtons ? buttonColumns : columns;

    return <OurTable
        data={restaurants}
        columns={columnsToDisplay}
        testid={testIdPrefix}
    />;
};

export { showCell };