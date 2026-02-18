<?php
require_once 'config.php';

// Check if cart data exists
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_POST['cart'])) {
    header('Location: index.php');
    exit;
}

$cart = json_decode($_POST['cart'], true);

if (!$cart || !isset($cart['package'])) {
    header('Location: index.php');
    exit;
}

// Calculate total
$total = 0;
$lineItems = [];

// Add package
if ($cart['package']) {
    $total += $cart['package']['price'];
    $lineItems[] = [
        'name' => $cart['package']['name'],
        'price' => $cart['package']['price']
    ];
}

// Add addons
if (!empty($cart['addons'])) {
    foreach ($cart['addons'] as $addon) {
        $total += $addon['price'];
        $lineItems[] = [
            'name' => $addon['name'],
            'price' => $addon['price']
        ];
    }
}

// Handle form submission
$error = '';
$success = false;

if (isset($_POST['stripeToken'])) {
    // Include Stripe PHP library (you need to upload this or use composer)
    // For simplicity, we'll use the Stripe API directly with cURL
    
    $token = $_POST['stripeToken'];
    $email = $_POST['email'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    
    // Create charge via Stripe API
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.stripe.com/v1/charges');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_USERPWD, STRIPE_SECRET_KEY . ':');
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'amount' => $total,
        'currency' => CURRENCY,
        'source' => $token,
        'description' => 'Bizzy B Tumblebus - ' . $cart['package']['name'],
        'receipt_email' => $email,
        'metadata' => [
            'customer_name' => $name,
            'customer_phone' => $phone,
            'package' => $cart['package']['name'],
            'addons' => !empty($cart['addons']) ? implode(', ', array_column($cart['addons'], 'name')) : 'None'
        ]
    ]));
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    $result = json_decode($response, true);
    
    if ($httpCode == 200 && isset($result['id'])) {
        $success = true;
    } else {
        $error = isset($result['error']['message']) ? $result['error']['message'] : 'Payment failed. Please try again.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - <?= BUSINESS_NAME ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <script src="https://js.stripe.com/v3/"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
            --yellow: #FFD93D;
            --yellow-dark: #F4C430;
            --black: #1a1a2e;
            --gray: #4a4a5a;
            --light: #f8f9fa;
            --white: #ffffff;
            --green: #28a745;
            --red: #dc3545;
            --shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        body {
            font-family: 'Nunito', sans-serif;
            color: var(--black);
            line-height: 1.6;
            background: var(--light);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        h1, h2, h3 { font-family: 'Fredoka One', cursive; }
        
        .checkout-container {
            background: var(--white);
            border-radius: 20px;
            box-shadow: var(--shadow);
            max-width: 500px;
            width: 100%;
            overflow: hidden;
        }
        
        .checkout-header {
            background: linear-gradient(135deg, var(--yellow) 0%, var(--yellow-dark) 100%);
            padding: 30px;
            text-align: center;
        }
        
        .checkout-header h1 {
            font-size: 1.8rem;
            color: var(--black);
            margin-bottom: 5px;
        }
        
        .checkout-header p {
            color: var(--gray);
        }
        
        .checkout-body {
            padding: 30px;
        }
        
        .order-summary {
            background: var(--light);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 30px;
        }
        
        .order-summary h3 {
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        
        .order-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
        }
        
        .order-item:last-of-type {
            border-bottom: none;
        }
        
        .order-total {
            display: flex;
            justify-content: space-between;
            padding-top: 15px;
            margin-top: 10px;
            border-top: 2px solid var(--black);
            font-weight: 700;
            font-size: 1.2rem;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--black);
        }
        
        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 1rem;
            font-family: inherit;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: var(--yellow-dark);
        }
        
        #card-element {
            padding: 12px 15px;
            border: 2px solid #ddd;
            border-radius: 10px;
            background: var(--white);
        }
        
        #card-element.StripeElement--focus {
            border-color: var(--yellow-dark);
        }
        
        #card-errors {
            color: var(--red);
            font-size: 0.9rem;
            margin-top: 10px;
        }
        
        .btn {
            display: inline-block;
            padding: 15px 30px;
            border-radius: 50px;
            font-weight: 700;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
            font-size: 1rem;
            width: 100%;
            text-align: center;
        }
        
        .btn-primary {
            background: var(--yellow);
            color: var(--black);
        }
        
        .btn-primary:hover {
            background: var(--yellow-dark);
        }
        
        .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .btn-secondary {
            background: var(--black);
            color: var(--white);
            margin-top: 15px;
        }
        
        .error-message {
            background: #fee;
            border: 1px solid var(--red);
            color: var(--red);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .success-container {
            text-align: center;
            padding: 40px 30px;
        }
        
        .success-icon {
            font-size: 4rem;
            margin-bottom: 20px;
        }
        
        .success-container h2 {
            color: var(--green);
            margin-bottom: 15px;
        }
        
        .success-container p {
            color: var(--gray);
            margin-bottom: 20px;
        }
        
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: var(--gray);
            text-decoration: none;
        }
        
        .back-link:hover {
            color: var(--yellow-dark);
        }
        
        .secure-badge {
            text-align: center;
            margin-top: 20px;
            color: var(--gray);
            font-size: 0.85rem;
        }
        
        .secure-badge span {
            color: var(--green);
        }
    </style>
</head>
<body>
    <div class="checkout-container">
        <?php if ($success): ?>
            <div class="success-container">
                <div class="success-icon">✅</div>
                <h2>Payment Successful!</h2>
                <p>Thank you for your purchase! We've sent a confirmation to your email.</p>
                <p>We'll be in touch soon to schedule your Tumblebus visit! 🚌</p>
                <a href="index.php" class="btn btn-primary">Back to Home</a>
            </div>
        <?php else: ?>
            <div class="checkout-header">
                <h1>🐝 Checkout</h1>
                <p>Complete your registration</p>
            </div>
            
            <div class="checkout-body">
                <?php if ($error): ?>
                    <div class="error-message"><?= htmlspecialchars($error) ?></div>
                <?php endif; ?>
                
                <div class="order-summary">
                    <h3>📋 Order Summary</h3>
                    <?php foreach ($lineItems as $item): ?>
                        <div class="order-item">
                            <span><?= htmlspecialchars($item['name']) ?></span>
                            <span><?= formatPrice($item['price']) ?></span>
                        </div>
                    <?php endforeach; ?>
                    <div class="order-total">
                        <span>Total</span>
                        <span><?= formatPrice($total) ?></span>
                    </div>
                </div>
                
                <form action="checkout.php" method="POST" id="payment-form">
                    <input type="hidden" name="cart" value='<?= htmlspecialchars($_POST['cart']) ?>'>
                    
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" required placeholder="John Doe">
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required placeholder="john@example.com">
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" required placeholder="(555) 123-4567">
                    </div>
                    
                    <div class="form-group">
                        <label for="card-element">Card Details</label>
                        <div id="card-element"></div>
                        <div id="card-errors" role="alert"></div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" id="submit-btn">
                        Pay <?= formatPrice($total) ?>
                    </button>
                    
                    <a href="index.php" class="btn btn-secondary">← Back to Packages</a>
                    
                    <div class="secure-badge">
                        <span>🔒</span> Secure payment powered by Stripe
                    </div>
                </form>
            </div>
        <?php endif; ?>
    </div>
    
    <?php if (!$success): ?>
    <script>
        // Initialize Stripe
        var stripe = Stripe('<?= STRIPE_PUBLISHABLE_KEY ?>');
        var elements = stripe.elements();
        
        // Create card element
        var style = {
            base: {
                fontSize: '16px',
                color: '#1a1a2e',
                fontFamily: '"Nunito", sans-serif',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#dc3545',
                iconColor: '#dc3545'
            }
        };
        
        var card = elements.create('card', { style: style });
        card.mount('#card-element');
        
        // Handle errors
        card.on('change', function(event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });
        
        // Handle form submission
        var form = document.getElementById('payment-form');
        var submitBtn = document.getElementById('submit-btn');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
            
            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Pay <?= formatPrice($total) ?>';
                } else {
                    // Add token to form and submit
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'stripeToken');
                    hiddenInput.setAttribute('value', result.token.id);
                    form.appendChild(hiddenInput);
                    form.submit();
                }
            });
        });
    </script>
    <?php endif; ?>
</body>
</html>
