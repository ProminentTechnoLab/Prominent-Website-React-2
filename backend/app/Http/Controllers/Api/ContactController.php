<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Mail\ContactFormMail;
use App\Mail\ContactReceiptMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    /**
     * Handle contact form submission.
     *
     * Validates the input, sends an email to the admin,
     * and returns a JSON response.
     */
    public function submit(ContactRequest $request)
    {
        // 1. Honeypot Check (Spam protection)
        if ($request->has('website_url') && !empty($request->website_url)) {
            Log::info('Spam attempt blocked via honeypot', ['email' => $request->email]);
            return response()->json(['success' => true, 'message' => 'Message sent successfully.'], 200); // Decoy success
        }

        $validated = $request->validated();

        try {
            // 2. Save to database
            \App\Models\ContactSubmission::create($validated);

            // 3. Send email to admin
            Mail::to(config('mail.admin_address'))
                ->send(new ContactFormMail($validated));

            return response()->json([
                'success' => true,
                'message' => 'Thank you! Your message has been submitted successfully.',
                'data'    => $validated
            ], 200);

        } catch (\Exception $e) {
            Log::error('Contact form processing failed', [
                'exception' => $e->getMessage(),
                'input'     => $request->except(['phone']),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'We encountered a technical issue while processing your request. Please try again or contact us at prominenttechnolabs@gmail.com.',
            ], 500);
        }
    }
}
