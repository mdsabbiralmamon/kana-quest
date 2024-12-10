import connectDB from "@/lib/db/config/connect";
import User from "@/lib/db/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { name, email, password, photo } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { serverStatus: "Error", message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { serverStatus: "Error", message: "Invalid email format." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { serverStatus: "Error", message: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with role set to "user"
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      photo: photo || null,
    });

    // Response on successful creation
    return NextResponse.json(
      {
        serverStatus: "Success",
        message: "User created successfully.",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          photo: newUser.photo,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign-Up Error:", error);
    return NextResponse.json(
      { serverStatus: "Error", message: "Failed to create user." },
      { status: 500 }
    );
  }
}
