
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";


jest.mock("../routes/AppRoutes", () => ({
  AppRoutes: () => <div>AppRoutes Mock</div>,
}));


jest.mock("../components/layout", () => ({ children }) => <div>Layout Mock {children}</div>);

describe("App component", () => {
  test("renders App without crashing", () => {
    render(<App />);
    
    expect(screen.getByText("Layout Mock")).toBeInTheDocument();
    expect(screen.getByText("AppRoutes Mock")).toBeInTheDocument();
  });
});
