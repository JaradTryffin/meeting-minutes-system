import { GET, POST } from "@/app/api/meeting/route";
import { GET as GET_MEETING, PUT, DELETE } from "@/app/api/meeting/[id]/route";
import { createRequest, readResponse } from "../utils/testUtils";

jest.mock("@/lib/prisma", () => ({
  meeting: {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Meeting API", () => {
  it("GET /api/meeting should return all meetings", async () => {
    const req = createRequest("GET", "/api/meeting");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(Array.isArray(body)).toBe(true);
  });

  it("POST /api/meeting should create a new meeting", async () => {
    const newMeeting = {
      meetingTypeId: "some-id",
      date: new Date().toISOString(),
      minutes: "Test minutes",
    };
    const req = createRequest("POST", "/api/meeting", newMeeting);
    const res = await POST(req);
    expect(res.status).toBe(201);
    const body = await readResponse(res);
    expect(body).toHaveProperty("id");
  });

  it("GET /api/meeting/[id] should return a specific meeting", async () => {
    const req = createRequest("GET", "/api/meeting/some-id");
    const res = await GET_MEETING(req, { params: { id: "some-id" } });
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(body).toHaveProperty("id", "some-id");
  });

  it("PUT /api/meeting/[id] should update a meeting", async () => {
    const updatedMeeting = {
      meetingNumber: 2,
      date: new Date().toISOString(),
      minutes: "Updated minutes",
    };
    const req = createRequest("PUT", "/api/meeting/some-id", updatedMeeting);
    const res = await PUT(req, { params: { id: "some-id" } });
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(body).toHaveProperty("minutes", "Updated minutes");
  });

  it("DELETE /api/meeting/[id] should delete a meeting", async () => {
    const req = createRequest("DELETE", "/api/meeting/some-id");
    const res = await DELETE(req, { params: { id: "some-id" } });
    expect(res.status).toBe(200);
    const body = await readResponse(res);
    expect(body).toHaveProperty("message", "Meeting deleted successfully");
  });
});
