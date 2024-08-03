import { GET, POST } from "@/app/api/meeting-items/route";
import {
  GET as GET_ITEM,
  PUT,
  DELETE,
} from "@/app/api/meeting-items/[id]/route";
import { createRequest, readResponse } from "../utils/testUtils";

jest.mock("@/lib/prisma", () => ({
  meetingItem: {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Meeting Items API", () => {
  it("GET /api/meeting-items should return all meeting items", async () => {
    const req = createRequest("GET", "/api/meeting-items");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(Array.isArray(body)).toBe(true);
  });

  it("POST /api/meeting-items should create a new meeting item", async () => {
    const newItem = {
      description: "Test item",
      dueDate: new Date().toISOString(),
      meetingId: "some-meeting-id",
      status: "Open",
      responsiblePersonId: "some-person-id",
    };
    const req = createRequest("POST", "/api/meeting-items", newItem);
    const res = await POST(req);
    expect(res.status).toBe(201);
    const body = await readResponse(res);
    expect(body).toHaveProperty("id");
  });

  it("GET /api/meeting-items/[id] should return a specific meeting item", async () => {
    const req = createRequest("GET", "/api/meeting-items/some-id");
    const res = await GET_ITEM(req, { params: { id: "some-id" } });
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(body).toHaveProperty("id", "some-id");
  });

  it("PUT /api/meeting-items/[id] should update a meeting item", async () => {
    const updatedItem = {
      description: "Updated item",
      dueDate: new Date().toISOString(),
    };
    const req = createRequest("PUT", "/api/meeting-items/some-id", updatedItem);
    const res = await PUT(req, { params: { id: "some-id" } });
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(body).toHaveProperty("description", "Updated item");
  });

  it("DELETE /api/meeting-items/[id] should delete a meeting item", async () => {
    const req = createRequest("DELETE", "/api/meeting-items/some-id");
    const res = await DELETE(req, { params: { id: "some-id" } });
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(body).toHaveProperty("message", "Meeting item deleted successfully");
  });
});
