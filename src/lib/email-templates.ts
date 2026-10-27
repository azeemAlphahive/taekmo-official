import { siteConfig } from "@/data/content";

function siteOrigin(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    "";
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return siteConfig.url.replace(/\/$/, "");
}

export function absoluteAssetUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteOrigin()}${p}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export { escapeHtml };

/** Inline CID used when Resend attaches public/images/brand/email-logo.png */
export const EMAIL_LOGO_CID = "taekmo-logo";

/**
 * Branded HTML email shell — table layout for client compatibility.
 * Header uses an inline CID logo (attached by the mail sender).
 */
export function renderEmailLayout(options: {
  title: string;
  preheader?: string;
  bodyHtml: string;
}): string {
  const logoUrl = `cid:${EMAIL_LOGO_CID}`;
  const siteUrl = siteOrigin();
  const year = new Date().getFullYear();
  const preheader = options.preheader
    ? escapeHtml(options.preheader)
    : escapeHtml(options.title);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(options.title)}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#eef2ef;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    ${preheader}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef2ef;margin:0;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8e0;">
          <tr>
            <td align="center" style="background-color:#101217;padding:28px 24px;text-align:center;">
              <a href="${siteUrl}" style="text-decoration:none;display:inline-block;">
                <img
                  src="${logoUrl}"
                  alt="TAEKMO"
                  width="260"
                  height="87"
                  style="display:block;margin:0 auto;width:260px;max-width:78%;height:auto;border:0;outline:none;"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td style="height:4px;background-color:#099c2d;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <h1 style="margin:0 0 16px 0;font-size:20px;line-height:1.35;color:#101217;font-weight:700;">
                ${escapeHtml(options.title)}
              </h1>
              ${options.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-top:20px;border-top:1px solid #e2e8e0;">
                    <p style="margin:0 0 6px 0;font-size:13px;line-height:1.5;color:#5c6670;">
                      ${escapeHtml(siteConfig.tagline)}
                    </p>
                    <p style="margin:0;font-size:12px;line-height:1.5;color:#8a939c;">
                      <a href="${siteUrl}" style="color:#099c2d;text-decoration:none;">${escapeHtml(siteConfig.name)}</a>
                      &nbsp;·&nbsp;
                      <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:#5c6670;text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
                    </p>
                    <p style="margin:12px 0 0 0;font-size:11px;line-height:1.4;color:#a0a8b0;">
                      © ${year} ${escapeHtml(siteConfig.name)}. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function contactAdminEmailHtml(input: {
  name: string;
  email: string;
  message: string;
  subject?: string | null;
}): string {
  const rows = [
    ["Name", escapeHtml(input.name)],
    [
      "Email",
      `<a href="mailto:${escapeHtml(input.email)}" style="color:#099c2d;text-decoration:none;">${escapeHtml(input.email)}</a>`,
    ],
  ];
  if (input.subject?.trim()) {
    rows.push(["Subject", escapeHtml(input.subject.trim())]);
  }

  const details = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eef2ef;font-size:12px;font-weight:700;color:#5c6670;width:110px;vertical-align:top;">${label}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eef2ef;font-size:14px;color:#101217;vertical-align:top;">${value}</td>
      </tr>`,
    )
    .join("");

  const body = `
    <p style="margin:0 0 16px 0;font-size:14px;line-height:1.6;color:#5c6670;">
      A new message was submitted from the website contact form.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8faf9;border:1px solid #e2e8e0;border-radius:8px;overflow:hidden;">
      ${details}
    </table>
    <p style="margin:20px 0 8px 0;font-size:12px;font-weight:700;color:#5c6670;text-transform:uppercase;letter-spacing:0.04em;">Message</p>
    <div style="padding:14px 16px;background-color:#f8faf9;border:1px solid #e2e8e0;border-radius:8px;font-size:14px;line-height:1.65;color:#101217;white-space:pre-wrap;">${escapeHtml(input.message)}</div>
  `;

  return renderEmailLayout({
    title: "New contact message",
    preheader: `Message from ${input.name}`,
    bodyHtml: body,
  });
}

export function contactAutoReplyHtml(input: { name: string }): string {
  const body = `
    <p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;color:#101217;">
      Hi ${escapeHtml(input.name)},
    </p>
    <p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;color:#5c6670;">
      Thanks for contacting <strong style="color:#101217;">TAEKMO</strong>. We received your message and our team will get back to you soon.
    </p>
    <p style="margin:0 0 22px 0;font-size:15px;line-height:1.6;color:#5c6670;">
      In the meantime, you can explore our products and authenticity tools on our website.
    </p>
    <a href="${siteOrigin()}/products" style="display:inline-block;background-color:#099c2d;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;">
      View products
    </a>
    <p style="margin:22px 0 0 0;font-size:12px;line-height:1.5;color:#8a939c;">
      This is an automated confirmation. Please do not reply to this email if it is not monitored.
    </p>
  `;

  return renderEmailLayout({
    title: "We received your message",
    preheader: "Thanks for contacting TAEKMO — we will reply soon.",
    bodyHtml: body,
  });
}

export function newsletterAdminEmailHtml(input: {
  email: string;
  isNew: boolean;
}): string {
  const body = `
    <p style="margin:0 0 16px 0;font-size:14px;line-height:1.6;color:#5c6670;">
      ${input.isNew ? "A new subscriber joined the newsletter list." : "A previous subscriber was re-activated."}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8faf9;border:1px solid #e2e8e0;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eef2ef;font-size:12px;font-weight:700;color:#5c6670;width:110px;">Email</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eef2ef;font-size:14px;color:#101217;">
          <a href="mailto:${escapeHtml(input.email)}" style="color:#099c2d;text-decoration:none;">${escapeHtml(input.email)}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 12px;font-size:12px;font-weight:700;color:#5c6670;">Status</td>
        <td style="padding:10px 12px;font-size:14px;color:#101217;">${input.isNew ? "New" : "Re-activated"}</td>
      </tr>
    </table>
  `;

  return renderEmailLayout({
    title: "Newsletter signup",
    preheader: `${input.email} subscribed`,
    bodyHtml: body,
  });
}

export function newsletterWelcomeHtml(): string {
  const body = `
    <p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;color:#101217;">
      Welcome to the TAEKMO newsletter.
    </p>
    <p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;color:#5c6670;">
      You are now subscribed to updates on solar products, solutions, and company news.
    </p>
    <p style="margin:0 0 22px 0;font-size:15px;line-height:1.6;color:#5c6670;">
      We only send useful updates — no spam.
    </p>
    <a href="${siteOrigin()}" style="display:inline-block;background-color:#099c2d;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;">
      Visit TAEKMO
    </a>
  `;

  return renderEmailLayout({
    title: "You are subscribed",
    preheader: "Welcome to TAEKMO updates.",
    bodyHtml: body,
  });
}
