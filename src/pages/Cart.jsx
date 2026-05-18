import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useData();
  const navigate = useNavigate();
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Shipping, 3: Processing, 4: Success
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'UPI'
  });

  // Helper to parse price strings like "₹4,999" to integers
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[^\d]/g, '')) || 0;
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
  };

  const shippingFee = 0; // Free divine shipping!
  const total = getSubtotal() + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToShipping = () => {
    if (cart.length === 0) return toast.error('Your cart is empty!');
    setCheckoutStep(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!shippingDetails.name || !shippingDetails.phone || !shippingDetails.address || !shippingDetails.pincode) {
      return toast.error('Please fill in all delivery details.');
    }
    
    setCheckoutStep(3); // Start processing
    
    setTimeout(() => {
      setCheckoutStep(4); // Show success screen
      clearCart();
      toast.success('Jai Bajrangbali! Order Placed Successfully.');
    }, 2500);
  };

  if (checkoutStep === 4) {
    return (
      <div className="cart-page animate-fade-in">
        <div className="container status-container">
          <div className="status-card glass-card success-card">
            <div className="sacred-om-badge">🕉️</div>
            <h2>Order Placed Successfully!</h2>
            <p className="order-blessing">"Sankat Mochan Hanumate Namaha"</p>
            <div className="blessing-message">
              <p>May Lord Hanuman bless you with health, strength, and protection.</p>
              <p>Your spiritual items have been booked and are being packed with pure holy devotion. They will be sprinkled with sacred Ganga Jal and flowers before shipping!</p>
            </div>
            <div className="order-details-summary">
              <p><strong>Deliver to:</strong> {shippingDetails.name}</p>
              <p><strong>Address:</strong> {shippingDetails.address}, {shippingDetails.city} - {shippingDetails.pincode}</p>
              <p><strong>Estimated Arrival:</strong> 3-5 Auspicious Days</p>
            </div>
            <div className="status-actions">
              <Link to="/store" className="btn-primary">Return to Store</Link>
              <Link to="/" className="btn-outline">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (checkoutStep === 3) {
    return (
      <div className="cart-page">
        <div className="container status-container">
          <div className="status-card glass-card loading-card">
            <div className="spinner"></div>
            <h3>Processing Sacred Order...</h3>
            <p>We are securing your connection and verifying your spiritual packaging requirements. Please do not close this window.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page animate-fade-in">
      <div className="cart-hero">
        <div className="container">
          <h1>Your <span>Sacred Cart</span> 🛒</h1>
          <p>Bring home sacred relics, energized idols, and divine scriptures to fill your space with spiritual positivity.</p>
        </div>
      </div>

      <div className="container cart-container">
        {checkoutStep === 1 && (
          <>
            {cart.length === 0 ? (
              <div className="empty-cart-state glass-card col-span-2">
                <span className="empty-icon">🛒</span>
                <h3>Your Cart is Empty</h3>
                <p>You haven't added any spiritual tools or offerings to your cart yet. Explore our divine store to invite positive energy into your home.</p>
                <Link to="/store" className="btn-primary">Go to Divine Store</Link>
              </div>
            ) : (
              <>
                {/* Left: Cart Items */}
                <div className="cart-items-wrapper">
                  <div className="cart-header-actions">
                    <h3>Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)</h3>
                    <button className="btn-clear-cart" onClick={clearCart}>🧹 Clear Cart</button>
                  </div>

                  <div className="cart-items-list">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item-card glass-card">
                        <div className="cart-item-image">
                          <img src={item.img || '/images/store.png'} alt={item.name} />
                        </div>
                        <div className="cart-item-details">
                          <span className="item-category">{item.category}</span>
                          <h4>{item.name}</h4>
                          <span className="item-price">{item.price} each</span>
                        </div>
                        <div className="cart-item-quantity">
                          <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <div className="cart-item-subtotal">
                          <strong>₹{(parsePrice(item.price) * item.quantity).toLocaleString()}</strong>
                        </div>
                        <button className="btn-remove-item" onClick={() => removeFromCart(item.id)} title="Remove Item">🗑</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Summary */}
                <div className="cart-summary-sidebar">
                  <div className="summary-card glass-card">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <strong>₹{getSubtotal().toLocaleString()}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Divine Shipping</span>
                      <strong className="shipping-free">FREE</strong>
                    </div>
                    <div className="summary-total">
                      <span>Total Amount</span>
                      <strong>₹{total.toLocaleString()}</strong>
                    </div>
                    <button className="btn-primary btn-full" onClick={handleProceedToShipping}>Proceed to Delivery</button>
                    <div className="secure-checkout-badge">
                      <span>🔒 SSL Secured and Encrypted Checkout</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {checkoutStep === 2 && (
          <>
            {/* Left: Shipping Form */}
            <div className="shipping-form-wrapper">
              <div className="cart-header-actions">
                <h3>Delivery Details 🏠</h3>
                <button className="btn-clear-cart" onClick={() => setCheckoutStep(1)}>← Back to Cart</button>
              </div>

              <div className="shipping-form-card glass-card">
                <form onSubmit={handlePlaceOrder} className="divine-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" required placeholder="Lord Hanuman's Devotee" value={shippingDetails.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input type="tel" name="phone" required placeholder="e.g. +91 98765 43210" value={shippingDetails.phone} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>Postal Code / Pincode</label>
                      <input type="text" name="pincode" required placeholder="e.g. 500001" value={shippingDetails.pincode} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Full Shipping Address</label>
                    <textarea name="address" required rows="3" placeholder="Enter complete home address..." value={shippingDetails.address} onChange={handleInputChange}></textarea>
                  </div>
                  <div className="form-group">
                    <label>City / State</label>
                    <input type="text" name="city" required placeholder="e.g. Hyderabad, Telangana" value={shippingDetails.city} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Payment Method</label>
                    <div className="payment-radio-group">
                      <label className={`payment-radio ${shippingDetails.paymentMethod === 'UPI' ? 'selected' : ''}`}>
                        <input type="radio" name="paymentMethod" value="UPI" checked={shippingDetails.paymentMethod === 'UPI'} onChange={handleInputChange} />
                        <span>📱 Google Pay / PhonePe (UPI)</span>
                      </label>
                      <label className={`payment-radio ${shippingDetails.paymentMethod === 'Card' ? 'selected' : ''}`}>
                        <input type="radio" name="paymentMethod" value="Card" checked={shippingDetails.paymentMethod === 'Card'} onChange={handleInputChange} />
                        <span>💳 Debit / Credit Card</span>
                      </label>
                      <label className={`payment-radio ${shippingDetails.paymentMethod === 'COD' ? 'selected' : ''}`}>
                        <input type="radio" name="paymentMethod" value="COD" checked={shippingDetails.paymentMethod === 'COD'} onChange={handleInputChange} />
                        <span>🤝 Cash on Delivery (COD)</span>
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary btn-full" style={{ marginTop: '1.5rem' }}>Place Divine Order (₹{total.toLocaleString()})</button>
                </form>
              </div>
            </div>

            {/* Right: Small Summary */}
            <div className="cart-summary-sidebar">
              <div className="summary-card glass-card">
                <h3>Bag Summary</h3>
                <div className="summary-items-mini">
                  {cart.map(item => (
                    <div key={item.id} className="mini-item">
                      <span>{item.name} (x{item.quantity})</span>
                      <strong>₹{(parsePrice(item.price) * item.quantity).toLocaleString()}</strong>
                    </div>
                  ))}
                </div>
                <div className="summary-row" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--glass-border)' }}>
                  <span>Total Due</span>
                  <strong>₹{total.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
