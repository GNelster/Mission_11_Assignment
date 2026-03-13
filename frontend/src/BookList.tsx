import { useEffect, useState } from 'react';
import type { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState('title');

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    fetch(
      `https://localhost:5000/Bookstore/Books?pageNum=${pageNum}&pageSize=${pageSize}&sortBy=${sortBy}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
        setTotalCount(data.totalCount);
      });
  }, [pageNum, pageSize, sortBy]);

  return (
    <>
      <div className="container mt-4">
        <h1>Hilton's Classics</h1>

        {/* Sort & Page Sizing Controls */}
        <div className="d-flex gap-3 mb-3">
          <div>
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPageNum(1);
              }}
            >
              <option value="bookId">Book ID</option>
              <option value="title">Title</option>
            </select>
          </div>
          <div>
            <label className="form-label">Results Per Page</label>
            <select
              className="form-select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageNum(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
        {/* Book Table */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Classification</th>
              <th>Category</th>
              <th>Page Count</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.isbn}</td>
                <td>{book.classification}</td>
                <td>{book.category}</td>
                <td>{book.pageCount}</td>
                <td>${book.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <nav>
          <ul className="pagination">
            <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPageNum(pageNum - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, idx) => (
              <li
                key={idx}
                className={`page-item ${pageNum === idx + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPageNum(idx + 1)}
                >
                  {idx + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setPageNum(pageNum + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default BookList;
