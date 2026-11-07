# Postman Test Cases – Book Management REST API

## 1. GET All Books
- Method: GET
- URL: /books
- Expected Status: 200 OK
- Expected Result: List of all books.

## 2. GET Book by ID
- Method: GET
- URL: /books/1
- Expected Status: 200 OK
- Expected Result: Book details.

## 3. POST Create Book
- Method: POST
- URL: /books
- Body:
{
  "title": "Deep Work",
  "author": "Cal Newport",
  "price": 450
}
- Expected Status: 201 Created

## 4. PUT Update Book
- Method: PUT
- URL: /books/5
- Expected Status: 200 OK
- Expected Result: Book updated successfully.

## 5. DELETE Book
- Method: DELETE
- URL: /books/5
- Expected Status: 200 OK

## 6. Search Books
- Method: GET
- URL: /books?search_q=Harry
- Expected Status: 200 OK

## 7. Sorting
- Method: GET
- URL: /books?order_by=price&order=DESC
- Expected Status: 200 OK

## 8. Pagination
- Method: GET
- URL: /books?limit=2&offset=0
- Expected Status: 200 OK

## 9. Invalid Book ID
- Method: GET
- URL: /books/9999
- Expected Status: 404 Not Found

## 10. Invalid Input
- Method: POST
- URL: /books
- Expected Status: 400 Bad Request
