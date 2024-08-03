import { GET, POST } from "@/app/api/meeting-item-statuses/route";
import {
  GET as GET_STATUS,
  PATCH,
  DELETE,
} from "@/app/api/meeting-item-statuses/[id]/route";
import { createRequest, readResponse } from "../utils/testUtils";

jest.mock("@/lib/prisma", () => ({
  meetingItemStatus: {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Meeting Item Statuses API", () => {
  it("GET /api/meeting-item-statuses should return all meeting item statuses", async () => {
    const req = createRequest("GET", "/api/meeting-item-statuses");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(Array.isArray(body)).toBe(true);
  });

  it("POST /api/meeting-item-statuses should create a new meeting item status", async () => {
    const newStatus = {
      status: "Open",
      meetingId: "some-meeting-id",
      meetingItemId: "some-item-id",
      responsiblePersonId: "some-person-id",
    };
    const req = createRequest("POST", "/api/meeting-item-statuses", newStatus);
    const res = await POST(req);
    expect(res.status).toBe(201);
    const body = await readResponse(res);
    expect(body).toHaveProperty("id");
  });

  it("GET /api/meeting-item-statuses/[id] should return a specific meeting item status", async () => {
    const req = createRequest("GET", "/api/meeting-item-statuses/some-id");
    const res = await GET_STATUS(req, { params: { id: "some-id" } });
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(body).toHaveProperty("id", "some-id");
  });

  it("PATCH /api/meeting-item-statuses/[id] should update a meeting item status", async () => {
    const updatedStatus = {
      status: "Closed",
    };
    const req = createRequest(
      "PATCH",
      "/api/meeting-item-statuses/some-id",
      updatedStatus,
    );
    const res = await PATCH(req, { params: { id: "some-id" } });
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(body).toHaveProperty("status", "Closed");
  });

  it("DELETE /api/meeting-item-statuses/[id] should delete a meeting item status", async () => {
    const req = createRequest("DELETE", "/api/meeting-item-statuses/some-id");
    const res = await DELETE(req, { params: { id: "some-id" } });
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(body).toHaveProperty(
      "message",
      "Meeting item status deleted successfully",
    );
  });
});
