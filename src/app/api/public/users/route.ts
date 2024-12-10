import connectDB from "@/lib/db/config/connect";
import User from "@/lib/db/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Get the page and limit from the query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 users per page

    // Calculate the skip value based on the page number
    const skip = (page - 1) * limit;

    // Fetch the users from the database with pagination
    const users = await User.find()
      .skip(skip) // Skip the number of users based on the page
      .limit(limit); // Limit the number of users per page

    // Get the total number of users to calculate the total number of pages
    const totalUsers = await User.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalUsers / limit);

    // Return the paginated users and metadata
    return NextResponse.json(
      {
        serverStatus: "Success",
        users,
        pagination: {
          page,
          totalPages,
          totalUsers,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        serverStatus: "Error",
        message: error instanceof Error ? error.message : "An unknown error occurred.",
      },
      { status: 500 }
    );
  }
}
