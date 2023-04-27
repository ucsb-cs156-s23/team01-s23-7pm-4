import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import GroceryCreatePage from "main/pages/Groceries/GroceryCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockAdd = jest.fn();
jest.mock('main/utils/groceryUtils', () => {
    return {
        __esModule: true,
        groceryUtils: {
            add: () => { return mockAdd(); }
        }
    }
});

describe("GroceryCreatePage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GroceryCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("redirects to /groceries on submit", async () => {

        const restoreConsole = mockConsole();

        mockAdd.mockReturnValue({
            "grocery": {
                id: 1,
                name: "Milk",
                price: "4.99",
                expiration: "05/01/23" 
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GroceryCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();

        const priceInput = screen.getByLabelText("Price");
        expect(priceInput).toBeInTheDocument();

        const expirationInput = screen.getByLabelText("Expiration");
        expect(expirationInput).toBeInTheDocument();

        const createButton = screen.getByText("Create");
        expect(createButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Milk' } })
            fireEvent.change(priceInput, { target: { value: '4.99' } })
            fireEvent.change(expirationInput, { target: { value: '05/01/23' } })
            fireEvent.click(createButton);
        });

        await waitFor(() => expect(mockAdd).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/groceries"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `createdGrocery: {"grocery":{"id":1,"name":"Milk","price":"4.99","expiration":"05/01/23"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


