package com.alex.bimsbackend.book;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Integer> {
    Book findById(int id);

    List<Book> findByTitle(String title);

    List<Book> findAll();
}
