# Prominent TechnoLabs - Backend API

This is the Laravel-based backend for the Prominent TechnoLabs website contact form.

## API Endpoints

- `POST /api/contact` - Submit a contact inquiry.
- `GET /api/health` - Health check endpoint.

## Configuration

- Database: MySQL (`prominent_db`)
- Mail: SMTP configured via `.env` (Currently set to `log` for local testing)

## Key Components

- **Controller**: `app/Http/Controllers/Api/ContactController.php`
- **Model**: `app/Models/ContactSubmission.php`
- **Mailable**: `app/Mail/ContactFormMail.php`
- **Email Template**: `resources/views/emails/contact.blade.php`

## Local Setup

1. Copy `.env.example` to `.env`.
2. Generate app key: `php artisan key:generate`.
3. Create a MySQL database named `prominent_db`.
4. Run migrations: `php artisan migrate`.
5. Start local server (Laragon).
