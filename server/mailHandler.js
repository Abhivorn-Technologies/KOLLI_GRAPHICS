import nodemailer from 'nodemailer'
import Busboy from 'busboy'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../.env')

// Use official website logo from src/assets/logo/kolli-logo.png or public/assets/logo/kolli-logo.png
function getLogoBuffer() {
  const possiblePaths = [
    path.resolve(__dirname, '../src/assets/logo/kolli-logo.png'),
    path.resolve(__dirname, '../public/assets/logo/kolli-logo.png'),
  ]
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        return fs.readFileSync(p)
      } catch (e) {
        // continue
      }
    }
  }
  return null
}

/**
 * Reads SMTP credentials dynamically from process.env (Vercel) or .env file (Local)
 */
function getEnvConfig() {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: true })
  }
  return {
    host: (process.env.SMTP_HOST || 'smtp.gmail.com').trim(),
    port: Number(process.env.SMTP_PORT || 465),
    secure: (process.env.SMTP_SECURE || 'true').trim().toLowerCase() === 'true' || Number(process.env.SMTP_PORT) === 465,
    user: (process.env.SMTP_USER || 'info@kolligraphics.com').trim(),
    pass: (process.env.SMTP_PASS || '').replace(/\s+/g, ''),
    toEmail: (process.env.TO_EMAIL || 'info@kolligraphics.com').trim(),
  }
}

let cachedTransporter = null
let lastConfigHash = ''

function getTransporter(config) {
  const configHash = `${config.host}:${config.port}:${config.user}:${config.pass}:${config.secure}`
  if (cachedTransporter && lastConfigHash === configHash) {
    return cachedTransporter
  }

  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  })
  lastConfigHash = configHash
  return cachedTransporter
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
    const config = getEnvConfig()
    const toEmail = config.toEmail
    const fromAddress = config.user

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
    <!-- White Header with Real Logo & Company Branding -->
    <div style="background-color: #ffffff; padding: 26px 32px 20px 32px; border-bottom: 2px solid #fee2e2; text-align: center;">
      <img src="cid:kollilogo" alt="Kolli Graphics Logo" style="height: 64px; max-width: 240px; object-fit: contain; display: inline-block; margin-bottom: 10px;" />
      <h1 style="margin: 0; font-size: 19px; font-weight: 800; color: #dc2626; letter-spacing: -0.2px;">KOLLI GRAPHICS PRIVATE LIMITED</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 700; color: #475569;">Premier Printing, Packaging &amp; Label Craftsmanship</p>
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
    <div style="background-color: #0f172a; color: #94a3b8; padding: 16px 32px; font-size: 11px; text-align: center;">
      Kolli Graphics Private Limited &bull; Email: <a href="mailto:${toEmail}" style="color: #f87171; text-decoration: none; font-weight: 600;">${toEmail}</a> &bull; Corporate Office: 47 B, S R Nagar, Hyderabad &bull; Works: Cherlapally
    </div>
  </div>
</body>
</html>`

    const transporter = getTransporter(config)
    const logoBuffer = getLogoBuffer()

    // Prepare embedded CID logo attachment
    const logoAttachment = logoBuffer
      ? [
          {
            filename: 'kolli-logo.png',
            content: logoBuffer,
            cid: 'kollilogo', // Content-ID referenced via <img src="cid:kollilogo" />
          },
        ]
      : []

    // 1. Send Lead with customer details to Kolli Graphics (info@kolligraphics.com)
    await transporter.sendMail({
      from: `"Kolli Graphics Web Portal" <${fromAddress}>`,
      to: toEmail,
      replyTo: senderEmail || undefined,
      subject: subject,
      html: companyHtml,
      attachments: [...files, ...logoAttachment],
    })

    // 2. Send Acknowledgement / Thank You Email to the Customer
    const normalizedSenderEmail = senderEmail.trim()
    if (normalizedSenderEmail && /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(normalizedSenderEmail)) {
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
    <!-- White Header with Real Logo & Company Branding -->
    <div style="background-color: #ffffff; padding: 26px 32px 20px 32px; border-bottom: 2px solid #fee2e2; text-align: center;">
      <img src="cid:kollilogo" alt="Kolli Graphics Logo" style="height: 64px; max-width: 240px; object-fit: contain; display: inline-block; margin-bottom: 10px;" />
      <h1 style="margin: 0; font-size: 19px; font-weight: 800; color: #dc2626; letter-spacing: -0.2px;">KOLLI GRAPHICS PRIVATE LIMITED</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 700; color: #475569;">Premier Printing, Packaging &amp; Label Craftsmanship</p>
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
        We have received your inquiry through our web portal. Our packaging estimation and technical team are reviewing your requirements and will follow up with you promptly.
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
        <p style="margin: 0 0 6px 0; font-weight: 700; color: #0f172a;">Direct Contact Details:</p>
        <p style="margin: 0;">Phone: <a href="tel:+919100199942" style="color: #dc2626; font-weight: 600; text-decoration: none;">+91 91001 99942</a> / <a href="tel:+919849246688" style="color: #dc2626; font-weight: 600; text-decoration: none;">+91 98492 46688</a></p>
        <p style="margin: 4px 0 0 0;">Email: <a href="mailto:${toEmail}" style="color: #dc2626; font-weight: 600; text-decoration: none;">${toEmail}</a></p>
      </div>
    </div>
    <div style="background-color: #0f172a; color: #94a3b8; padding: 16px 32px; font-size: 11px; text-align: center;">
      Kolli Graphics Private Limited &bull; Email: <a href="mailto:${toEmail}" style="color: #f87171; text-decoration: none; font-weight: 600;">${toEmail}</a> &bull; Corporate Office: 47 B, S R Nagar, Hyderabad &bull; Works: Cherlapally
    </div>
  </div>
</body>
</html>`

      await transporter.sendMail({
        from: `"Kolli Graphics" <${fromAddress}>`,
        to: normalizedSenderEmail,
        replyTo: toEmail,
        subject: customerSubject,
        html: customerHtml,
        attachments: logoAttachment,
      })
    } else {
      console.warn('Skipping acknowledgement: sender email is missing or invalid:', senderEmail)
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: true, message: 'Details and acknowledgement delivered successfully' }))
  } catch (error) {
    console.error('Nodemailer dispatch error:', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, error: error.message || 'Error dispatching email' }))
  }
}
