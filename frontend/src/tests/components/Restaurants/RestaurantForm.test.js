import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import RestaurantForm from "main/components/Restaurants/RestaurantForm";
import { restaurantFixtures } from "fixtures/restaurantFixtures";

import { QueryClient, QueryClientProvider } from "react-query";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("RestaurantForm tests", () => {
    const queryClient = new QueryClient();

    const expectedHeaders = ["Name","Description"];
    const expectedFields = ["name","description"];
    const testId = "RestaurantForm";

    test("renders correctly with no initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <RestaurantForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
          });

    });

    test("renders correctly when passing in initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <RestaurantForm initialContents={restaurantFixtures.oneRestaurant} />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expect(await screen.findByTestId(`${testId}-id`)).toBeInTheDocument();
        expect(screen.getByText(`Id`)).toBeInTheDocument();
    });

    // test("Correct Error messages on missing input", async () => {
    //     render(
    //         <QueryClientProvider client={queryClient}>
    //             <Router  >
    //                 <RestaurantForm />
    //             </Router>
    //         </QueryClientProvider>
    //     );
    //     expect(await screen.findByTestId(`${testId}-submit`)).toBeInTheDocument();
    //     const submitButton = screen.getByTestId(`${testId}-submit`);

    //     fireEvent.click(submitButton);

    //     expect(await screen.findByText(/Name is required./)).toBeInTheDocument();
    //     expect(screen.getByText(/Description is required./)).toBeInTheDocument();
    // });

    // test("No Error messages on good input", async () => {
    //     const mockSubmitAction = jest.fn();

    //     render(
    //         <QueryClientProvider client={queryClient}>
    //             <Router>
    //                 <RestaurantForm submitAction={mockSubmitAction} />
    //             </Router>
    //         </QueryClientProvider>
    //     );

    //     expect(await screen.findByTestId(`${testId}-name`)).toBeInTheDocument();

    //     const name = screen.getByTestId(`${testId}-name`);
    //     const description = screen.getByTestId(`${testId}-description`);
    //     const quarter = document.querySelector(`#${testId}-quarter`);
    //     const submitButton = screen.getByTestId(`${testId}-submit`);

    //     fireEvent.change(name, { target: { value: 'test' } });
    //     fireEvent.change(description, { target: { value: 'test' } });
    //     fireEvent.change(quarter, { target: { value: '20124' } });
    //     fireEvent.click(submitButton);

    //     await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    //     expect(screen.queryByText(/Name is required./)).not.toBeInTheDocument();
    //     expect(screen.queryByText(/Description is required./)).not.toBeInTheDocument();
    //     expect(quarter).toHaveValue("20154");
    // });

    test("that navigate(-1) is called when Cancel is clicked", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <RestaurantForm />
                </Router>
            </QueryClientProvider>
        );
        expect(await screen.findByTestId(`${testId}-cancel`)).toBeInTheDocument();
        const cancelButton = screen.getByTestId(`${testId}-cancel`);

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
    });

    // test("Fallback hardcoded values for startQtr and endQtr work when systemInfo doesn't provide any", async () => {
    //     const mockSubmitAction = jest.fn();

    //     axiosMock
    //         .onGet("/api/systemInfo")
    //         .reply(200, {
    //             "springH2ConsoleEnabled": false,
    //             "showSwaggerUILink": false,
    //             "startQtrYYYYQ": null, // use fallback value
    //             "endQtrYYYYQ": null  // use fallback value
    //         });

    //     render(
    //         <QueryClientProvider client={queryClient}>
    //             <Router>
    //                 <RestaurantForm submitAction={mockSubmitAction} />
    //             </Router>
    //         </QueryClientProvider>
    //     );

    //     expect(await screen.findByTestId(`${testId}-name`)).toBeInTheDocument();

    //     const name = screen.getByTestId(`${testId}-name`);
    //     const description = screen.getByTestId(`${testId}-description`);
    //     const quarter = document.querySelector(`#${testId}-quarter`);
    //     const submitButton = screen.getByTestId(`${testId}-submit`);

    //     fireEvent.change(name, { target: { value: 'test' } });
    //     fireEvent.change(description, { target: { value: 'test' } });
    //     fireEvent.change(quarter, { target: { value: '20124' } });
    //     fireEvent.click(submitButton);

    //     await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    //     expect(screen.queryByText(/Name is required./)).not.toBeInTheDocument();
    //     expect(screen.queryByText(/Description is required./)).not.toBeInTheDocument();
    //     expect(quarter).toHaveValue("20211");
    // });


});