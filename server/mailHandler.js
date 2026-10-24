import nodemailer from 'nodemailer'
import Busboy from 'busboy'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Creates the Nodemailer transporter using Google Workspace / SMTP credentials
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT || 465)
  const user = process.env.SMTP_USER || 'info@kolligraphics.com'
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '')

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  })
}

/**
 * Parses multipart or JSON requests
 */
export function parseIncomingRequest(req) {
  return new Promise((resolve, reject) => {
    const contentType = req.headers['content-type'] || ''

    if (contentType.includes('application/json')) {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', () => {
        try {
          resolve({ fields: JSON.parse(body || '{}'), files: [] })
        } catch (e) {
          reject(e)
        }
      })
      req.on('error', reject)
      return
    }

    if (contentType.includes('multipart/form-data')) {
      const busboy = Busboy({ headers: req.headers })
      const fields = {}
      const files = []

      busboy.on('field', (name, val) => {
        fields[name] = val
      })

      busboy.on('file', (name, fileStream, info) => {
        const { filename, mimeType } = info
        const chunks = []
        fileStream.on('data', (chunk) => chunks.push(chunk))
        fileStream.on('end', () => {
          if (filename && chunks.length > 0) {
            files.push({
              filename,
              content: Buffer.concat(chunks),
              contentType: mimeType,
            })
          }
        })
      })

      busboy.on('finish', () => resolve({ fields, files }))
      busboy.on('error', reject)
      req.pipe(busboy)
      return
    }

    resolve({ fields: {}, files: [] })
  })
}

/**
 * Handles sending lead to Kolli Graphics info mail and auto-response to the customer
 */
export async function handleSendMail(req, res) {
  try {
    const { fields, files } = await parseIncomingRequest(req)

    const subject = fields._subject || 'New Website Inquiry - Kolli Graphics'
    const senderName = fields.Name || fields.name || 'Website Visitor'
    const senderEmail = fields.Email || fields.email || ''
    const toEmail = process.env.TO_EMAIL || 'info@kolligraphics.com'
    const fromAddress = process.env.SMTP_USER || 'info@kolligraphics.com'

    // Build lead table for company email
    let rowsHtml = ''
    for (const [key, val] of Object.entries(fields)) {
      if (key.startsWith('_')) continue
      const label = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')
      rowsHtml += `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; font-weight: 700; color: #475569; width: 38%; background-color: #f8fafc;">${label}</td>
          <td style="padding: 10px 14px; color: #0f172a; font-weight: 500;">${String(val).replace(/\n/g, '<br/>')}</td>
        </tr>`
    }

    const companyHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 18px rgba(0,0,0,0.04);">
    <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 26px 32px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 800;">KOLLI GRAPHICS PRIVATE LIMITED</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #fecaca;">Web Portal Lead Notification</p>
    </div>
    <div style="padding: 30px;">
      <h2 style="margin: 0 0 16px 0; font-size: 17px; color: #0f172a; border-bottom: 2px solid #fee2e2; padding-bottom: 8px;">
        ${subject}
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 14px;">
        ${rowsHtml}
      </table>
      <div style="margin-top: 24px; padding: 12px 16px; background-color: #f1f5f9; border-radius: 8px; font-size: 12px; color: #64748b;">
        <strong>Received via:</strong> Kolli Graphics Web Portal &bull; Reply-to: ${senderEmail || 'N/A'}
      </div>
    </div>
  </div>
</body>
</html>`

    const transporter = createTransporter()

    // 1. Send Lead to Kolli Graphics (info@kolligraphics.com)
    await transporter.sendMail({
      from: `"Kolli Graphics Web Portal" <${fromAddress}>`,
      to: toEmail,
      replyTo: senderEmail || undefined,
      subject: subject,
      html: companyHtml,
      attachments: files,
    })

    // 2. Send Auto-Response Thank You Mail to Customer
    if (senderEmail && /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(senderEmail)) {
      const isEstimate = subject.toLowerCase().includes('estimate')
      const customerSubject = isEstimate
        ? 'Thank You for Your Packaging Estimate Request - Kolli Graphics Private Limited'
        : 'Thank You for Your Inquiry - Kolli Graphics Private Limited'

      const customerHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 18px rgba(0,0,0,0.04);">
    <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 26px 32px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 800;">KOLLI GRAPHICS PRIVATE LIMITED</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #fecaca;">Premier Printing, Packaging &amp; Label Craftsmanship</p>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 15px; margin: 0 0 16px 0; color: #0f172a;">
        Dear <strong>${senderName}</strong>,
      </p>
      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 18px 20px; margin-bottom: 22px;">
        <p style="margin: 0; font-size: 15px; font-weight: 700; color: #166534; line-height: 1.5;">
          Thank you for your interest and someone will get in touch with you within 24 hours.
        </p>
      </div>
      <p style="font-size: 13.5px; color: #475569; line-height: 1.6; margin: 0 0 18px 0;">
        We have successfully received your inquiry through our web portal. Our packaging estimation and technical team are reviewing your requirements and will follow up with you promptly.
      </p>
      <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; margin-top: 16px;">
        <h3 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">
          Summary of Your Submission:
        </h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          ${rowsHtml}
        </table>
      </div>
      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #475569; line-height: 1.6;">
        <p style="margin: 0 0 4px 0; font-weight: 700; color: #0f172a;">Direct Contact Details:</p>
        <p style="margin: 0;">Phone: <a href="tel:+919100199942" style="color: #dc2626; font-weight: 600; text-decoration: none;">+91 91001 99942</a> / <a href="tel:+919849246688" style="color: #dc2626; font-weight: 600; text-decoration: none;">+91 98492 46688</a></p>
        <p style="margin: 3px 0 0 0;">Email: <a href="mailto:info@kolligraphics.com" style="color: #dc2626; font-weight: 600; text-decoration: none;">info@kolligraphics.com</a></p>
      </div>
    </div>
    <div style="background-color: #0f172a; color: #94a3b8; padding: 16px 32px; font-size: 11px; text-align: center;">
      Kolli Graphics Private Limited &bull; Corporate Office: 47 B, S R Nagar, Hyderabad &bull; Works: Cherlapally
    </div>
  </div>
</body>
</html>`

      await transporter.sendMail({
        from: `"Kolli Graphics" <${fromAddress}>`,
        to: senderEmail,
        replyTo: toEmail,
        subject: customerSubject,
        html: customerHtml,
      })
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: true, message: 'Emails delivered successfully via Nodemailer' }))
  } catch (error) {
    console.error('Nodemailer dispatch error:', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, error: error.message || 'Error dispatching email' }))
  }
}
