import { render, screen } from "@testing-library/react"
import { SocialInteractions } from "@/components/social-interactions"

describe("SocialInteractions", () => {
  const mockProps = {
    entityType: "project" as const,
    entityId: "123",
    initialLikes: 10,
    initialComments: 5,
    initialShares: 2,
  }

  it("renders all interaction buttons", () => {
    render(<SocialInteractions {...mockProps} />)
    expect(screen.getByLabelText(/like/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/save/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/report/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/share/i)).toBeInTheDocument()
  })

  it("displays correct counts", () => {
    render(<SocialInteractions {...mockProps} />)
    expect(screen.getByText("10")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
  })
})
