<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6fb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

    <!-- Outer wrapper -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6fb; padding: 30px 0;">
        <tr>
            <td align="center">

                <!-- Main card -->
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(10,36,99,0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0A2463 0%, #1a3580 100%); padding: 30px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #FF6600; font-size: 22px; font-weight: 700;">
                                Prominent TechnoLabs
                            </h1>
                            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.7); font-size: 14px;">
                                New Contact Form Inquiry
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 35px 40px;">

                            <!-- Greeting -->
                            <p style="margin: 0 0 20px; color: #1e1f2d; font-size: 15px; line-height: 1.6;">
                                You have received a new inquiry from the website contact form. Here are the details:
                            </p>

                            <!-- Details table -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e8ecf5; border-radius: 8px; overflow: hidden;">

                                <!-- Name -->
                                <tr>
                                    <td style="padding: 12px 16px; background-color: #f8f9fc; font-size: 13px; font-weight: 600; color: #566278; width: 140px; border-bottom: 1px solid #e8ecf5;">
                                        Full Name
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; color: #1e1f2d; border-bottom: 1px solid #e8ecf5;">
                                        {{ $contactData['name'] }}
                                    </td>
                                </tr>

                                <!-- Email -->
                                <tr>
                                    <td style="padding: 12px 16px; background-color: #f8f9fc; font-size: 13px; font-weight: 600; color: #566278; border-bottom: 1px solid #e8ecf5;">
                                        Email
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; color: #1e1f2d; border-bottom: 1px solid #e8ecf5;">
                                        <a href="mailto:{{ $contactData['email'] }}" style="color: #0A2463; text-decoration: none;">
                                            {{ $contactData['email'] }}
                                        </a>
                                    </td>
                                </tr>

                                <!-- Phone -->
                                @if(!empty($contactData['phone']))
                                <tr>
                                    <td style="padding: 12px 16px; background-color: #f8f9fc; font-size: 13px; font-weight: 600; color: #566278; border-bottom: 1px solid #e8ecf5;">
                                        Phone
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; color: #1e1f2d; border-bottom: 1px solid #e8ecf5;">
                                        <a href="tel:{{ $contactData['phone'] }}" style="color: #0A2463; text-decoration: none;">
                                            {{ $contactData['phone'] }}
                                        </a>
                                    </td>
                                </tr>
                                @endif

                                <!-- Service -->
                                @if(!empty($contactData['service']))
                                <tr>
                                    <td style="padding: 12px 16px; background-color: #f8f9fc; font-size: 13px; font-weight: 600; color: #566278; border-bottom: 1px solid #e8ecf5;">
                                        Service Required
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; color: #1e1f2d; border-bottom: 1px solid #e8ecf5;">
                                        <span style="display: inline-block; background: rgba(255,102,0,0.1); color: #FF6600; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">
                                            {{ $contactData['service'] }}
                                        </span>
                                    </td>
                                </tr>
                                @endif

                                <!-- Subject -->
                                <tr>
                                    <td style="padding: 12px 16px; background-color: #f8f9fc; font-size: 13px; font-weight: 600; color: #566278; border-bottom: 1px solid #e8ecf5;">
                                        Subject
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; color: #1e1f2d; border-bottom: 1px solid #e8ecf5;">
                                        {{ $contactData['subject'] }}
                                    </td>
                                </tr>

                                <!-- Message -->
                                <tr>
                                    <td style="padding: 12px 16px; background-color: #f8f9fc; font-size: 13px; font-weight: 600; color: #566278; vertical-align: top;">
                                        Message / Body
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; color: #1e1f2d; line-height: 1.7;">
                                        {!! nl2br(e($contactData['message'])) !!}
                                    </td>
                                </tr>

                            </table>

                            <!-- Quick reply CTA -->
                            <div style="margin-top: 25px; text-align: center;">
                                <a href="mailto:{{ $contactData['email'] }}?subject=Re: Your Inquiry - Prominent TechnoLabs"
                                   style="display: inline-block; background: linear-gradient(135deg, #FF6600, #ff8229); color: #ffffff; padding: 12px 30px; border-radius: 30px; font-size: 14px; font-weight: 600; text-decoration: none; box-shadow: 0 4px 15px rgba(255,102,0,0.3);">
                                    Reply to {{ $contactData['name'] }}
                                </a>
                            </div>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fc; padding: 20px 40px; text-align: center; border-top: 1px solid #e8ecf5;">
                            <p style="margin: 0; font-size: 12px; color: #8892a4;">
                                This email was sent from the contact form on
                                <a href="https://prominenttechnolabs.com" style="color: #0A2463; text-decoration: none;">
                                    prominenttechnolabs.com
                                </a>
                            </p>
                            <p style="margin: 6px 0 0; font-size: 11px; color: #c8d0e4;">
                                © {{ date('Y') }} Prominent TechnoLabs. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
