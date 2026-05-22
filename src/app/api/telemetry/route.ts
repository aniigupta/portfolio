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

function isBot(ua: string) {
  const lower = ua.toLowerCase();
  const botKeywords = ["bot", "spider", "crawler", "lighthouse", "headless", "speedcurve", "pingdom", "gtmetrix", "runscope", "vercel-screenshot", "puppeteer"];
  return botKeywords.some(keyword => lower.includes(keyword));
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { sessionId, eventType, duration, referrer, screenSize, language, timezone, pathname, name, shouldEmail } = data;

    const ua = req.headers.get("user-agent") || "";
    
    // Ignore automated search engine crawlers and test bots
    if (isBot(ua)) {
      return NextResponse.json({ status: "ignored_bot" }, { status: 200 });
    }

    // Extract Vercel Geo Location headers
    const country = req.headers.get("x-vercel-ip-country") || "Unknown Country";
    const region = req.headers.get("x-vercel-ip-country-region") || "Unknown Region";
    const city = req.headers.get("x-vercel-ip-city") || "Unknown City";
    const ip = req.headers.get("x-forwarded-for")?.split(',')[0] || "Unknown IP";

    const { os, browser, device } = parseUserAgent(ua);

    console.log(`Telemetry Event [${eventType}] from session ${sessionId}: Duration ${duration}s, Path: ${pathname}`);

    // If requested and user stayed long enough, send email alert
    if (shouldEmail && duration >= 5) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const visitorNameLabel = name ? name : "Anonymous Visitor";
      const locationLabel = `${city}, ${region}, ${country}`;
      const formattedDuration = formatDuration(duration);

      const emailSubject = `[Portfolio View] 👤 ${visitorNameLabel} from ${city}, ${country}`;

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: 'aniiigupta23@gmail.com',
        subject: emailSubject,
        text: `
          New Portfolio View Session Summary:
          
          Visitor: ${visitorNameLabel}
          Location: ${locationLabel}
          Dwell Time: ${formattedDuration}
          Traffic Source: ${referrer}
          Exit Path: ${pathname}
          Device: ${device} (${browser} on ${os})
          Language: ${language}
          Timezone: ${timezone}
          Screen Layout: ${screenSize}
          IP Address: ${ip}
        `,
        html: `
          <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 30px rgba(0,0,0,0.03); background: #faf9ff;">
            <div style="background: linear-gradient(135deg, #7c3aed, #db2777); padding: 24px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Portfolio View Alert</h2>
              <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0 0; font-size: 14px; font-family: monospace;">Session ID: ${sessionId.slice(0, 12)}...</p>
            </div>
            
            <div style="padding: 24px; background: #ffffff;">
              <div style="background: rgba(124, 58, 237, 0.04); border: 1px solid rgba(124, 58, 237, 0.08); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                <h3 style="margin-top: 0; color: #7c3aed; font-size: 16px; font-weight: 700;">Visitor Highlights</h3>
                <table style="width: 100%; font-size: 14px; color: #4b5563; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #1f2937; width: 120px;">Identity:</td>
                    <td style="padding: 6px 0; font-weight: 700; color: #7c3aed;">${visitorNameLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #1f2937;">Dwell Time:</td>
                    <td style="padding: 6px 0; font-weight: 700; color: #10b981;">⏱️ ${formattedDuration}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #1f2937;">Location:</td>
                    <td style="padding: 6px 0;">📍 ${locationLabel}</td>
                  </tr>
                </table>
              </div>

              <h4 style="margin: 0 0 10px 0; color: #374151; font-size: 14px; font-weight: 700; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">Technical Details</h4>
              <table style="width: 100%; font-size: 13px; color: #4b5563; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; color: #4b5563; width: 130px;">Referrer Source:</td>
                  <td style="padding: 6px 0; font-family: monospace;">${referrer}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; color: #4b5563;">Exit Page:</td>
                  <td style="padding: 6px 0; font-family: monospace;">${pathname}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; color: #4b5563;">Device Profile:</td>
                  <td style="padding: 6px 0;">${device} (${browser} on ${os})</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; color: #4b5563;">IP Address:</td>
                  <td style="padding: 6px 0; font-family: monospace; font-size: 12px;">${ip}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; color: #4b5563;">Browser Language:</td>
                  <td style="padding: 6px 0;">${language} (${timezone})</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; color: #4b5563;">Screen Layout:</td>
                  <td style="padding: 6px 0;">${screenSize}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #f3f4f6; text-align: center; padding: 16px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
              Sent automatically from your Portfolio Webpage.
            </div>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Successfully dispatched session alert email for ${sessionId}`);
      } catch (mailError) {
        console.error('Nodemailer Telemetry Email Error:', mailError);
        // Do not fail the request; allow the client to receive a 200 success response.
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Telemetry Endpoint Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
