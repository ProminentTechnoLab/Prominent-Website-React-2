<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Public form — no auth required
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name'    => 'required|string|min:2|max:100',
            'email'   => 'required|email:rfc,dns|max:150',
            'phone'   => 'nullable|string|min:7|max:20',
            'subject' => 'required|string|min:3|max:200',
            'service' => 'nullable|string|max:500',
            'message' => 'required|string|min:10|max:5000',
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'name.required'    => 'Please let us know your name.',
            'name.min'         => 'Name should be at least 2 characters.',
            'email.required'   => 'We need your email to get back to you.',
            'email.email'      => 'This doesn\'t look like a valid email address.',
            'subject.required' => 'Please provide a brief subject.',
            'message.required' => 'Tell us a bit about what you need.',
            'message.min'      => 'Please provide a bit more detail (at least 10 characters).',
        ];
    }
}
