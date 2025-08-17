// src/tests/ThemeContext.test.jsx
import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { ThemeProvider, ThemeContext, themas } from "../contextApi/ThemeContext";

// Componente auxiliar para consumir o contexto
const TestComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  

  return (
    <div>
      <span data-testid="bg">{theme.background}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe("ThemeProvider", () => {
  test("provides theme and toggleTheme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const bgSpan = screen.getByTestId("bg");
    const button = screen.getByText("Toggle");

    // Inicialmente deve ser light
    expect(bgSpan).toHaveTextContent(themas.light.background);

    // Ao clicar no botão, deve alternar para dark
    fireEvent.click(button);
    expect(bgSpan).toHaveTextContent(themas.dark.background);

    // Clicando de novo volta para light
    fireEvent.click(button);
    expect(bgSpan).toHaveTextContent(themas.light.background);
  });
});
