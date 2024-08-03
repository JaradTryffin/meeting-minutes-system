import { NextRequest } from "next/server";

export function createRequest(
  method: string,
  url: string,
  body?: any,
): NextRequest {
  const req = new NextRequest(new URL(url, "http://localhost"), {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return req;
}

export async function readResponse(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
