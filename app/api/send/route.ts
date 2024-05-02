import { NextResponse } from "next/server";
import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { username, subject, email, content, file } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.FROM_RESEND_EMAIL}`,
      to: [`${process.env.TEST_TO_EMAIL_ADDRESS}`],
      subject: subject,
      react: EmailTemplate({
        username,
        email,
        content,
      }) as React.ReactElement,
      attachments: [{ filename: file.name, content: file }],
    });
    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
