import { NextResponse } from "next/server";
import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const formData = await request.formData();

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;
  const file = formData.get("file") as File;

  // console.log(username, email, subject, content, file);

  const buffer = Buffer.from(await file.arrayBuffer());
  // console.log(buffer);

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
      attachments: [{ filename: file.name, content: buffer }],
    });
    if (error) {
      return NextResponse.json({ error });
    }

    console.log(data);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
