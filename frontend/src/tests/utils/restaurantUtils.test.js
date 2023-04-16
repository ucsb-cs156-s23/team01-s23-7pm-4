import { restaurantFixtures } from "fixtures/restaurantFixtures";
import restaurantUtils from "main/utils/restaurantUtils";

describe("restaurantUtils tests", () => {
    // return a function that can be used as a mock implementation of getItem
    // the value passed in will be convertd to JSON and returned as the value
    // for the key "restaurants".  Any other key results in an error
    const createGetItemMock = (returnValue) => (key) => {
        if (key === "restaurants") {
            return JSON.stringify(returnValue);
        } else {
            throw new Error("Unexpected key: " + key);
        }
    };
      
    describe("get", () => {
        test("When restaurants is null in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(null));
            
            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key,_value) => null);
 
            // act
            const result = restaurantUtils.get();

            // assert
            expect(result).toEqual({restaurants: []});
            expect(setItemSpy).toHaveBeenCalledWith("restaurants","[]");
        });

        test("When restaurants is [] in local storage, should return []", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock([]));
            
            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key,_value) => null);
 
            // act
            const result = restaurantUtils.get();

            // assert
            expect(result).toEqual({restaurants: []});
            expect(setItemSpy).not.toHaveBeenCalled();
        });

        test("When restaurants is JSON of three restaurants, should return that JSON", () => {

            // arrange
            const threeRestaurants = restaurantFixtures.threeRestaurants;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(threeRestaurants));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key,_value) => null);
 
            // act
            const result = restaurantUtils.get();

            // assert
            expect(result).toEqual({restaurants: threeRestaurants});
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });

    describe("add", () => {
        test("Starting from [], check that adding one restaurant works", () => {

            // arrange
            const restaurant = restaurantFixtures.oneRestaurant[0];
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');            
            getItemSpy.mockImplementation(createGetItemMock([]));


            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key,_value) => null);
 
            // act
            const result = restaurantUtils.add(restaurant);

            // assert
            expect(result).toEqual({restaurants: restaurantFixtures.oneRestaurant});
            expect(setItemSpy).toHaveBeenCalledWith("restaurants",
                JSON.stringify(restaurantFixtures.oneRestaurant));
        });
    });

    describe("update", () => {
        test("Check that updating an existing restaurant works", () => {

            // arrange
            const threeRestaurants = restaurantFixtures.threeRestaurants;
            const updatedRestaurant = {
                ...threeRestaurants[0],
                name: "Updated Name"
            };
            const threeRestaurantsUpdated = [
                updatedRestaurant,
                threeRestaurants[1],
                threeRestaurants[2]
            ];
            const threeRestaurantsUpdatedJSON = JSON.stringify(threeRestaurantsUpdated);
            
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(threeRestaurants));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key,_value) => null);
 
            // act
            const result = restaurantUtils.update(updatedRestaurant);

            // assert
            expect(result).toEqual({restaurants: threeRestaurantsUpdated});
            expect(setItemSpy).toHaveBeenCalledWith("restaurants",
            threeRestaurantsUpdatedJSON);
        });
        test("Check that updating an non-existing restaurant returns an error", () => {

            // arrange
            const threeRestaurants = restaurantFixtures.threeRestaurants;
            
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(threeRestaurants));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key,_value) => null);
 
            const updatedRestaurant = {
                id: 99,
                name: "Fake Name",
                description: "Fake Description"
            }
            
            // act
            const result = restaurantUtils.update(updatedRestaurant);

            // assert
            const expectedError = `restaurant with id 99 not found`
            expect(result).toEqual({error: expectedError});
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });

    describe("del", () => {
        test("Check that deleting a restaurant by id works", () => {

            // arrange
            const threeRestaurants = restaurantFixtures.threeRestaurants;
            const idToDelete = threeRestaurants[1].id;
            const threeRestaurantsUpdated = [
                threeRestaurants[0],
                threeRestaurants[2]
            ];
            const threeRestaurantsUpdatedJSON = JSON.stringify(threeRestaurantsUpdated);
            
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(threeRestaurants));


            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key,_value) => null);
 
            // act
            const result = restaurantUtils.del(idToDelete);

            // assert
            expect(result).toEqual({restaurants: threeRestaurantsUpdated});
            expect(setItemSpy).toHaveBeenCalledWith("restaurants",
            threeRestaurantsUpdatedJSON);
        });
        test("Check that deleting a non-existing restaurant returns an error", () => {

            // arrange
            const threeRestaurants = restaurantFixtures.threeRestaurants;
            
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(threeRestaurants));
            
            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key,_value) => null);
  
            // act
            const result = restaurantUtils.del(99);

            // assert
            const expectedError = `restaurant with id 99 not found`
            expect(result).toEqual({error: expectedError});
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });
});

