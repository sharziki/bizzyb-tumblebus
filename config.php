<?php
/**
 * Bizzy B Tumblebus - Configuration
 * 
 * Replace with your actual Stripe keys before going live!
 */

// Stripe API Keys (TEST MODE - replace with live keys for production)
define('STRIPE_SECRET_KEY', 'sk_test_YOUR_SECRET_KEY_HERE');
define('STRIPE_PUBLISHABLE_KEY', 'pk_test_YOUR_PUBLISHABLE_KEY_HERE');

// Business Info
define('BUSINESS_NAME', 'Bizzy B Tumblebus');
define('BUSINESS_EMAIL', 'info@bizzybtrumblebus.com');
define('BUSINESS_PHONE', '(555) 123-4567');

// Currency
define('CURRENCY', 'usd');

// Products/Packages
$PACKAGES = [
    'first_time_1' => [
        'name' => 'First Time Registration - 1 Child',
        'description' => 'Gymnastic lessons for 1 child with registration',
        'price' => 7000, // in cents
        'children' => 1
    ],
    'first_time_2' => [
        'name' => 'First Time Registration - 2 Children',
        'description' => 'Gymnastic lessons for 2 children with registration',
        'price' => 11500,
        'children' => 2
    ],
    'returning_1' => [
        'name' => '1 Child (Returning)',
        'description' => 'Gymnastic lessons for 1 child - already registered',
        'price' => 5000,
        'children' => 1
    ],
    'returning_2' => [
        'name' => '2 Children (Returning)',
        'description' => 'Gymnastic lessons for 2 children - already registered',
        'price' => 7500,
        'children' => 2
    ]
];

// Add-ons
$ADDONS = [
    'tumblebus_week' => [
        'name' => '1 Week of TUMBLEBUS',
        'price' => 1250
    ],
    'misc_5' => [
        'name' => 'Miscellaneous Fee ($5)',
        'price' => 500
    ],
    'misc_10' => [
        'name' => 'Miscellaneous Fee ($10)',
        'price' => 1000
    ],
    'misc_15' => [
        'name' => 'Miscellaneous Fee ($15)',
        'price' => 1500
    ],
    'misc_20' => [
        'name' => 'Miscellaneous Fee ($20)',
        'price' => 2000
    ]
];

// Helper function to format price
function formatPrice($cents) {
    return '$' . number_format($cents / 100, 2);
}
?>
