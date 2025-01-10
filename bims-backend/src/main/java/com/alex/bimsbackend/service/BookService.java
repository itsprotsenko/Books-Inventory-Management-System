package com.alex.bimsbackend.service;

import com.alex.bimsbackend.book.Book;
import com.alex.bimsbackend.book.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;

    public BookService() {}

    public ResponseEntity<Book> addBook(Book book) {
        Book savedBook = bookRepository.save(book);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }
    public ResponseEntity<String> deleteBook(Integer id) {
        if(bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return new ResponseEntity<>("Book with id "+id+" deleted", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Book with id "+id+" does not exist", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Book> getBookById(Integer id) {
        if(bookRepository.existsById(id)) {
            return new ResponseEntity<>(bookRepository.findById(id).get(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<Book>> getAllBooks() {
        return new ResponseEntity<>(bookRepository.findAll(), HttpStatus.OK);
    }
}
