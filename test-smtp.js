import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const host = process.env.SMTP_HOST || 'smtp.gmail.com'
const port = Number(process.env.SMTP_PORT || 465)
const user = (process.env.SMTP_USER || '').trim()
const rawPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '')
const toEmail = (process.env.TO_EMAIL || user).trim()

console.log('--- Kolli Graphics SMTP Diagnostic Test ---')
console.log(`Host: ${host}`)
console.log(`Port: ${port}`)
console.log(`User: ${user}`)
console.log(`Password: ${rawPass.substring(0, 3)}... (length: ${rawPass.length} chars)`)
console.log(`Recipient: ${toEmail}`)

if (!user || !rawPass) {
  console.error('\nERROR: SMTP_USER or SMTP_PASS is missing in .env')
  process.exit(1)
}

// Google App Passwords are strictly 16 letters. If 17 chars and starts with '1', test both.
const candidatePasswords = [rawPass]
if (rawPass.length === 17 && rawPass.startsWith('1')) {
  candidatePasswords.push(rawPass.substring(1))
}

let connected = false

for (const passCandidate of candidatePasswords) {
  console.log(`\nTesting password candidate (${passCandidate.length} characters)...`)
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: passCandidate },
  })

  try {
    await transporter.verify()
    console.log(`✔ SUCCESS: Connected & verified with Google using password (${passCandidate.length} chars)!`)

    console.log(`Sending test email to ${toEmail}...`)
    const info = await transporter.sendMail({
      from: `"Kolli Graphics Test" <${user}>`,
      to: toEmail,
      subject: '✔ Kolli Graphics Website - SMTP Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #dc2626;">SMTP Connection Verified!</h2>
          <p>This is a test email from your Kolli Graphics website project.</p>
          <p><strong>Status:</strong> Your Google App Password is working perfectly and ready for contact and estimating forms!</p>
          <p style="color: #6b7280; font-size: 12px;">Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `,
    })

    console.log(`✔ TEST EMAIL SENT SUCCESSFULLY! Message ID: ${info.messageId}`)
    console.log(`Please check your inbox at: ${toEmail}`)
    connected = true
    break
  } catch (err) {
    console.warn(`Attempt with ${passCandidate.length}-char password failed: ${err.message}`)
  }
}

if (!connected) {
  console.error('\n❌ All attempts failed. Please verify 2-Step Verification and App Password.')
}
