const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register new customer
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone, DateOfBirth, password } = req.body;

    // Validate required fields
    if (!FirstName || !LastName || !Email || !Phone || !DateOfBirth || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill all required fields' 
      });
    }

    // Check if user exists
    const [existing] = await pool.query(
      'SELECT customer_id FROM customer WHERE Email = ?',
      [Email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new customer (age will be auto-calculated by trigger)
    const [result] = await pool.query(
      `INSERT INTO customer (FirstName, LastName, Email, Phone, DateOfBirth, age) 
       VALUES (?, ?, ?, ?, ?, TIMESTAMPDIFF(YEAR, ?, CURDATE()))`,
      [FirstName, LastName, Email, Phone, DateOfBirth, DateOfBirth]
    );

    const newCustomer = {
      customer_id: result.insertId,
      FirstName,
      LastName,
      Email,
      Phone,
      DateOfBirth
    };

    // Generate token
    const token = generateToken(result.insertId);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { user: newCustomer, token }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
};

// @desc    Login customer
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    // Get user with password check (we'll store hashed password in a separate field in production)
    // For demo: we'll check against a simple password field (NOT recommended for production)
    const [users] = await pool.query(
      'SELECT customer_id, FirstName, LastName, Email, Phone FROM customer WHERE Email = ?',
      [Email]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const user = users[0];

    // For demo purposes: simple password check
    // 🔐 In production: store hashed passwords and use bcrypt.compare()
    if (password !== 'demo123') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken(user.customer_id);

    res.json({
      success: true,
      message: 'Login successful',
      data: { user, token }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const [user] = await pool.query(
      `SELECT c.customer_id, c.FirstName, c.LastName, c.Email, c.Phone, c.DateOfBirth, c.age,
              COUNT(o.order_id) as total_orders
       FROM customer c
       LEFT JOIN order_table o ON c.customer_id = o.customer_id
       WHERE c.customer_id = ?
       GROUP BY c.customer_id`,
      [req.user.customer_id]
    );

    if (user.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: { user: user[0] }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};