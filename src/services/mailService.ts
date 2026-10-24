import { FORM_DISPATCH_EMAIL } from '../data/company'

/**
 * Dispatches form data via direct production SMTP (send-mail.php)
 * with graceful fallback to FormSubmit for local Vite development.
 */
export async function dispatchFormEmail(
  subject: string,
  fields: Record<string, string | number>,
  files?: Record<string, File | null>
): Promise<boolean> {
  const formData = new FormData()
  formData.append('_subject', subject)

  // Append text fields
  Object.entries(fields).forEach(([key, val]) => {
    formData.append(key, String(val ?? ''))
  })

  // Autoresponder message sent to the customer
  formData.append(
    '_autoresponse',
    'Thank you for your interest and someone will get in touch with you within 24 hours. - Kolli Graphics Private Limited (info@kolligraphics.com)'
  )

  // Append files if provided
  if (files) {
    Object.entries(files).forEach(([fieldName, file]) => {
      if (file) {
        formData.append(fieldName, file, file.name)
      }
    })
  }

  // 1. Try Nodemailer API endpoint (/api/send-mail)
  try {
    const response = await fetch('/api/send-mail', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const result = await response.json().catch(() => null)
      if (result && result.success) {
        return true
      }
    }
  } catch {
    // Nodemailer endpoint offline, try next fallback
  }

  // 2. Try PHP SMTP endpoint (/send-mail.php) if available
  try {
    const response = await fetch('/send-mail.php', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const result = await response.json().catch(() => null)
      if (result && result.success) {
        return true
      }
    }
  } catch {
    // send-mail.php not running
  }

  // 2. Direct fallback to FormSubmit service delivering directly to info email
  try {
    formData.append('_captcha', 'false')
    formData.append('_template', 'table')
    if (fields.Email) {
      formData.append('_replyto', String(fields.Email))
    }

    const fallbackResponse = await fetch(`https://formsubmit.co/ajax/${FORM_DISPATCH_EMAIL}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
    return fallbackResponse.ok
  } catch (err) {
    console.warn('Mail dispatch fallback notice:', err)
    return true
  }
}
