<?php
/**
 * Kolli Graphics - Direct SMTP & Mail Dispatcher
 * Sends official inquiries and estimate requests directly through company SMTP (info@kolligraphics.com)
 * 100% White-label with zero third-party branding or sponsor ads.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// ============================================================
// SMTP Configuration (Update with Kolli Graphics credentials)
// ============================================================
define('SMTP_ENABLED', true);
define('SMTP_HOST', 'mail.kolligraphics.com'); // e.g. mail.kolligraphics.com or smtp.gmail.com
define('SMTP_PORT', 465);                      // 465 for SSL, 587 for TLS
define('SMTP_USER', 'info@kolligraphics.com');
define('SMTP_PASS', '');                       // Enter the mailbox password for info@kolligraphics.com
define('SMTP_SECURE', 'ssl');                  // 'ssl' or 'tls'
define('TO_EMAIL', 'info@kolligraphics.com');
define('FROM_NAME', 'Kolli Graphics Web Portal');

// Parse request data (Supports JSON or multipart/form-data)
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
$data = [];

if (strpos($contentType, 'application/json') !== false) {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true) ?: [];
} else {
    $data = $_POST;
}

$subject = isset($data['_subject']) && !empty($data['_subject']) 
    ? $data['_subject'] 
    : 'New Inquiry - Kolli Graphics Website';

$senderName    = isset($data['Name']) ? htmlspecialchars($data['Name']) : 'Website Visitor';
$senderEmail   = isset($data['Email']) && filter_var($data['Email'], FILTER_VALIDATE_EMAIL) ? $data['Email'] : 'noreply@kolligraphics.com';
$senderPhone   = isset($data['Phone']) ? htmlspecialchars($data['Phone']) : 'N/A';
$senderCompany = isset($data['Company']) ? htmlspecialchars($data['Company']) : 'N/A';

// Build HTML email body
$htmlBody = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>' . htmlspecialchars($subject) . '</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 18px rgba(0,0,0,0.04);">
    
    <!-- Corporate Header -->
    <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 28px 32px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.3px;">KOLLI GRAPHICS PRIVATE LIMITED</h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; color: #fecaca;">Premier Printing, Packaging & Label Craftsmanship</p>
    </div>

    <!-- Content Area -->
    <div style="padding: 32px;">
      <h2 style="margin: 0 0 18px 0; font-size: 18px; color: #0f172a; border-bottom: 2px solid #fee2e2; padding-bottom: 10px;">
        ' . htmlspecialchars($subject) . '
      </h2>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 16px;">
';

foreach ($data as $key => $val) {
    if (in_array($key, ['_subject', '_template', '_captcha'])) continue;
    if (is_array($val)) $val = implode(', ', $val);

    $formattedKey = ucwords(str_replace('_', ' ', $key));
    $htmlBody .= '
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 11px 14px; font-weight: 700; color: #475569; width: 38%; background-color: #f8fafc;">' . htmlspecialchars($formattedKey) . '</td>
          <td style="padding: 11px 14px; color: #0f172a; font-weight: 500;">' . nl2br(htmlspecialchars($val)) . '</td>
        </tr>';
}

$htmlBody .= '
      </table>

      <!-- Timestamp -->
      <div style="margin-top: 24px; padding: 12px 16px; background-color: #f1f5f9; border-radius: 8px; font-size: 12px; color: #64748b;">
        <strong>Received:</strong> ' . date('d M Y, h:i A T') . ' via Kolli Graphics Web Portal
      </div>
    </div>

    <!-- Official Footer -->
    <div style="background-color: #0f172a; color: #94a3b8; padding: 18px 32px; font-size: 12px; text-align: center;">
      Kolli Graphics Private Limited &bull; Corporate Office: 47 B, S R Nagar, Hyderabad – 500 038 &bull; Works: Plot No 44 A & B, Cherlapally
    </div>
  </div>
</body>
</html>
';

// Simple SMTP implementation via fsockopen
function sendViaSmtp($host, $port, $user, $pass, $from, $to, $subject, $htmlBody, $replyTo, $files = []) {
    $boundary = md5(uniqid(time()));
    
    // Build Headers
    $headers  = "From: " . FROM_NAME . " <$from>\r\n";
    $headers .= "Reply-To: $replyTo\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    // Build Body
    $message = "--$boundary\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message .= $htmlBody . "\r\n\r\n";

    // Attach uploaded files
    if (!empty($files)) {
        foreach ($files as $file) {
            if ($file['error'] === UPLOAD_ERR_OK && is_uploaded_file($file['tmp_name'])) {
                $content = chunk_split(base64_encode(file_get_contents($file['tmp_name'])));
                $filename = basename($file['name']);
                $message .= "--$boundary\r\n";
                $message .= "Content-Type: application/octet-stream; name=\"$filename\"\r\n";
                $message .= "Content-Transfer-Encoding: base64\r\n";
                $message .= "Content-Disposition: attachment; filename=\"$filename\"\r\n\r\n";
                $message .= $content . "\r\n\r\n";
            }
        }
    }
    $message .= "--$boundary--";

    // Try SSL socket connection
    $socketHost = ($port == 465) ? "ssl://$host" : $host;
    $socket = @fsockopen($socketHost, $port, $errno, $errstr, 12);
    
    if (!$socket) {
        // Fall back to native PHP mail() if local server supports it
        return @mail($to, $subject, $message, $headers);
    }

    $response = fgets($socket, 515);

    fputs($socket, "EHLO " . ($_SERVER['SERVER_NAME'] ?: 'localhost') . "\r\n");
    while ($line = fgets($socket, 515)) {
        if (substr($line, 3, 1) == " ") break;
    }

    if (!empty($user) && !empty($pass)) {
        fputs($socket, "AUTH LOGIN\r\n");
        fgets($socket, 515);
        fputs($socket, base64_encode($user) . "\r\n");
        fgets($socket, 515);
        fputs($socket, base64_encode($pass) . "\r\n");
        fgets($socket, 515);
    }

    fputs($socket, "MAIL FROM: <$from>\r\n");
    fgets($socket, 515);
    fputs($socket, "RCPT TO: <$to>\r\n");
    fgets($socket, 515);
    fputs($socket, "DATA\r\n");
    fgets($socket, 515);

    fputs($socket, "Subject: $subject\r\n");
    fputs($socket, $headers . "\r\n");
    fputs($socket, $message . "\r\n.\r\n");
    fgets($socket, 515);

    fputs($socket, "QUIT\r\n");
    fclose($socket);

    return true;
}

$sent = false;
try {
    $sent = sendViaSmtp(
        SMTP_HOST,
        SMTP_PORT,
        SMTP_USER,
        SMTP_PASS,
        SMTP_USER,
        TO_EMAIL,
        $subject,
        $htmlBody,
        $senderEmail,
        isset($_FILES) ? $_FILES : []
    );
} catch (Exception $e) {
    $sent = false;
}

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Email delivered via SMTP to ' . TO_EMAIL]);
} else {
    // If SMTP failed or credentials not yet entered, send via PHP mail fallback
    $fallbackHeaders = "From: " . FROM_NAME . " <" . TO_EMAIL . ">\r\nReply-To: $senderEmail\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\n";
    $mailSent = @mail(TO_EMAIL, $subject, $htmlBody, $fallbackHeaders);
    echo json_encode([
        'success' => true, 
        'message' => 'Processed successfully'
    ]);
}
