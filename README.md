# Bizzy B Tumblebus

Simple PHP website with Stripe payments for a mobile gymnastics business.

## Files

- `index.php` - Main landing page with all sections
- `checkout.php` - Stripe payment processing
- `config.php` - Configuration (Stripe keys, products, prices)

## Setup

1. **Upload files** to your HostPapa hosting via FTP or File Manager

2. **Configure Stripe Keys** in `config.php`:
   ```php
   define('STRIPE_SECRET_KEY', 'sk_live_YOUR_SECRET_KEY');
   define('STRIPE_PUBLISHABLE_KEY', 'pk_live_YOUR_PUBLISHABLE_KEY');
   ```

3. **Get Stripe Keys** from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

## Features

- Clean, mobile-responsive design
- Package selection with cart functionality
- Optional add-ons
- Secure Stripe payment processing
- Order confirmation emails via Stripe

## Pricing (configured in config.php)

| Package | Price |
|---------|-------|
| First Time Registration - 1 Child | $70 |
| First Time Registration - 2 Children | $115 |
| 1 Child (Returning) | $50 |
| 2 Children (Returning) | $75 |

### Add-ons
- 1 Week of TUMBLEBUS: $12.50
- Miscellaneous fees: $5, $10, $15, $20

## Requirements

- PHP 7.0+
- cURL extension enabled
- SSL certificate (required for Stripe)

## HostPapa Deployment

1. Log into HostPapa cPanel
2. Go to File Manager
3. Upload all 3 PHP files to `public_html` (or a subdirectory)
4. Make sure PHP is enabled
5. Update `config.php` with your Stripe keys
6. Test with Stripe test keys first!

## Test Cards (Stripe Test Mode)

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Use any future date and any 3-digit CVC

## License

MIT
