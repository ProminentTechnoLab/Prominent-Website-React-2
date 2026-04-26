<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Received | Prominent TechnoLabs</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 60px 20px;">
        <tr>
            <td align="center">

                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; text-align: left;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding-bottom: 60px; border-bottom: 2px solid #000000;">
                            <h1 style="margin: 0; color: #000000; font-size: 28px; font-weight: 500; letter-spacing: -0.04em;">
                                Prominent TechnoLabs
                            </h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 60px 0;">
                            <h2 style="margin: 0 0 30px; color: #000000; font-size: 24px; font-weight: 500; letter-spacing: -0.03em;">
                                Hello {{ $contactData['name'] }},
                            </h2>
                            <p style="margin: 0 0 40px; color: #000000; font-size: 18px; line-height: 1.6; font-weight: 400;">
                                We have successfully received your inquiry. Thank you for considering Prominent TechnoLabs for your project.
                            </p>
                            <p style="margin: 0 0 40px; color: rgba(0,0,0,0.6); font-size: 16px; line-height: 1.6;">
                                Our team of specialists is currently reviewing your requirements. You can expect to hear from us within 24 business hours to discuss the next steps.
                            </p>

                            <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0;">
                                <p style="margin: 0 0 15px; color: rgba(0,0,0,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Summary of your inquiry</p>
                                <p style="margin: 0; color: #000000; font-size: 15px; font-style: italic; line-height: 1.6;">
                                    "{{ Str::limit($contactData['message'], 150) }}"
                                </p>
                            </div>

                            <p style="margin: 60px 0 0; color: #000000; font-size: 16px; font-weight: 500;">
                                Best regards,<br>
                                <span style="font-weight: 400; color: rgba(0,0,0,0.5);">The Prominent Team</span>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding-top: 40px; border-top: 1px solid #eeeeee; text-align: left;">
                            <p style="margin: 0; font-size: 12px; color: rgba(0,0,0,0.4); line-height: 1.6;">
                                This is an automated confirmation of your request.<br>
                                © {{ date('Y') }} Prominent TechnoLabs.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
