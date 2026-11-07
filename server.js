
const express = require('express');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Rishitha's Book Management REST API is running (Roll No: 252U1R5018)"
    });
});


// 1. GET /books - Search, sort, filter and paginate books
app.get('/books', (req, res) => {

    const {
        search_q = '',
        order_by = 'id',
        order = 'ASC',
        limit = '10',
        offset = '0',
        min_price = '0',
        max_price
    } = req.query;

    // Validate sorting column
    const allowedColumns = ['id', 'title', 'author', 'price'];

    if (!allowedColumns.includes(order_by)) {
        return res.status(400).json({
            message: 'Invalid sorting column'
        });
    }

    // Validate sorting order
    if (!['ASC', 'DESC'].includes(order.toUpperCase())) {
        return res.status(400).json({
            message: 'Order must be ASC or DESC'
        });
    }

    // Convert query parameters
    const limitNum = Number(limit);
    const offsetNum = Number(offset);
    const minPrice = Number(min_price);
    const maxPrice = max_price === undefined ? null : Number(max_price);

    // Validate parameters
    if (
        !Number.isInteger(limitNum) || limitNum <= 0 ||
        !Number.isInteger(offsetNum) || offsetNum < 0 ||
        !Number.isFinite(minPrice) || minPrice < 0 ||
        (maxPrice !== null &&
            (!Number.isFinite(maxPrice) || maxPrice < minPrice))
    ) {
        return res.status(400).json({
            message: 'Invalid limit, offset or price range'
        });
    }

    // SQL query
    let sql = `
        SELECT * FROM books
        WHERE title LIKE ?
        AND price >= ?
    `;

    const params = [`%${search_q}%`, minPrice];

    if (maxPrice !== null) {
        sql += ' AND price <= ?';
        params.push(maxPrice);
    }

    sql += ` ORDER BY ${order_by} ${order.toUpperCase()} LIMIT ? OFFSET ?`;

    params.push(limitNum, offsetNum);

    db.all(sql, params, (err, rows) => {

        if (err) {
            return res.status(500).json({
                message: 'Database error'
            });
        }

        res.status(200).json({
            message: 'Books retrieved successfully',
            count: rows.length,
            data: rows
        });
    });
});


// 2. GET /books/:id - Get a single book
app.get('/books/:id', (req, res) => {

    db.get(
        'SELECT * FROM books WHERE id = ?',
        [req.params.id],
        (err, book) => {

            if (err) {
                return res.status(500).json({
                    message: 'Database error'
                });
            }

            if (!book) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }

            res.status(200).json({
                message: 'Book retrieved successfully',
                data: book
            });
        }
    );
});


// 3. POST /books - Add a new book
app.post('/books', (req, res) => {

    const { title, author, price } = req.body;

    // Validate input
    if (
        typeof title !== 'string' || !title.trim() ||
        typeof author !== 'string' || !author.trim() ||
        price === undefined ||
        price === null ||
        price === '' ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0
    ) {
        return res.status(400).json({
            message: 'Valid title, author and numeric price are required'
        });
    }

    // Insert into database
    db.run(
        'INSERT INTO books (title, author, price) VALUES (?, ?, ?)',
        [title.trim(), author.trim(), Number(price)],
        function(err) {

            if (err) {
                return res.status(500).json({
                    message: 'Failed to create book'
                });
            }

            res.status(201).json({
                message: 'Book created successfully',
                id: this.lastID
            });
        }
    );
});


// 4. PUT /books/:id - Update a book
app.put('/books/:id', (req, res) => {

    const { title, author, price } = req.body;

    // Validate input
    if (
        typeof title !== 'string' || !title.trim() ||
        typeof author !== 'string' || !author.trim() ||
        price === undefined ||
        price === null ||
        price === '' ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0
    ) {
        return res.status(400).json({
            message: 'Valid title, author and numeric price are required'
        });
    }

    // Update database
    db.run(
        'UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?',
        [title.trim(), author.trim(), Number(price), req.params.id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    message: 'Failed to update book'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }

            res.status(200).json({
                message: 'Book updated successfully'
            });
        }
    );
});


// 5. DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {

    db.run(
        'DELETE FROM books WHERE id = ?',
        [req.params.id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    message: 'Failed to delete book'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }

            res.status(200).json({
                message: 'Book deleted successfully'
            });
        }
    );
});


 // DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {

    db.run(
        'DELETE FROM books WHERE id = ?',
        [req.params.id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    message: 'Failed to delete book'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }

            res.status(200).json({
                message: 'Book deleted successfully'
            });
        }
    );
});

// Start server

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});