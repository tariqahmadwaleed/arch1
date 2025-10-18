import { NextResponse } from "next/server"
import { logger } from "@/lib/monitoring/logger"

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export function handleApiError(error: unknown) {
  logger.error("API Error", error instanceof Error ? error : new Error(String(error)))

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.statusCode },
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        message: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }

  return NextResponse.json(
    {
      error: "Unknown error occurred",
    },
    { status: 500 },
  )
}

export function validateRequest(data: unknown, schema: { parse: (data: unknown) => unknown }) {
  try {
    return schema.parse(data)
  } catch (error) {
    throw new ApiError(400, "Invalid request data", "VALIDATION_ERROR")
  }
}
