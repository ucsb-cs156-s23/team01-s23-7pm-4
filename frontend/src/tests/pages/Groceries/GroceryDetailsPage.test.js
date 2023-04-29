import { render, screen } from "@testing-library/react";
import GroceryDetailsPage from "main/pages/Groceries/GroceryDetailsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

jest.mock('main/utils/groceryUtils', () => {
    return {
        __esModule: true,
        groceryUtils: {
            getById: (_id) => {
                return {
                    grocery: {
                        id: 3,
                        name: "Sandwich",
                        price: "5.99",
                        expiration: "04/28/23" 
                    }
                }
            }
        }
    }
});

describe("GroceryDetailsPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GroceryDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields, and no buttons", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GroceryDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText("Sandwich")).toBeInTheDocument();
        expect(screen.getByText("5.99")).toBeInTheDocument();
        expect(screen.getByText("04/28/23")).toBeInTheDocument();

        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
        expect(screen.queryByText("Details")).not.toBeInTheDocument();
    });

});


