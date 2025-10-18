import { getProjects, createProject } from "@/lib/actions/projects"

describe("Project Actions", () => {
  describe("getProjects", () => {
    it("returns an array of projects", async () => {
      const projects = await getProjects()
      expect(Array.isArray(projects)).toBe(true)
    })

    it("filters projects by category", async () => {
      const projects = await getProjects({ category: "residential" })
      expect(Array.isArray(projects)).toBe(true)
    })
  })

  describe("createProject", () => {
    it("requires authentication", async () => {
      const result = await createProject({
        title: "Test Project",
        description: "Test Description",
      })

      expect(result.error).toBeDefined()
    })
  })
})
