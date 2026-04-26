<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Inquiry | Prominent TechnoLabs</title>
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
                            <p style="margin: 5px 0 0; color: rgba(0,0,0,0.5); font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">
                                New Project Inquiry
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 60px 0;">
                            <p style="margin: 0 0 40px; color: #000000; font-size: 18px; line-height: 1.6; font-weight: 400;">
                                Hello Admin,<br>
                                You have received a new inquiry from the contact form.
                            </p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding: 20px 0; border-bottom: 1px solid #eeeeee;">
                                        <p style="margin: 0; color: rgba(0,0,0,0.4); font-size: 12px; text-transform: uppercase;">Name</p>
                                        <p style="margin: 5px 0 0; color: #000000; font-size: 16px;">{{ $contactData['name'] }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0; border-bottom: 1px solid #eeeeee;">
                                        <p style="margin: 0; color: rgba(0,0,0,0.4); font-size: 12px; text-transform: uppercase;">Email Address</p>
                                        <p style="margin: 5px 0 0; color: #000000; font-size: 16px;">
                                            <a href="mailto:{{ $contactData['email'] }}" style="color: #000000; text-decoration: none; border-bottom: 1px solid #cccccc;">{{ $contactData['email'] }}</a>
                                        </p>
                                    </td>
                                </tr>
                                @if(!empty($contactData['phone']))
                                <tr>
                                    <td style="padding: 20px 0; border-bottom: 1px solid #eeeeee;">
                                        <p style="margin: 0; color: rgba(0,0,0,0.4); font-size: 12px; text-transform: uppercase;">Phone</p>
                                        <p style="margin: 5px 0 0; color: #000000; font-size: 16px;">{{ $contactData['phone'] }}</p>
                                    </td>
                                </tr>
                                @endif
                                @if(!empty($contactData['service']))
                                <tr>
                                    <td style="padding: 20px 0; border-bottom: 1px solid #eeeeee;">
                                        <p style="margin: 0; color: rgba(0,0,0,0.4); font-size: 12px; text-transform: uppercase;">Interests</p>
                                        <p style="margin: 5px 0 0; color: #000000; font-size: 16px;">{{ $contactData['service'] }}</p>
                                    </td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="padding: 20px 0; border-bottom: 1px solid #eeeeee;">
                                        <p style="margin: 0; color: rgba(0,0,0,0.4); font-size: 12px; text-transform: uppercase;">Subject</p>
                                        <p style="margin: 5px 0 0; color: #000000; font-size: 16px;">{{ $contactData['subject'] }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 40px 0;">
                                        <p style="margin: 0; color: rgba(0,0,0,0.4); font-size: 12px; text-transform: uppercase;">Project Description</p>
                                        <p style="margin: 15px 0 0; color: #000000; font-size: 16px; line-height: 1.8;">
                                            {!! nl2br(e($contactData['message'])) !!}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <div style="margin-top: 60px;">
                                <a href="mailto:{{ $contactData['email'] }}" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 20px 40px; text-decoration: none; border-radius: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">
                                    Reply to Prospect
                                </a>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding-top: 40px; border-top: 1px solid #eeeeee; text-align: left;">
                            <p style="margin: 0; font-size: 12px; color: rgba(0,0,0,0.4); line-height: 1.6;">
                                Received from prominenttechnolabs.com<br>
                                &copy; {{ date('Y') }} Prominent TechnoLabs. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
