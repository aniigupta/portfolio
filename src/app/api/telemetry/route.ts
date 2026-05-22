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
    let data;
    try {
      data = await req.json();
    } catch (parseError) {
      console.warn('Telemetry: received request with empty or invalid JSON body.');
      return NextResponse.json({ error: 'Invalid or empty JSON body' }, { status: 400 });
    }

    const { sessionId, eventType, duration, referrer, screenSize, language, timezone, pathname, name, shouldEmail } = data || {};
    
    const safeSessionId = typeof sessionId === 'string' ? sessionId : 'unknown_session';
    const safePathname = typeof pathname === 'string' ? pathname : 'unknown_path';
    const numericDuration = typeof duration === 'number' ? duration : 0;
    const safeName = typeof name === 'string' ? name : '';
    const safeReferrer = typeof referrer === 'string' ? referrer : 'Direct / Typed URL';
    const safeScreenSize = typeof screenSize === 'string' ? screenSize : 'unknown_size';
    const safeLanguage = typeof language === 'string' ? language : 'unknown_lang';
    const safeTimezone = typeof timezone === 'string' ? timezone : 'unknown_tz';

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

    console.log(`Telemetry Event [${eventType || 'unknown'}] from session ${safeSessionId}: Duration ${numericDuration}s, Path: ${safePathname}`);

    // If requested and user stayed long enough, send email alert
    if (shouldEmail && numericDuration >= 5) {
      try {
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
          console.warn('Telemetry Warning: SMTP environment variables are missing from environment. Cannot send email alert.');
        } else {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          const visitorNameLabel = safeName ? safeName : "Anonymous Visitor";
          const locationLabel = `${city}, ${region}, ${country}`;
          const formattedDuration = formatDuration(numericDuration);
          const displaySessionId = safeSessionId.length > 12 ? safeSessionId.slice(0, 12) : safeSessionId;

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
              Traffic Source: ${safeReferrer}
              Exit Path: ${safePathname}
              Device: ${device} (${browser} on ${os})
              Language: ${safeLanguage}
              Timezone: ${safeTimezone}
              Screen Layout: ${safeScreenSize}
              IP Address: ${ip}
            `,
            html: `
              <div style="background-color: #030014; background-image: radial-gradient(circle at top, #0d0628 0%, #030014 100%); padding: 32px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #f8fafc; line-height: 1.5;">
                <div style="max-width: 580px; margin: 0 auto; background: #0c0724; border: 1px solid rgba(139, 92, 246, 0.25); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);">
                  <!-- Decorative top gradient bar -->
                  <div style="height: 6px; background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);"></div>
                  
                  <!-- Content padding -->
                  <div style="padding: 32px 24px;">
                    <!-- Logo / Header -->
                    <div style="text-align: center; margin-bottom: 28px;">
                      <span style="font-family: monospace; font-size: 11px; font-weight: 700; color: #38bdf8; letter-spacing: 3px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.2); padding: 6px 14px; border-radius: 99px; text-transform: uppercase;">
                        Telemetry Tracker
                      </span>
                      <h1 style="color: #ffffff; margin: 16px 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                        Visitor Session Logged 👤
                      </h1>
                      <p style="color: #64748b; font-family: monospace; font-size: 12px; margin: 0;">
                        Session ID: <span style="color: #a78bfa;">${displaySessionId}</span>
                      </p>
                    </div>

                    <!-- Core Visitor Metrics Panel -->
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                      <h3 style="margin-top: 0; margin-bottom: 16px; color: #a78bfa; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
                        Highlights
                      </h3>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #94a3b8; width: 110px;">Identity:</td>
                          <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #ffffff;">${visitorNameLabel}</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #94a3b8;">Dwell Time:</td>
                          <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #10b981;">⏱️ ${formattedDuration}</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #94a3b8;">Location:</td>
                          <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #cbd5e1;">📍 ${locationLabel}</td>
                        </tr>
                      </table>
                    </div>

                    <!-- Traffic & Navigation -->
                    <div style="background: rgba(255, 255, 255, 0.01); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                      <h3 style="margin-top: 0; margin-bottom: 16px; color: #a78bfa; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
                        Traffic & Navigation
                      </h3>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #94a3b8; width: 110px;">Referrer Source:</td>
                          <td style="padding: 6px 0; font-family: monospace; font-size: 12px; color: #38bdf8; word-break: break-all;">${safeReferrer}</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #94a3b8;">Exit Path:</td>
                          <td style="padding: 6px 0; font-family: monospace; font-size: 12px; color: #f472b6; word-break: break-all;">${safePathname}</td>
                        </tr>
                      </table>
                    </div>

                    <!-- Technical Environment Details -->
                    <div style="background: rgba(255, 255, 255, 0.01); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 20px;">
                      <h3 style="margin-top: 0; margin-bottom: 16px; color: #a78bfa; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
                        System Parameters
                      </h3>
                      <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #cbd5e1;">
                        <tr>
                          <td style="padding: 6px 0; font-weight: 600; color: #94a3b8; width: 110px;">Device Profile:</td>
                          <td style="padding: 6px 0; color: #e2e8f0;">${device} (${browser} on ${os})</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; font-weight: 600; color: #94a3b8;">IP Address:</td>
                          <td style="padding: 6px 0; font-family: monospace; font-size: 12px; color: #cbd5e1;">${ip}</td>
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
          console.log(`Successfully dispatched session alert email for ${safeSessionId}`);
        }
      } catch (mailError) {
        console.error('Nodemailer Telemetry Email Error:', mailError);
        // We log the error but still return 200 so that client-side pings succeed without console error spam
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Telemetry Endpoint Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
