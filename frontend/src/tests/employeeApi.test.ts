import { buildEmployeeListUrl } from "../api/employees";

describe("employee api helpers", () => {
  it("builds server-side list query URLs", () => {
    const url = buildEmployeeListUrl({
      page: 2,
      limit: 50,
      search: "rao",
      country: "India",
      jobTitle: "Frontend Engineer",
      sortBy: "salary",
      order: "desc"
    });

    expect(url).toBe(
      "/api/employees?page=2&limit=50&search=rao&country=India&jobTitle=Frontend+Engineer&sortBy=salary&order=desc"
    );
  });

  it("omits empty filters", () => {
    const url = buildEmployeeListUrl({
      page: 1,
      limit: 20,
      search: "",
      country: "",
      jobTitle: "",
      sortBy: "createdAt",
      order: "desc"
    });

    expect(url).toBe("/api/employees?page=1&limit=20&sortBy=createdAt&order=desc");
  });
});
