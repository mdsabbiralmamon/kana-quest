import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/config/connect";
import Vocabulary from "@/lib/db/models/Vocabulary";

export async function GET(req: NextRequest, { params }: { params: { lessonNo: string } }) {
  try {
    const { lessonNo } = params;

    // Connect to the database
    await connectDB();

    // Fetch vocabulary for the specific lesson
    const vocabularies = await Vocabulary.find({ lesson: lessonNo });

    // Return the vocabulary data
    return NextResponse.json({
      serverStatus: "Success",
      vocabulary: vocabularies,
    });
  } catch (error) {
    console.error("Error fetching vocabulary:", error);
    return NextResponse.json(
      { serverStatus: "Error", message: "Failed to fetch vocabulary" },
      { status: 500 }
    );
  }
}
