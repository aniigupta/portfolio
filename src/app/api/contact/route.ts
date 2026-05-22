import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    let data;
    try {
      data = await req.json();
    } catch (parseError) {
      console.warn('Contact API: received request with empty or invalid JSON body.');
      return NextResponse.json({ error: 'Invalid or empty JSON body' }, { status: 400 });
    }

    const { name, email, workType, message } = data || {};

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate SMTP Env values first
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Contact Form Error: SMTP environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS) are missing from the server environment.');
      return NextResponse.json({ error: 'Server email credentials are not configured.' }, { status: 500 });
    }

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'aniiigupta23@gmail.com',
      subject: `[Portfolio Contact] ${workType}: ${name}`,
      text: `
        New Message from Portfolio Contact Form:
        
        Name: ${name}
        Email: ${email}
        Interest: ${workType}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
          <h2 style="color: #8b5cf6;">New Contact Form Submission</h2>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Interested In:</strong> ${workType}</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <footer style="margin-top: 30px; font-size: 12px; color: #666;">
            Sent from your portfolio website.
          </footer>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
}
