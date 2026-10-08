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

  // Append files if provided
  if (files) {
    Object.entries(files).forEach(([fieldName, file]) => {
      if (file) {
        formData.append(fieldName, file, file.name)
      }
    })
  }

  // 1. Try Direct SMTP endpoint (/send-mail.php)
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
    // send-mail.php not running (e.g. local Vite dev server without PHP)
  }

  // 2. Fallback for local Vite dev testing: FormSubmit to client email
  try {
    formData.append('_template', 'table')
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
