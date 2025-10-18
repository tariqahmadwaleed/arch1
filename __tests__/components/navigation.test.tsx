import { render, screen } from "@testing-library/react"
import { Navigation } from "@/components/navigation"

describe("Navigation", () => {
  it("renders the ArchNet logo", () => {
    render(<Navigation />)
    expect(screen.getByText("ArchNet")).toBeInTheDocument()
  })

  it("renders main navigation links", () => {
    render(<Navigation />)
    expect(screen.getByText("Projects")).toBeInTheDocument()
    expect(screen.getByText("News")).toBeInTheDocument()
    expect(screen.getByText("Competitions")).toBeInTheDocument()
  })

  it("renders context dropdown", () => {
    render(<Navigation />)
    expect(screen.getByText("Context")).toBeInTheDocument()
  })
})
