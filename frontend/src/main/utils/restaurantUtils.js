// get restaurants from local storage
const get = () => {
    const restaurants = JSON.parse(localStorage.getItem("restaurants"));
    if (restaurants==null) {
       return set([]);
    }
    return { restaurants: restaurants };
};

// set restaurants in local storage
const set = (restaurants) => {
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
    return { restaurants: restaurants };
};

// add a restaurant to local storage
const add = (restaurant) => {
    const {restaurants} = get();
    restaurants.push(restaurant);
    set(restaurants);
    return { restaurants: restaurants } ;
};

// update a restaurant in local storage
const update = (restaurant) => {
    const {restaurants} = get();
    const index = restaurants.findIndex((r) => r.id === restaurant.id);
    if (index==-1) {
        return { "error" : `restaurant with id ${restaurant.id} not found`};
    }
    restaurants[index] = restaurant;
    set(restaurants);
    return { restaurants: restaurants } ;
};

// delete a restaurant from local storage
const del = (id) => {
    const {restaurants} = get();
    const index = restaurants.findIndex((r) => r.id === id);
    if (index==-1) {
        return { "error" : `restaurant with id ${id} not found`};
    }
    restaurants.splice(index, 1); 
    set(restaurants);
    return { restaurants: restaurants } ;
}; 

const restaurantUtils = {
    get,
    add,
    update,
    del
};
export default restaurantUtils;



