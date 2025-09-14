import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Get the data sent from the client-side component
    const { email, subject, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: `Contact Form <onboarding@resend.dev>`,
      to: "danadabdoub@gmail.com", // Your verified email address
      subject: `Contact Form: ${subject}`,
      html: `
        <div>
          <h3>Message from: ${email}</h3>
          <p>${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({
      message: "Email sent successfully",
      data,
    }, { status: 200 });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({
      message: "An unexpected error occurred.",
      error: error,
    }, { status: 500 });
  }
}