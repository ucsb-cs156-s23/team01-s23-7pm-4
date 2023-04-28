import { render, screen, waitFor } from "@testing-library/react";
import GroceryIndexPage from "main/pages/Groceries/GroceryIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockDelete = jest.fn();
jest.mock('main/utils/groceryUtils', () => {
    return {
        __esModule: true,
        groceryUtils: {
            del: (id) => {
                return mockDelete(id);
            },
            get: () => {
                return {
                    nextId: 5,
                    groceries: [
                        {
                            "id": 3,
                            "name": "Sandwich",
                            "price": "5.99",
                            "expiration": "04/28/23" 
                        },
                    ]
                }
            }
        }
    }
});


describe("GroceryIndexPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GroceryIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders correct fields", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GroceryIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const createGroceryButton = screen.getByText("Create Grocery");
        expect(createGroceryButton).toBeInTheDocument();
        expect(createGroceryButton).toHaveAttribute("style", "float: right;");

        const name = screen.getByText("Sandwich");
        expect(name).toBeInTheDocument();

        const expiration = screen.getByText("04/28/23");
        expect(expiration).toBeInTheDocument();

        expect(screen.getByTestId("GroceryTable-cell-row-0-col-Delete-button")).toBeInTheDocument();
        expect(screen.getByTestId("GroceryTable-cell-row-0-col-Details-button")).toBeInTheDocument();
        expect(screen.getByTestId("GroceryTable-cell-row-0-col-Edit-button")).toBeInTheDocument();
    });

    test("delete button calls delete and reloads page", async () => {

        const restoreConsole = mockConsole();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GroceryIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const name = screen.getByText("Sandwich");
        expect(name).toBeInTheDocument();

        const expiration = screen.getByText("04/28/23");
        expect(expiration).toBeInTheDocument();

        const deleteButton = screen.getByTestId("GroceryTable-cell-row-0-col-Delete-button");
        expect(deleteButton).toBeInTheDocument();

        deleteButton.click();

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(3);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/groceries"));


        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage = `GroceryIndexPage deleteCallback: {"id":3,"name":"Sandwich","price":"5.99","expiration":"04/28/23"}`;
        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


