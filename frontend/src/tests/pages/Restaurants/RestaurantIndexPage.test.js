import { render } from "@testing-library/react";
import RestaurantIndexPage from "main/pages/Restaurants/RestaurantIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

describe("RestaurantIndexPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RestaurantIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

});


