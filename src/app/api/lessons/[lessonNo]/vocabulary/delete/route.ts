import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/config/connect";
import Vocabulary from "@/lib/db/models/Vocabulary";
import { getToken } from "next-auth/jwt";

export async function DELETE(req: NextRequest, { params }: { params: { lessonNo: string } }) {
  const token = await getToken({ req });

  // Authorization check (Only admin can delete vocabulary)
  if (!token || token.role !== "admin") {
    return NextResponse.json({ serverStatus: "Error", message: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const vocabularyId = searchParams.get("vocabularyId");

  if (!vocabularyId) {
    return NextResponse.json({ serverStatus: "Error", message: "Vocabulary ID is required" }, { status: 400 });
  }

  try {
    // Connect to the database
    await connectDB();

    // Delete the vocabulary by its ID
    const deletedVocabulary = await Vocabulary.findByIdAndDelete(vocabularyId);

    if (!deletedVocabulary) {
      return NextResponse.json({ serverStatus: "Error", message: "Vocabulary not found" }, { status: 404 });
    }

    return NextResponse.json({ serverStatus: "Success", message: "Vocabulary deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting vocabulary:", error);
    return NextResponse.json(
      { serverStatus: "Error", message: "Failed to delete vocabulary" },
      { status: 500 }
    );
  }
}
