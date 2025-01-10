package com.alex.bimsbackend.controller;


import com.alex.bimsbackend.book.Book;
import com.alex.bimsbackend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bims")
public class BookController {
    @Autowired
    BookService bookService;

    public BookController() {}

    @PostMapping("/addBook")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }
    @DeleteMapping("/deleteBook/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable(value = "id") Integer id) {
        return bookService.deleteBook(id);
    }
    @GetMapping("/getBookById/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable(value = "id") Integer id) {
        return bookService.getBookById(id);
    }
    @GetMapping("/getAllBooks")
    public ResponseEntity<List<Book>> getBookById() {
        return bookService.getAllBooks();
    }
}
