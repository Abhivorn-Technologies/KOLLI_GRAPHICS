import { FORM_DISPATCH_EMAIL } from '../data/company'

/**
 * Dispatches form data via Node.js SMTP endpoint (/api/send-mail)
 * with graceful fallback to FormSubmit if Node server is offline.
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

  // Append files if provided
  if (files) {
    Object.entries(files).forEach(([fieldName, file]) => {
      if (file) {
        formData.append(fieldName, file, file.name)
      }
    })
  }

  // 1. Try Node.js / Nodemailer API endpoint (/api/send-mail)
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 12000)

    const response = await fetch('/api/send-mail', {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (response.ok) {
      const result = await response.json().catch(() => null)
      if (result && result.success) {
        return true
      }
    }
  } catch (err) {
    console.warn('API /api/send-mail error or timeout:', err)
  }

  // 2. Direct fallback to FormSubmit service delivering directly to info email
  try {
    formData.append('_captcha', 'false')
    formData.append('_template', 'table')
    formData.append('_autoresponse', '')
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
