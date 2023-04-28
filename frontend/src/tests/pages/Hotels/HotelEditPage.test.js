import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import HotelEditPage from "main/pages/Hotels/HotelEditPage";
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
jest.mock('main/utils/hotelUtils', () => {
    return {
        __esModule: true,
        hotelUtils: {
            update: (_hotel) => {return mockUpdate();},
            getById: (_id) => {
                return {
                    hotel: {
                        id: 1,
                        name: "The Ritz-Carlton Bacara, Santa Barbara",
                        address: "8301 Hollister Ave, Santa Barbara, CA 93117",
                        description: "a luxury resort in Santa Barbara set on 78 acres with two natural beaches, a holistic spa and seasonal cuisine." 
                    }
                }
            }
        }
    }
});


describe("HotelEditPage tests", () => {

    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HotelEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields", async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HotelEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("HotelForm-name")).toBeInTheDocument();
        expect(screen.getByDisplayValue('The Ritz-Carlton Bacara, Santa Barbara')).toBeInTheDocument();
        expect(screen.getByDisplayValue('8301 Hollister Ave, Santa Barbara, CA 93117')).toBeInTheDocument();
        expect(screen.getByDisplayValue('a luxury resort in Santa Barbara set on 78 acres with two natural beaches, a holistic spa and seasonal cuisine.')).toBeInTheDocument();
    });

    test("redirects to /hotels on submit", async () => {

        const restoreConsole = mockConsole();

        mockUpdate.mockReturnValue({
            "hotel": {
                id: 1,
                name: "The Ritz-Carlton Bacara, Santa Barbara",
                address: "8301 Hollister Ave, Santa Barbara, CA 93117",
                description: "a luxury resort in Santa Barbara set on 78 acres with two natural beaches, a holistic spa and seasonal cuisine."
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HotelEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();

        const priceInput = screen.getByLabelText("Address");
        expect(priceInput).toBeInTheDocument();

        const expirationInput = screen.getByLabelText("Description");
        expect(expirationInput).toBeInTheDocument();

        const updateButton = screen.getByText("Update");
        expect(updateButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'The Ritz-Carlton Bacara, Santa Barbara' } })
            fireEvent.change(priceInput, { target: { value: '8301 Hollister Ave, Santa Barbara, CA 93117' } })
            fireEvent.change(expirationInput, { target: { value: 'a luxury resort in Santa Barbara set on 78 acres with two natural beaches, a holistic spa and seasonal cuisine.' } })
            fireEvent.click(updateButton);
        });

        await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/hotels"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `updatedHotel: {"hotel":{"id":1,"name":"The Ritz-Carlton Bacara, Santa Barbara","address":"8301 Hollister Ave, Santa Barbara, CA 93117","description":"a luxury resort in Santa Barbara set on 78 acres with two natural beaches, a holistic spa and seasonal cuisine."}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


