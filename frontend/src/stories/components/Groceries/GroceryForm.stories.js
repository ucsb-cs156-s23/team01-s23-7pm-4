import React from 'react';
import GroceryForm from "main/components/Groceries/GroceryForm"
import { groceryFixtures } from 'fixtures/groceryFixtures';

export default {
    title: 'components/Groceries/GroceryForm',
    component: GroceryForm
};

const Template = (args) => {
    return (
        <GroceryForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    Grocery: groceryFixtures.oneGrocery,
    submitText: "",
    submitAction: () => { }
};