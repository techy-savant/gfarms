import { NextResponse } from "next/server";
import users from "@/utils/users.json";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const user = users.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return NextResponse.json({
        success: true,
        message: "Authentication successful",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}
