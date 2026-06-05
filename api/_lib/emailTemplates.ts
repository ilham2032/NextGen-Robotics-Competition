const brandHeader = `
  <div style="background:linear-gradient(135deg,#1d4ed8,#4338ca);padding:28px 24px;text-align:center;border-radius:12px 12px 0 0;">
    <p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#bfdbfe;">NextGen Robotics Competition</p>
    <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-family:Georgia,serif;">{title}</h1>
  </div>
`

const brandFooter = `
  <div style="padding:20px 24px;background:#f8fafc;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
    <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">
      NextGen Robotics Competition · Baku, Azerbaijan<br/>
      <a href="mailto:nextgenazer@gmail.com" style="color:#2563eb;">nextgenazer@gmail.com</a> · +994 77 626 68 58
    </p>
  </div>
`

const wrapEmail = (title: string, bodyHtml: string): string => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:24px;background:#f1f5f9;font-family:Segoe UI,Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);">
    ${brandHeader.replace("{title}", title)}
    <div style="padding:28px 24px;color:#334155;font-size:15px;line-height:1.7;">
      ${bodyHtml}
    </div>
    ${brandFooter}
  </div>
</body>
</html>
`

export const mentorWelcomeEmail = (name: string, surname: string): { subject: string; html: string } => ({
  subject: "Welcome to NextGen Robotics Competition — Mentor Registration Confirmed",
  html: wrapEmail(
    "Registration Confirmed",
    `
    <p style="margin:0 0 16px;">Dear <strong>${name} ${surname}</strong>,</p>
    <p style="margin:0 0 16px;">
      Thank you for registering as a <strong>mentor</strong> with NextGen Robotics Competition.
      Your account has been created successfully.
    </p>
    <p style="margin:0 0 16px;">
      You can now sign in to the mentor portal to add participants, create teams, and manage your competition entries.
    </p>
    <p style="margin:0 0 20px;padding:16px;background:#eff6ff;border-left:4px solid #2563eb;border-radius:0 8px 8px 0;">
      <strong>We wish you and your teams the very best of luck</strong> in the competition. We look forward to seeing your robots in action.
    </p>
    <p style="margin:0;color:#64748b;font-size:14px;">
      If you have any questions, reply to this email or contact us at
      <a href="mailto:nextgenazer@gmail.com" style="color:#2563eb;">nextgenazer@gmail.com</a>.
    </p>
    `,
  ),
})

export const memberWelcomeEmail = (
  name: string,
  surname: string,
  mentorName: string,
  age: number,
): { subject: string; html: string } => ({
  subject: "You Are Registered — NextGen Robotics Competition",
  html: wrapEmail(
    "Participant Registered",
    `
    <p style="margin:0 0 16px;">Dear <strong>${name} ${surname}</strong>,</p>
    <p style="margin:0 0 16px;">
      You have been <strong>successfully registered</strong> as a participant for NextGen Robotics Competition
      by your mentor, <strong>${mentorName}</strong>.
    </p>
    <p style="margin:0 0 16px;">
      Your profile is active in our system (age: ${age}). Your mentor will assign you to a team and category that matches the competition rules.
    </p>
    <p style="margin:0 0 20px;padding:16px;background:#ecfdf5;border-left:4px solid #059669;border-radius:0 8px 8px 0;">
      <strong>Good luck</strong> — we are excited to welcome you to the international robotics community at NextGen!
    </p>
    <p style="margin:0;color:#64748b;font-size:14px;">
      Questions? Contact your mentor or reach the organizers at
      <a href="mailto:nextgenazer@gmail.com" style="color:#2563eb;">nextgenazer@gmail.com</a>.
    </p>
    `,
  ),
})

export const contactInboxEmail = (
  senderName: string,
  senderEmail: string,
  message: string,
): { subject: string; html: string } => ({
  subject: `Website contact: ${senderName}`,
  html: wrapEmail(
    "New Message",
    `
    <p style="margin:0 0 12px;"><strong>From:</strong> ${senderName}</p>
    <p style="margin:0 0 12px;"><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
    <p style="margin:0 0 8px;"><strong>Message:</strong></p>
    <div style="padding:16px;background:#f8fafc;border-radius:8px;white-space:pre-wrap;">${message}</div>
    `,
  ),
})

export const contactAutoReplyEmail = (senderName: string): { subject: string; html: string } => ({
  subject: "We received your message — NextGen Robotics Competition",
  html: wrapEmail(
    "Thank You for Contacting Us",
    `
    <p style="margin:0 0 16px;">Dear <strong>${senderName}</strong>,</p>
    <p style="margin:0 0 16px;">
      Thank you for reaching out to NextGen Robotics Competition. We have received your message and our team will review it shortly.
    </p>
    <p style="margin:0 0 16px;">
      We typically respond within a few business days. For urgent matters, you may also call us at <strong>+994 77 626 68 58</strong>.
    </p>
    <p style="margin:0;color:#64748b;font-size:14px;">Best regards,<br/><strong>The NextGen Robotics Team</strong></p>
    `,
  ),
})
