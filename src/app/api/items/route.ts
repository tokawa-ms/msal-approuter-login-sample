import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json(
    {
      items: [],
      error: "Storage integration has been removed. Use Microsoft Graph from the client.",
    },
    { status: 410 }
  );
};
