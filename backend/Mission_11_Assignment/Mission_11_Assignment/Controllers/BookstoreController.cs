using Microsoft.AspNetCore.Mvc;
using Mission_11_Assignment.Data;

namespace Mission_11_Assignment.Controllers;

[ApiController]
[Route("[controller]")]
public class BookstoreController : ControllerBase
{

    private BookstoreDbContext _context;

    public BookstoreController(BookstoreDbContext temp)
    {
        _context = temp;
    }

    // HttpGet Logic for the API
    [HttpGet("Books")]
    public IActionResult GetBooks(
        int pageNum = 1,
        int pageSize = 5,
        string sortBy = "title")
    {
        var query = _context.Books.AsQueryable();
        
        // Sorting
        query = sortBy.ToLower() switch
        {
            "title" => query.OrderBy(b => b.Title),
            "" => query,
            _ => query.OrderBy(b => b.BookId)
        };
        
        var totalCount = query.Count();

        // Grabs applicable data for the page
        var books = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        // Creates an anonymous object to return the books and total count
        var bookItem = new
        {
            books,
            totalCount
        };

        return Ok(bookItem);
    }
}