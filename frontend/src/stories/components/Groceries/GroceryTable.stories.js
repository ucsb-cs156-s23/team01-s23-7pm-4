import React from 'react';
import GroceryTable from 'main/components/Groceries/GroceryTable';
import { groceryFixtures } from 'fixtures/groceryFixtures';

export default {
    title: 'components/Groceries/GroceryTable',
    component: GroceryTable
};

const Template = (args) => {
    return (
        <GroceryTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    groceries: []
};

export const ThreeSubjectsNoButtons = Template.bind({});

ThreeSubjectsNoButtons.args = {
    groceries: restaurantFixtures.threeGroceries,
    showButtons: false
};

export const ThreeSubjectsWithButtons = Template.bind({});
ThreeSubjectsWithButtons.args = {
    groceries: restaurantFixtures.threeGroceries,
    showButtons: true
};
