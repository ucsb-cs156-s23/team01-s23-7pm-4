import { render, waitFor} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import AppNavbar from "main/components/Nav/AppNavbar";

describe("AppNavbar tests", () => {

    const queryClient = new QueryClient();

    test("renders correctly and shows Brand", async () => {

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar  />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Demo React Example")).toBeInTheDocument());
    });

});


