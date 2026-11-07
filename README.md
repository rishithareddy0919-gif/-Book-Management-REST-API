# BDF Lab 3 – Book Management REST API

## Student Details

- **Student Name:** Rishitha Reddy
- **Roll Number:** 252U1R5018
- **Course:** Backend Development Fundamentals (BDF)
- **Year:** II
- **Term:** II
- **Lab:** Lab 3 – REST API, Query Parameters, Validation and Debugging
- **Live Deployment Link:** https://book-management-rest-api-2-m020.onrender.com
- **GitHub Repository:** https://github.com/rishithareddy0919-gif/-Book-Management-REST-API

## Aim

To develop a RESTful API using Node.js, Express.js and SQLite for managing books. The API supports CRUD operations, searching, sorting, pagination, price-range filtering, input validation, appropriate HTTP status codes and error handling.

## Technologies Used

- Node.js
- Express.js
- SQLite and sqlite3
- JavaScript
- npm (Node Package Manager)
- Postman for API testing
- Git and GitHub for version control
- Render for cloud deployment
- VS Code for development

## Project Structure

```text
LAB-03/
│
├── .gitignore
├── database.js
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

The SQLite database file (`books.db`) is generated locally when the application starts and is excluded from GitHub.

## Setup and Execution

1. Install Node.js and npm.
2. Clone the GitHub repository:

```bash
git clone https://github.com/rishithareddy0919-gif/-Book-Management-REST-API.git
```

3. Open the project folder in VS Code.
4. Install dependencies:

```bash
npm install
```

5. Start the server:

```bash
npm start
```

6. Open the API in your browser:

```text
http://localhost:3000
```

The server uses the `PORT` environment variable when available and defaults to port `3000` for local development.

## Database Design

- **Database:** SQLite
- **Database file:** `books.db`
- **Table:** `books`

| Column | Data Type | Description |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| title | TEXT | Book title |
| author | TEXT | Book author |
| price | REAL | Book price |

The database connection and table initialization are handled in `database.js`.

## API Endpoints

| HTTP Method | Endpoint | Purpose | Status Code |
|---|---|---|---|
| GET | `/` | Check API availability | 200 |
| GET | `/books` | Retrieve all books | 200 |
| GET | `/books/:id` | Retrieve a book by ID | 200 |
| POST | `/books` | Add a new book | 201 |
| PUT | `/books/:id` | Update an existing book | 200 |
| DELETE | `/books/:id` | Delete a book | 200 |

Missing records and unknown routes return 404. Invalid input returns 400.

## Query Parameters – GET /books

The API supports the following query parameters:

- `search_q` – Search books using a partial title match.
- `order_by` – Select the column used for sorting.
- `order` – Sorting direction (`ASC` or `DESC`).
- `limit` – Maximum number of records to retrieve.
- `offset` – Number of records to skip.
- `min_price` – Minimum price filter.
- `max_price` – Maximum price filter.

### Example Requests

Search for a book:

```text
http://localhost:3000/books?search_q=Harry
```

Sort books by price:

```text
http://localhost:3000/books?order_by=price&order=DESC
```

Filter books by price:

```text
http://localhost:3000/books?min_price=200&max_price=500
```

Pagination:

```text
http://localhost:3000/books?limit=2&offset=0
```

Combined query:

```text
http://localhost:3000/books?search_q=Atomic&order_by=price&order=DESC&limit=5&offset=0
```

## Example POST Request

In Postman, select:

**POST → Body → raw → JSON**

Use the following request body:

```json
{
  "title": "Deep Work",
  "author": "Cal Newport",
  "price": 450
}
```

A successful request returns HTTP status `201 Created`.

## SQL Operations Used

- `SELECT` – Retrieve book records.
- `INSERT` – Add new books.
- `UPDATE` – Modify existing book records.
- `DELETE` – Remove book records.
- `WHERE` – Apply conditions to queries.
- `LIKE` – Search for partial title matches.
- `ORDER BY` – Sort book records.
- `LIMIT` and `OFFSET` – Implement pagination.
- Price conditions – Filter books within a specified price range.

Parameterized SQL queries are used to prevent SQL injection. Sorting columns and directions are restricted to allowed values.

## Input Validation and HTTP Status Codes

The API validates incoming request data before performing database operations.

- **200 OK:** Request completed successfully.
- **201 Created:** A new book was created.
- **400 Bad Request:** Required fields are missing or input values are invalid.
- **404 Not Found:** Requested book or endpoint does not exist.
- **500 Internal Server Error:** Unexpected server-side error.

Validation checks include:

- Title must be provided.
- Author must be provided.
- Price must be a valid non-negative number.

## Postman Testing

The API was tested using Postman.

The following test cases were performed:

1. Retrieve all books.
2. Retrieve a book using its ID.
3. Add a new book.
4. Update an existing book.
5. Delete an existing book.
6. Search books by title.
7. Sort books in ascending and descending order.
8. Filter books using minimum and maximum prices.
9. Test pagination using limit and offset.
10. Submit invalid data.
11. Request a book with a non-existent ID.
12. Test appropriate HTTP status codes.

## GitHub and Deployment

The project source code is maintained using Git and GitHub.

- **GitHub Repository:** https://github.com/rishithareddy0919-gif/-Book-Management-REST-API
- **Deployment Platform:** Render
- **Deployment Status:** Live

The application is deployed on Render and can be accessed publicly.

**Live API:** https://book-management-rest-api-2-m020.onrender.com

The deployed application uses the port assigned by Render through the `PORT` environment variable.

Note: The SQLite database on a free Render instance uses ephemeral local storage. Database contents may not persist across restarts or redeployments.

## Result

Successfully developed and deployed a Book Management REST API using Node.js, Express.js and SQLite. The application supports CRUD operations, search, sorting, pagination, price filtering, input validation and appropriate HTTP status codes.

## Conclusion

Through this lab, I learned how to develop RESTful APIs using Express.js, connect a backend application to an SQLite database, perform CRUD operations, handle query parameters, validate user input, debug common errors and test API endpoints using Postman.

I also gained practical experience in version control using Git and GitHub and deploying a Node.js application on Render.

---

**Developed by Rishitha Reddy | Roll Number: 252U1R5018**

**Backend Development Fundamentals – Lab 3**
