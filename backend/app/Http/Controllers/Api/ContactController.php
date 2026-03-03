<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Mail\ContactFormMail;
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
        $validated = $request->validated();

        try {
            // Save to database
            \App\Models\ContactSubmission::create($validated);

            // Send email to admin
            Mail::to(config('mail.admin_address'))
                ->send(new ContactFormMail($validated));

            return response()->json([
                'success' => true,
                'message' => 'Your message has been submitted successfully.',
            ], 200);

        } catch (\Exception $e) {
            Log::error('Contact form email failed', [
                'error' => $e->getMessage(),
                'name'  => $validated['name'],
                'email' => $validated['email'],
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again or email us directly at prominenttechnolabs@gmail.com.',
            ], 500);
        }
    }
}
