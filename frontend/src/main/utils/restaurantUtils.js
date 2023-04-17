// get restaurants from local storage
const get = () => {
    const restaurantCollection = JSON.parse(localStorage.getItem("restaurants"));
    if (restaurantCollection==null) {
       const restaurantCollection = {nextId: 1, restaurants: []}
       return set(restaurantCollection);
    }
    return restaurantCollection ;
};

// set restaurants in local storage
const set = (restaurantCollection) => {
    localStorage.setItem("restaurants", JSON.stringify(restaurantCollection));
    return { restaurantCollection: restaurantCollection };
};

// add a restaurant to local storage
const add = (restaurant) => {
    const restaurantCollection = get();
    restaurant = {...restaurant, id: restaurantCollection.nextId};
    restaurantCollection.nextId++;
    restaurantCollection.restaurants.push(restaurant);
    set(restaurantCollection);
    return { restaurantCollection: restaurantCollection };
};

// update a restaurant in local storage
const update = (restaurant) => {
    const restaurantCollection = get();
    const restaurants = restaurantCollection.restaurants;
    const index = restaurants.findIndex((r) => r.id === restaurant.id);
    if (index==-1) {
        return { "error" : `restaurant with id ${restaurant.id} not found`};
    }
    restaurants[index] = restaurant;
    set(restaurantCollection);
    return { restaurantCollection: restaurantCollection };
};

// delete a restaurant from local storage
const del = (id) => {
    const restaurantCollection = get();
    const restaurants = restaurantCollection.restaurants;
    const index = restaurants.findIndex((r) => r.id === id);
    if (index==-1) {
        return { "error" : `restaurant with id ${id} not found`};
    }
    restaurants.splice(index, 1); 
    set(restaurantCollection);
    return { restaurantCollection: restaurantCollection };
}; 

const restaurantUtils = {
    get,
    add,
    update,
    del
};
export default restaurantUtils;



