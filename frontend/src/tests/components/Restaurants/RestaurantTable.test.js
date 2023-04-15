import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import RestaurantTable from "main/components/Restaurants/RestaurantTable";
import { restaurantFixtures } from "fixtures/restaurantFixtures";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("RestaurantTable tests", () => {
  const queryClient = new QueryClient();

  const expectedHeaders = ["id", "Name","Description"];
  const expectedFields = ["id", "name","description"];
  const testId = "RestaurantTable";


  test("renders without crashing for empty table", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RestaurantTable restaurants={[]}  />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });



  test("Has the expected column headers, content and buttons", () => {

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RestaurantTable restaurants={restaurantFixtures.threeRestaurants}  />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("Cristino's Bakery");

    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("3");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-name`)).toHaveTextContent("Freebirds");

    const editButton = screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });
  
  test("Has the expected column headers, content and no buttons when showButtons=false", () => {

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RestaurantTable restaurants={restaurantFixtures.threeRestaurants} showButtons={false}  />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("Cristino's Bakery");

    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("3");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-name`)).toHaveTextContent("Freebirds");

    // expect(screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`)).not.toBeInTheDocument();

    // const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    // expect(deleteButton).not.toBeInTheDocument();

    // const detailsButton = screen.getByTestId(`${testId}-cell-row-0-col-Details-button`);
    // expect(detailsButton).not.toBeInTheDocument();
  });
  

  test("Edit button navigates to the edit page", async () => {

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RestaurantTable restaurants={restaurantFixtures.threeRestaurants}  />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("Cristino's Bakery");

    const editButton = screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    
    fireEvent.click(editButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/restaurant/edit/2'));
  });

  test("Details button navigates to the details page", async () => {

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RestaurantTable restaurants={restaurantFixtures.threeRestaurants}  />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("Cristino's Bakery");

    const detailsButton = screen.getByTestId(`${testId}-cell-row-0-col-Details-button`);
    expect(detailsButton).toBeInTheDocument();
    
    fireEvent.click(detailsButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/restaurant/details/2'));
  });

  test("Delete button calls delete callback", async () => {

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RestaurantTable restaurants={restaurantFixtures.threeRestaurants}  />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("Cristino's Bakery");

    const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    
    fireEvent.click(deleteButton);
  });
});
