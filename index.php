<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= BUSINESS_NAME ?> | Mobile Gymnastics Fun</title>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
            --yellow: #FFD93D;
            --yellow-dark: #F4C430;
            --black: #1a1a2e;
            --gray: #4a4a5a;
            --light: #f8f9fa;
            --white: #ffffff;
            --shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        body {
            font-family: 'Nunito', sans-serif;
            color: var(--black);
            line-height: 1.6;
            background: var(--light);
        }
        
        h1, h2, h3 { font-family: 'Fredoka One', cursive; }
        
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* Navigation */
        nav {
            background: var(--white);
            padding: 15px 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: var(--shadow);
        }
        nav .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-family: 'Fredoka One', cursive;
            font-size: 1.5rem;
            color: var(--black);
            text-decoration: none;
        }
        .logo span { color: var(--yellow-dark); }
        nav ul {
            display: flex;
            list-style: none;
            gap: 30px;
        }
        nav a {
            text-decoration: none;
            color: var(--gray);
            font-weight: 600;
            transition: color 0.3s;
        }
        nav a:hover { color: var(--yellow-dark); }
        
        /* Hero */
        .hero {
            background: linear-gradient(135deg, var(--yellow) 0%, var(--yellow-dark) 100%);
            padding: 150px 0 80px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .hero::before {
            content: '🐝';
            position: absolute;
            font-size: 200px;
            opacity: 0.1;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .hero h1 {
            font-size: 3.5rem;
            color: var(--black);
            margin-bottom: 20px;
        }
        .hero p {
            font-size: 1.3rem;
            color: var(--gray);
            margin-bottom: 30px;
        }
        .hero-badge {
            display: inline-block;
            background: var(--white);
            padding: 10px 25px;
            border-radius: 50px;
            font-weight: 700;
            color: var(--black);
            box-shadow: var(--shadow);
        }
        
        /* Sections */
        section { padding: 80px 0; }
        .section-title {
            text-align: center;
            margin-bottom: 50px;
        }
        .section-title h2 {
            font-size: 2.5rem;
            color: var(--black);
            margin-bottom: 15px;
        }
        .section-title p { color: var(--gray); font-size: 1.1rem; }
        
        /* Services Grid */
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        .service-card {
            background: var(--white);
            padding: 40px 30px;
            border-radius: 20px;
            text-align: center;
            box-shadow: var(--shadow);
            transition: transform 0.3s;
        }
        .service-card:hover { transform: translateY(-5px); }
        .service-card .icon {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        .service-card h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: var(--black);
        }
        .service-card p { color: var(--gray); }
        
        /* Equipment */
        .equipment-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
        }
        .equipment-item {
            background: var(--white);
            padding: 25px 15px;
            border-radius: 15px;
            text-align: center;
            box-shadow: var(--shadow);
        }
        .equipment-item .icon { font-size: 2rem; margin-bottom: 10px; }
        .equipment-item h4 { font-size: 1rem; color: var(--black); margin-bottom: 5px; }
        .equipment-item p { font-size: 0.85rem; color: var(--gray); }
        
        /* Testimonials */
        .testimonials { background: var(--white); }
        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        .testimonial {
            background: var(--light);
            padding: 30px;
            border-radius: 20px;
            border-left: 4px solid var(--yellow);
        }
        .testimonial p { font-style: italic; margin-bottom: 20px; color: var(--gray); }
        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .testimonial-author .avatar {
            width: 50px;
            height: 50px;
            background: var(--yellow);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: var(--black);
        }
        .testimonial-author strong { display: block; color: var(--black); }
        .testimonial-author span { font-size: 0.85rem; color: var(--gray); }
        
        /* Packages */
        .packages { background: linear-gradient(135deg, #fef9e7 0%, #fff 100%); }
        .packages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-bottom: 50px;
        }
        .package-card {
            background: var(--white);
            border-radius: 20px;
            padding: 30px;
            box-shadow: var(--shadow);
            position: relative;
            overflow: hidden;
        }
        .package-card.featured {
            border: 3px solid var(--yellow);
        }
        .package-card.featured::before {
            content: 'POPULAR';
            position: absolute;
            top: 15px;
            right: -30px;
            background: var(--yellow);
            padding: 5px 40px;
            font-size: 0.75rem;
            font-weight: 700;
            transform: rotate(45deg);
        }
        .package-card h3 { font-size: 1.1rem; margin-bottom: 10px; }
        .package-card .price {
            font-family: 'Fredoka One', cursive;
            font-size: 2.5rem;
            color: var(--black);
            margin-bottom: 15px;
        }
        .package-card p { color: var(--gray); font-size: 0.9rem; margin-bottom: 20px; }
        .package-card .details { font-size: 0.85rem; color: var(--gray); margin-bottom: 20px; }
        
        /* Addons */
        .addons-section { margin-top: 50px; }
        .addons-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;
        }
        .addon-item {
            background: var(--white);
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: var(--shadow);
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .addon-item label {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
        }
        .addon-item input[type="checkbox"] {
            width: 20px;
            height: 20px;
            accent-color: var(--yellow-dark);
        }
        
        /* Cart */
        .cart {
            background: var(--white);
            border-radius: 20px;
            padding: 30px;
            box-shadow: var(--shadow);
            max-width: 500px;
            margin: 50px auto 0;
        }
        .cart h3 {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
        }
        .cart-items { min-height: 100px; }
        .cart-empty { text-align: center; color: var(--gray); padding: 30px; }
        .cart-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid var(--light);
        }
        .cart-total {
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            font-weight: 700;
            font-size: 1.2rem;
            border-top: 2px solid var(--black);
            margin-top: 10px;
        }
        
        /* Buttons */
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
        }
        .btn-primary {
            background: var(--yellow);
            color: var(--black);
        }
        .btn-primary:hover {
            background: var(--yellow-dark);
            transform: translateY(-2px);
        }
        .btn-secondary {
            background: var(--black);
            color: var(--white);
        }
        .btn-secondary:hover { background: var(--gray); }
        .btn-outline {
            background: transparent;
            border: 2px solid var(--black);
            color: var(--black);
        }
        .btn-outline:hover {
            background: var(--black);
            color: var(--white);
        }
        .btn-small { padding: 10px 20px; font-size: 0.9rem; }
        .btn-block { display: block; width: 100%; text-align: center; }
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        /* Safety Banner */
        .safety-banner {
            background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            margin-top: 50px;
        }
        .safety-banner h3 { color: #2e7d32; margin-bottom: 10px; }
        .safety-banner p { color: #388e3c; }
        
        /* Footer */
        footer {
            background: var(--black);
            color: var(--white);
            padding: 50px 0 30px;
            text-align: center;
        }
        footer h3 { color: var(--yellow); margin-bottom: 20px; }
        footer p { color: #aaa; margin-bottom: 10px; }
        footer a { color: var(--yellow); text-decoration: none; }
        footer a:hover { text-decoration: underline; }
        .footer-bottom {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #333;
            font-size: 0.9rem;
            color: #666;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            nav ul { display: none; }
            .packages-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="container">
            <a href="#" class="logo">Bizzy <span>B</span> Tumblebus</a>
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#testimonials">Reviews</a></li>
                <li><a href="#packages">Packages</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
        <div class="container">
            <p>🐝 Mobile Gymnastics Fun for Kids</p>
            <h1>We Bring the GYM<br>to YOU!</h1>
            <p>The Tumblebus is a full-sized school bus converted into a safe, fun, child-sized gym!<br>Perfect for daycares, schools, birthday parties & special events.</p>
            <div class="hero-badge">🚌 TUMBLEBUS · Ages 2–10</div>
        </div>
    </section>

    <!-- About -->
    <section id="about">
        <div class="container">
            <div class="section-title">
                <h2>Welcome to the TUMBLEBUS!</h2>
                <p>We have a unique and fun way to keep your little ones happy and fit.</p>
            </div>
            <div class="services-grid">
                <div class="service-card">
                    <div class="icon">🏫</div>
                    <h3>Daycares & Schools</h3>
                    <p>We bring physical education right to your facility! Kids get exercise without leaving the premises.</p>
                </div>
                <div class="service-card">
                    <div class="icon">🎂</div>
                    <h3>Birthday Parties</h3>
                    <p>Make your child's birthday unforgettable with our mobile gym party experience!</p>
                </div>
                <div class="service-card">
                    <div class="icon">🎪</div>
                    <h3>Special Events</h3>
                    <p>Festivals, community events, church gatherings — we add fun to any occasion!</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services -->
    <section id="services" style="background: var(--white);">
        <div class="container">
            <div class="section-title">
                <h2>Our Equipment</h2>
                <p>Everything a kid needs to tumble, jump, and play!</p>
            </div>
            <div class="equipment-grid">
                <div class="equipment-item">
                    <div class="icon">🐒</div>
                    <h4>Monkey Bars</h4>
                    <p>Upper body strength</p>
                </div>
                <div class="equipment-item">
                    <div class="icon">🎪</div>
                    <h4>Trampoline</h4>
                    <p>Safe bouncing fun</p>
                </div>
                <div class="equipment-item">
                    <div class="icon">🤸</div>
                    <h4>Tumbling Mats</h4>
                    <p>Soft landing zones</p>
                </div>
                <div class="equipment-item">
                    <div class="icon">⚖️</div>
                    <h4>Balance Beam</h4>
                    <p>Coordination skills</p>
                </div>
                <div class="equipment-item">
                    <div class="icon">🏋️</div>
                    <h4>Mini Vault</h4>
                    <p>Confidence building</p>
                </div>
                <div class="equipment-item">
                    <div class="icon">⭕</div>
                    <h4>Rings</h4>
                    <p>Grip strength</p>
                </div>
                <div class="equipment-item">
                    <div class="icon">🛝</div>
                    <h4>Slide</h4>
                    <p>Classic fun</p>
                </div>
                <div class="equipment-item">
                    <div class="icon">🧗</div>
                    <h4>Climbing Wall</h4>
                    <p>Adventure awaits</p>
                </div>
            </div>
            <div class="safety-banner">
                <h3>🛡️ Safety First!</h3>
                <p>All equipment is child-sized and safety-tested. Our certified instructors supervise all activities. The bus is climate-controlled for year-round comfort!</p>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="testimonials">
        <div class="container">
            <div class="section-title">
                <h2>What Parents Say</h2>
            </div>
            <div class="testimonial-grid">
                <div class="testimonial">
                    <p>"My kids LOVE Tumblebus day! They talk about it all week. Best decision we made for our facility!"</p>
                    <div class="testimonial-author">
                        <div class="avatar">S</div>
                        <div>
                            <strong>Sarah M.</strong>
                            <span>Daycare Owner</span>
                        </div>
                    </div>
                </div>
                <div class="testimonial">
                    <p>"We had the Tumblebus for my daughter's 5th birthday. The kids had a blast and the staff was amazing!"</p>
                    <div class="testimonial-author">
                        <div class="avatar">J</div>
                        <div>
                            <strong>Jennifer T.</strong>
                            <span>Parent</span>
                        </div>
                    </div>
                </div>
                <div class="testimonial">
                    <p>"Professional, fun, and the kids get great exercise. Highly recommend for any school or daycare!"</p>
                    <div class="testimonial-author">
                        <div class="avatar">A</div>
                        <div>
                            <strong>Amanda R.</strong>
                            <span>School Administrator</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Packages -->
    <section id="packages" class="packages">
        <div class="container">
            <div class="section-title">
                <h2>Choose Your Package</h2>
                <p>Select the package that works best for your family</p>
            </div>
            
            <div class="packages-grid">
                <?php foreach ($PACKAGES as $id => $package): ?>
                <div class="package-card <?= $id === 'first_time_1' ? 'featured' : '' ?>">
                    <h3><?= $package['name'] ?></h3>
                    <div class="price"><?= formatPrice($package['price']) ?></div>
                    <p><?= $package['description'] ?></p>
                    <div class="details">👶 <?= $package['children'] ?> child<?= $package['children'] > 1 ? 'ren' : '' ?></div>
                    <button class="btn btn-primary btn-block btn-small add-package" data-id="<?= $id ?>" data-name="<?= htmlspecialchars($package['name']) ?>" data-price="<?= $package['price'] ?>">
                        Add to Cart
                    </button>
                </div>
                <?php endforeach; ?>
            </div>

            <div class="addons-section">
                <div class="section-title">
                    <h3>Add-ons (Optional)</h3>
                </div>
                <div class="addons-grid">
                    <?php foreach ($ADDONS as $id => $addon): ?>
                    <div class="addon-item">
                        <label>
                            <input type="checkbox" class="addon-checkbox" data-id="<?= $id ?>" data-name="<?= htmlspecialchars($addon['name']) ?>" data-price="<?= $addon['price'] ?>">
                            <span><?= $addon['name'] ?> - <?= formatPrice($addon['price']) ?></span>
                        </label>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Cart -->
            <div class="cart">
                <h3>🛒 Your Cart</h3>
                <div class="cart-items" id="cart-items">
                    <div class="cart-empty">Your cart is empty. Add packages above to get started!</div>
                </div>
                <div class="cart-total" id="cart-total" style="display: none;">
                    <span>Total:</span>
                    <span id="total-amount">$0.00</span>
                </div>
                <form action="checkout.php" method="POST" id="checkout-form">
                    <input type="hidden" name="cart" id="cart-data">
                    <button type="submit" class="btn btn-secondary btn-block" id="checkout-btn" disabled>
                        Proceed to Checkout
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section id="contact">
        <div class="container" style="text-align: center;">
            <div class="section-title">
                <h2>Ready to Buzz the Fun?</h2>
                <p>Enroll today and give your kids the gift of fitness and fun!</p>
            </div>
            <p style="font-size: 1.2rem; margin-bottom: 20px;">
                📞 <a href="tel:<?= BUSINESS_PHONE ?>"><?= BUSINESS_PHONE ?></a><br>
                📧 <a href="mailto:<?= BUSINESS_EMAIL ?>"><?= BUSINESS_EMAIL ?></a>
            </p>
            <a href="#packages" class="btn btn-primary">View Packages</a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <h3>🐝 <?= BUSINESS_NAME ?></h3>
            <p>Mobile Gymnastics Fun for Kids Ages 2-10</p>
            <p>📞 <a href="tel:<?= BUSINESS_PHONE ?>"><?= BUSINESS_PHONE ?></a> | 📧 <a href="mailto:<?= BUSINESS_EMAIL ?>"><?= BUSINESS_EMAIL ?></a></p>
            <div class="footer-bottom">
                <p>&copy; <?= date('Y') ?> <?= BUSINESS_NAME ?>. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Simple cart functionality
        let cart = { package: null, addons: [] };
        
        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            const totalAmount = document.getElementById('total-amount');
            const checkoutBtn = document.getElementById('checkout-btn');
            const cartData = document.getElementById('cart-data');
            
            let html = '';
            let total = 0;
            
            if (cart.package) {
                html += `<div class="cart-item">
                    <span>${cart.package.name}</span>
                    <span>$${(cart.package.price / 100).toFixed(2)}</span>
                </div>`;
                total += cart.package.price;
            }
            
            cart.addons.forEach(addon => {
                html += `<div class="cart-item">
                    <span>${addon.name}</span>
                    <span>$${(addon.price / 100).toFixed(2)}</span>
                </div>`;
                total += addon.price;
            });
            
            if (html) {
                cartItems.innerHTML = html;
                cartTotal.style.display = 'flex';
                totalAmount.textContent = '$' + (total / 100).toFixed(2);
                checkoutBtn.disabled = false;
                cartData.value = JSON.stringify(cart);
            } else {
                cartItems.innerHTML = '<div class="cart-empty">Your cart is empty. Add packages above to get started!</div>';
                cartTotal.style.display = 'none';
                checkoutBtn.disabled = true;
                cartData.value = '';
            }
        }
        
        // Package buttons
        document.querySelectorAll('.add-package').forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active from all
                document.querySelectorAll('.add-package').forEach(b => {
                    b.textContent = 'Add to Cart';
                    b.classList.remove('btn-secondary');
                    b.classList.add('btn-primary');
                });
                
                // Set this as active
                this.textContent = '✓ Selected';
                this.classList.remove('btn-primary');
                this.classList.add('btn-secondary');
                
                cart.package = {
                    id: this.dataset.id,
                    name: this.dataset.name,
                    price: parseInt(this.dataset.price)
                };
                
                updateCart();
            });
        });
        
        // Addon checkboxes
        document.querySelectorAll('.addon-checkbox').forEach(cb => {
            cb.addEventListener('change', function() {
                if (this.checked) {
                    cart.addons.push({
                        id: this.dataset.id,
                        name: this.dataset.name,
                        price: parseInt(this.dataset.price)
                    });
                } else {
                    cart.addons = cart.addons.filter(a => a.id !== this.dataset.id);
                }
                updateCart();
            });
        });
        
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>
