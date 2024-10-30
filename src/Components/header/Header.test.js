import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import { AuthProvider } from "../../context/AuthContext";

describe("Header Component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Airline Services")).toBeInTheDocument();
  });

  it('shows "Login" button if no user is logged in', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it('displays the user’s name and a "Logout" button if user is logged in', () => {
    const mockUser = { displayName: "John Doe" };
    const mockLogout = jest.fn();

    jest
      .spyOn(require("../../context/AuthContext"), "useAuth")
      .mockReturnValue({
        currentUser: mockUser,
        userRole: "Admin",
        loginWithGoogle: jest.fn(),
        logout: mockLogout,
      });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe (Admin)")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Logout"));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
