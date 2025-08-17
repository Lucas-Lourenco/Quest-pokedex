
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Layout from "../components/Layout";
import { ThemeContext } from "../contextApi/ThemeContext";

jest.mock("../components/Header", () => () => <div>Header Mock</div>);

describe("Layout component", () => {
  const mockTheme = { background: "black", color: "white" };

  test("renders Header and children", () => {
    render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <Layout>
          <div>Child Content</div>
        </Layout>
      </ThemeContext.Provider>
    );

    expect(screen.getByText("Header Mock")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  test("applies theme styles", () => {
    const { container } = render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <Layout>
          <div>Child Content</div>
        </Layout>
      </ThemeContext.Provider>
    );

    const layoutDiv = container.firstChild;
 
   

    expect(layoutDiv.style.background).toBeTruthy();
    expect(layoutDiv.style.color).toBeTruthy();
  });
});
