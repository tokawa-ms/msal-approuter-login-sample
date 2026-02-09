import { NextResponse } from "next/server";
import { listBlobContainers } from "@/lib/azure/storage";

export const GET = async () => {
  try {
    const items = await listBlobContainers();
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Storage list error", error);
    return NextResponse.json(
      { items: [], error: "Failed to list containers." },
      { status: 500 }
    );
  }
};
