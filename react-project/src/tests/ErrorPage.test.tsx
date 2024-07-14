import { createMemoryRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom";

describe('ErrorPage', () => {
    it('renders ErrorPage', () => {
        const router = createMemoryRouter([{path: '*',element:<ErrorPage />}])
        render(<RouterProvider router={router} />)
        expect(screen.getByTestId('error-page')).toBeInTheDocument;
    })
})
