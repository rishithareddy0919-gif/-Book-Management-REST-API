
const sqlite3 = require('sqlite3').verbose();

// Connect to database
const db = new sqlite3.Database('./books.db', (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create books table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            price REAL NOT NULL
        )
    `);

    // Insert sample books
    db.run(`
        INSERT OR IGNORE INTO books (id, title, author, price)
        VALUES
        (1, 'Harry Potter', 'J.K. Rowling', 500),
        (2, 'Atomic Habits', 'James Clear', 350),
        (3, 'The Alchemist', 'Paulo Coelho', 250),
        (4, 'Rich Dad Poor Dad', 'Robert Kiyosaki', 400)
    `);
});

// Export database
module.exports = db;
