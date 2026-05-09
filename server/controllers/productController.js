const { pool } = require('../config/db');

// @desc    Get all products with filters
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const { category, seller, minPrice, maxPrice, search, page = 1, limit = 12 } = req.query;
    
    let query = `
      SELECT p.*, c.category_name, s.seller_name,
             (SELECT ROUND(AVG(CAST(r.rating AS UNSIGNED)), 1) 
              FROM review r WHERE r.product_id = p.product_id) as avg_rating,
             (SELECT COUNT(*) FROM review r WHERE r.product_id = p.product_id) as review_count
      FROM product p
      LEFT JOIN category c ON p.category_id = c.category_id
      LEFT JOIN seller s ON p.seller_id = s.seller_id
      WHERE 1=1
    `;
    
    const params = [];

    if (category) {
      query += ' AND c.category_name = ?';
      params.push(category);
    }
    if (seller) {
      query += ' AND s.seller_name = ?';
      params.push(seller);
    }
    if (minPrice) {
      query += ' AND p.MRP >= ?';
      params.push(minPrice);
    }
    if (maxPrice) {
      query += ' AND p.MRP <= ?';
      params.push(maxPrice);
    }
    if (search) {
      query += ' AND p.product_name LIKE ?';
      params.push(`%${search}%`);
    }

    const offset = (page - 1) * limit;
    query += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    const [products] = await pool.query(query, params);

    // Get total count for pagination
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM product p
       LEFT JOIN category c ON p.category_id = c.category_id
       LEFT JOIN seller s ON p.seller_id = s.seller_id
       WHERE 1=1` + 
      (category ? ' AND c.category_name = ?' : '') +
      (seller ? ' AND s.seller_name = ?' : '') +
      (minPrice ? ' AND p.MRP >= ?' : '') +
      (maxPrice ? ' AND p.MRP <= ?' : '') +
      (search ? ' AND p.product_name LIKE ?' : ''),
      params.slice(0, params.length - 2)
    );

    res.json({
      success: true,
       products,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching products' 
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
exports.getProduct = async (req, res) => {
  try {
    const [products] = await pool.query(
      `SELECT p.*, c.category_name, s.seller_name, s.seller_phone,
              (SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                  'review_id', r.review_id,
                  'description', r.description,
                  'rating', r.rating,
                  'customer', CONCAT(u.FirstName, ' ', u.LastName)
                )
              ) FROM review r 
              LEFT JOIN customer u ON r.customer_id = u.customer_id
              WHERE r.product_id = p.product_id) as reviews
       FROM product p
       LEFT JOIN category c ON p.category_id = c.category_id
       LEFT JOIN seller s ON p.seller_id = s.seller_id
       WHERE p.product_id = ?`,
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.json({
      success: true,
      data: products[0]
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching product' 
    });
  }
};

// @desc    Add to cart
// @route   POST /api/cart
exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const customer_id = req.user.customer_id;

    // Get product details
    const [product] = await pool.query(
      'SELECT MRP, stock FROM product WHERE product_id = ?',
      [product_id]
    );

    if (product.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    if (product[0].stock < quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient stock available' 
      });
    }

    const grandtotal = product[0].MRP * quantity;

    // Add to cart
    const [result] = await pool.query(
      `INSERT INTO cart (grandtotal, itemtotal, customer_id, product_id) 
       VALUES (?, ?, ?, ?)`,
      [grandtotal, quantity, customer_id, product_id]
    );

    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      data: { cart_id: result.insertId, grandtotal, itemtotal: quantity }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error adding to cart' 
    });
  }
};