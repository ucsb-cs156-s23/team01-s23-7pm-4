// get groceries from local storage
const get = () => {
    const groceryValue = localStorage.getItem("groceries");
    if (groceryValue === undefined) {
        const groceryCollection = { nextId: 1, groceries: [] }
        return set(groceryCollection);
    }
    const groceryCollection = JSON.parse(groceryValue);
    if (groceryCollection === null) {
        const groceryCollection = { nextId: 1, groceries: [] }
        return set(groceryCollection);
    }
    return groceryCollection;
};

const getById = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const groceryCollection = get();
    const groceries = groceryCollection.groceries;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = groceries.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `grocery with id ${id} not found` };
    }
    return { grocery: groceries[index] };
}

// set groceries in local storage
const set = (groceryCollection) => {
    localStorage.setItem("groceries", JSON.stringify(groceryCollection));
    return groceryCollection;
};

// add a grocery to local storage
const add = (grocery) => {
    const groceryCollection = get();
    grocery = { ...grocery, id: groceryCollection.nextId };
    groceryCollection.nextId++;
    groceryCollection.groceries.push(grocery);
    set(groceryCollection);
    return grocery;
};

// update a grocery in local storage
const update = (grocery) => {
    const groceryCollection = get();

    const groceries = groceryCollection.groceries;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = groceries.findIndex((r) => r.id == grocery.id);
    if (index === -1) {
        return { "error": `grocery with id ${grocery.id} not found` };
    }
    groceries[index] = grocery;
    set(groceryCollection);
    return { groceryCollection: groceryCollection };
};

// delete a grocery from local storage
const del = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const groceryCollection = get();
    const groceries = groceryCollection.groceries;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = groceries.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `grocery with id ${id} not found` };
    }
    groceries.splice(index, 1);
    set(groceryCollection);
    return { groceryCollection: groceryCollection };
};

const groceryUtils = {
    get,
    getById,
    add,
    update,
    del
};

export { groceryUtils };



