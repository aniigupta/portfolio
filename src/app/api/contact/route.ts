import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function parseUserAgent(ua: string) {
  const lower = ua.toLowerCase();
  let os = "Unknown OS";
  let browser = "Unknown Browser";
  let device = "Desktop";

  if (lower.includes("windows")) os = "Windows";
  else if (lower.includes("macintosh") || lower.includes("mac os")) os = "macOS";
  else if (lower.includes("android")) { os = "Android"; device = "Mobile"; }
  else if (lower.includes("iphone") || lower.includes("ipad")) { os = "iOS"; device = "Mobile"; }
  else if (lower.includes("linux")) os = "Linux";

  if (lower.includes("chrome") || lower.includes("crios")) browser = "Chrome";
  else if (lower.includes("firefox")) browser = "Firefox";
  else if (lower.includes("safari") && !lower.includes("chrome")) browser = "Safari";
  else if (lower.includes("edge") || lower.includes("edg")) browser = "Edge";

  return { os, browser, device };
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export async function POST(req: Request) {
  try {
    let data;
    try {
      data = await req.json();
    } catch {
      console.warn('Contact API: received request with empty or invalid JSON body.');
      return NextResponse.json({ error: 'Invalid or empty JSON body' }, { status: 400 });
    }

    const { name, email, workType, message, referrer, screenSize, timezone, language, duration } = data || {};

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate SMTP Env values first
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Contact Form Error: SMTP environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS) are missing from the server environment.');
      return NextResponse.json({ error: 'Server email credentials are not configured.' }, { status: 500 });
    }

    const safeReferrer = typeof referrer === 'string' ? referrer : 'Direct / Typed URL';
    const safeScreenSize = typeof screenSize === 'string' ? screenSize : 'unknown_size';
    const safeLanguage = typeof language === 'string' ? language : 'unknown_lang';
    const safeTimezone = typeof timezone === 'string' ? timezone : 'unknown_tz';
    const numericDuration = typeof duration === 'number' ? duration : 0;
    const formattedDuration = formatDuration(numericDuration);

    const ua = req.headers.get("user-agent") || "";
    
    // Extract Vercel Geo Location headers
    const country = req.headers.get("x-vercel-ip-country") || "Unknown Country";
    const region = req.headers.get("x-vercel-ip-country-region") || "Unknown Region";
    const city = req.headers.get("x-vercel-ip-city") || "Unknown City";
    const ip = req.headers.get("x-forwarded-for")?.split(',')[0] || "Unknown IP";

    const { os, browser, device } = parseUserAgent(ua);
    const locationLabel = `${city}, ${region}, ${country}`;

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

        Visitor Context:
        Location: ${locationLabel}
        Dwell Time: ${formattedDuration}
        Device Profile: ${device} (${browser} on ${os})
        IP Address: ${ip}
        Referrer Source: ${safeReferrer}
        Language: ${safeLanguage}
        Timezone: ${safeTimezone}
        Screen Layout: ${safeScreenSize}
      `,
      html: `
        <div style="background-color: #030014; background-image: radial-gradient(circle at top, #0f0729 0%, #030014 100%); padding: 32px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #f8fafc; line-height: 1.5;">
          <div style="max-width: 580px; margin: 0 auto; background: #0c0724; border: 1px solid rgba(139, 92, 246, 0.25); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);">
            <!-- Decorative top gradient bar -->
            <div style="height: 6px; background: linear-gradient(90deg, #7c3aed, #ec4899, #3b82f6);"></div>
            
            <!-- Content padding -->
            <div style="padding: 32px 24px;">
              <!-- Logo / Header -->
              <div style="text-align: center; margin-bottom: 28px;">
                <span style="font-family: monospace; font-size: 11px; font-weight: 700; color: #a78bfa; letter-spacing: 3px; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); padding: 6px 14px; border-radius: 99px; text-transform: uppercase;">
                  System Alert
                </span>
                <h1 style="color: #ffffff; margin: 16px 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                  New Message Received
                </h1>
                <p style="color: #94a3b8; font-size: 14px; margin: 0;">
                  A visitor has reached out via the portfolio contact form.
                </p>
              </div>

              <!-- Sender Card -->
              <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #94a3b8; width: 100px; text-transform: uppercase; letter-spacing: 0.5px;">Sender</td>
                    <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #e2e8f0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                    <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #38bdf8;">
                      <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; border-bottom: 1px dashed rgba(56, 189, 248, 0.4);">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Category</td>
                    <td style="padding: 6px 0; font-size: 13px; font-weight: 700;">
                      <span style="background: rgba(236, 72, 153, 0.15); border: 1px solid rgba(236, 72, 153, 0.3); color: #f472b6; padding: 4px 10px; border-radius: 6px; font-family: monospace;">
                        ${workType}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message Terminal Window -->
              <div style="background: #050212; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.4); margin-bottom: 24px;">
                <!-- Terminal Header Table for client compatibility -->
                <table style="width: 100%; background: rgba(255, 255, 255, 0.03); border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding: 8px 14px; border-collapse: collapse;">
                  <tr>
                    <td style="width: 50px; text-align: left; vertical-align: middle;">
                      <span style="display: inline-block; width: 8px; height: 8px; background-color: #ff5f56; border-radius: 50%; margin-right: 4px;"></span>
                      <span style="display: inline-block; width: 8px; height: 8px; background-color: #ffbd2e; border-radius: 50%; margin-right: 4px;"></span>
                      <span style="display: inline-block; width: 8px; height: 8px; background-color: #27c93f; border-radius: 50%;"></span>
                    </td>
                    <td style="text-align: center; vertical-align: middle; font-family: monospace; font-size: 11px; color: #64748b; font-weight: 600;">
                      message.md
                    </td>
                    <td style="width: 50px; text-align: right; font-family: monospace; font-size: 10px; color: #475569;">
                      UTF-8
                    </td>
                  </tr>
                </table>
                <!-- Terminal Content -->
                <div style="padding: 16px 20px;">
                  <p style="white-space: pre-wrap; margin: 0; font-size: 13px; line-height: 1.7; color: #cbd5e1; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;">${message}</p>
                </div>
              </div>

              <!-- Visitor Context Card -->
              <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 12px; padding: 20px;">
                <h3 style="margin-top: 0; margin-bottom: 16px; color: #a78bfa; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
                  Visitor Context
                </h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #cbd5e1;">
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #94a3b8; width: 110px;">Location:</td>
                    <td style="padding: 6px 0; font-weight: 700; color: #ffffff;">📍 ${locationLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #94a3b8; width: 110px;">Dwell Time:</td>
                    <td style="padding: 6px 0; font-weight: 700; color: #10b981;">⏱️ ${formattedDuration}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #94a3b8;">Device Profile:</td>
                    <td style="padding: 6px 0; color: #cbd5e1;">${device} (${browser} on ${os})</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #94a3b8;">IP Address:</td>
                    <td style="padding: 6px 0; font-family: monospace; font-size: 12px; color: #f8fafc;">${ip}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #94a3b8;">Referrer Source:</td>
                    <td style="padding: 6px 0; font-family: monospace; font-size: 12px; color: #38bdf8; word-break: break-all;">${safeReferrer}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #94a3b8;">Locale & Lang:</td>
                    <td style="padding: 6px 0; color: #cbd5e1;">${safeLanguage} (${safeTimezone})</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #94a3b8;">Screen Layout:</td>
                    <td style="padding: 6px 0; color: #cbd5e1;">${safeScreenSize}</td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #08041a; border-top: 1px solid rgba(139, 92, 246, 0.15); padding: 20px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748b; letter-spacing: 0.5px;">
                Generated by <a href="https://aniket-portfolio.vercel.app" style="color: #a78bfa; text-decoration: none; font-weight: 600;">Aniket's Portfolio Bot</a>
              </p>
            </div>
          </div>
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
