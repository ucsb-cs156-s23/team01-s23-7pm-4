import { groceryFixtures } from "fixtures/groceryFixtures";
import { groceryUtils } from "main/utils/groceryUtils";

describe("groceryUtils tests", () => {
    // return a function that can be used as a mock implementation of getItem
    // the value passed in will be convertd to JSON and returned as the value
    // for the key "groceries".  Any other key results in an error
    const createGetItemMock = (returnValue) => (key) => {
        if (key === "groceries") {
            return JSON.stringify(returnValue);
        } else {
            throw new Error("Unexpected key: " + key);
        }
    };

    describe("get", () => {

        test("When groceries is undefined in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(undefined));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = groceryUtils.get();

            // assert
            const expected = { nextId: 1, groceries: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("groceries", expectedJSON);
        });

        test("When groceries is null in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(null));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = groceryUtils.get();

            // assert
            const expected = { nextId: 1, groceries: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("groceries", expectedJSON);
        });

        test("When groceries is [] in local storage, should return []", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, groceries: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = groceryUtils.get();

            // assert
            const expected = { nextId: 1, groceries: [] };
            expect(result).toEqual(expected);

            expect(setItemSpy).not.toHaveBeenCalled();
        });

        test("When groceries is JSON of three groceries, should return that JSON", () => {

            // arrange
            const threeGroceries = groceryFixtures.threeGroceries;
            const mockGroceryCollection = { nextId: 10, groceries: threeGroceries };

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(mockGroceryCollection));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = groceryUtils.get();

            // assert
            expect(result).toEqual(mockGroceryCollection);
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });


    describe("getById", () => {
        test("Check that getting a grocery by id works", () => {

            // arrange
            const threeGroceries = groceryFixtures.threeGroceries;
            const idToGet = threeGroceries[1].id;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, groceries: threeGroceries }));

            // act
            const result = groceryUtils.getById(idToGet);

            // assert

            const expected = { grocery: threeGroceries[1] };
            expect(result).toEqual(expected);
        });

        test("Check that getting a non-existing grocery returns an error", () => {

            // arrange
            const threeGroceries = groceryFixtures.threeGroceries;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, groceries: threeGroceries }));

            // act
            const result = groceryUtils.getById(99);

            // assert
            const expectedError = `grocery with id 99 not found`
            expect(result).toEqual({ error: expectedError });
        });

        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threeGroceries = groceryFixtures.threeGroceries;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, groceries: threeGroceries }));

            // act
            const result = groceryUtils.getById();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });

    });
    describe("add", () => {
        test("Starting from [], check that adding one grocery works", () => {

            // arrange
            const grocery = groceryFixtures.oneGrocery[0];
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, groceries: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = groceryUtils.add(grocery);

            // assert
            expect(result).toEqual(grocery);
            expect(setItemSpy).toHaveBeenCalledWith("groceries",
                JSON.stringify({ nextId: 2, groceries: groceryFixtures.oneGrocery }));
        });
    });

    describe("update", () => {
        test("Check that updating an existing grocery works", () => {

            // arrange
            const threeGroceries = groceryFixtures.threeGroceries;
            const updatedGrocery = {
                ...threeGroceries[0],
                name: "Updated Name"
            };
            const threeGroceriesUpdated = [
                updatedGrocery,
                threeGroceries[1],
                threeGroceries[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, groceries: threeGroceries }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = groceryUtils.update(updatedGrocery);

            // assert
            const expected = { groceryCollection: { nextId: 5, groceries: threeGroceriesUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("groceries", JSON.stringify(expected.groceryCollection));
        });
        test("Check that updating an non-existing grocery returns an error", () => {

            // arrange
            const threeGroceries = groceryFixtures.threeGroceries;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, groceries: threeGroceries }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            const updatedGrocery = {
                id: 99,
                name: "Fake Name",
                description: "Fake Description"
            }

            // act
            const result = groceryUtils.update(updatedGrocery);

            // assert
            const expectedError = `grocery with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });

    describe("del", () => {
        test("Check that deleting a grocery by id works", () => {

            // arrange
            const threeGroceries = groceryFixtures.threeGroceries;
            const idToDelete = threeGroceries[1].id;
            const threeGroceriesUpdated = [
                threeGroceries[0],
                threeGroceries[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, groceries: threeGroceries }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = groceryUtils.del(idToDelete);

            // assert

            const expected = { groceryCollection: { nextId: 5, groceries: threeGroceriesUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("groceries", JSON.stringify(expected.groceryCollection));
        });
        test("Check that deleting a non-existing grocery returns an error", () => {

            // arrange
            const threeGroceries = groceryFixtures.threeGroceries;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, groceries: threeGroceries }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = groceryUtils.del(99);

            // assert
            const expectedError = `grocery with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threeGroceries = groceryFixtures.threeGroceries;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, groceries: threeGroceries }));

            // act
            const result = groceryUtils.del();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });
    });
});

