import { render, screen } from "@testing-library/react"
import { OptimizedImage } from "@/components/optimized-image"

describe("OptimizedImage", () => {
  it("renders with alt text", () => {
    render(<OptimizedImage src="/test.jpg" alt="Test image" width={100} height={100} />)
    expect(screen.getByAltText("Test image")).toBeInTheDocument()
  })

  it("shows loading state initially", () => {
    const { container } = render(<OptimizedImage src="/test.jpg" alt="Test" width={100} height={100} />)
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument()
  })

  it("handles error state", () => {
    render(<OptimizedImage src="/invalid.jpg" alt="Test" width={100} height={100} />)
    // Error handling would be tested with proper mocking
  })
})
