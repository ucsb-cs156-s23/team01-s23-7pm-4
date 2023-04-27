import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import GroceryEditPage from "main/pages/Groceries/GroceryEditPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 1
    }),
    useNavigate: () => mockNavigate
}));

const mockUpdate = jest.fn();
jest.mock('main/utils/groceryUtils', () => {
    return {
        __esModule: true,
        groceryUtils: {
            update: (_grocery) => {return mockUpdate();},
            getById: (_id) => {
                return {
                    grocery: {
                        id: 1,
                        name: "Milk",
                        price: "4.99",
                        expiration: "05/01/23" 
                    }
                }
            }
        }
    }
});


describe("GroceryEditPage tests", () => {

    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GroceryEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields", async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GroceryEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("GroceryForm-name")).toBeInTheDocument();
        expect(screen.getByDisplayValue('Milk')).toBeInTheDocument();
        expect(screen.getByDisplayValue('4.99')).toBeInTheDocument();
        expect(screen.getByDisplayValue('05/01/23')).toBeInTheDocument();
    });

    test("redirects to /groceries on submit", async () => {

        const restoreConsole = mockConsole();

        mockUpdate.mockReturnValue({
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
                    <GroceryEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();

        const priceInput = screen.getByLabelText("Price");
        expect(priceInput).toBeInTheDocument();

        const expirationInput = screen.getByLabelText("Expiration");
        expect(expirationInput).toBeInTheDocument();

        const updateButton = screen.getByText("Update");
        expect(updateButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Milk' } })
            fireEvent.change(priceInput, { target: { value: '4.99' } })
            fireEvent.change(expirationInput, { target: { value: '05/01/23' } })
            fireEvent.click(updateButton);
        });

        await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/groceries"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `updatedGrocery: {"grocery":{"id":1,"name":"Milk","price":"4.99","expiration":"05/01/23"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


