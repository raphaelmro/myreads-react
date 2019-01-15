import React, { Component } from "react";
import Book from "./Book";
import {func, array} from "prop-types";

class ListBooks extends Component {
  static propTypes = {
    onUpdateBookShelf: func.isRequired,
    books: array.isRequired
  };

  onUpdateBookShelf = (book, bookshelf) => {
    this.props.onUpdateBookShelf(book, bookshelf);
  };

  render() {
    const { books } = this.props;
    return (
      <div>
        <ol className="books-grid">
          {books.length > 0 ? (
            books.map(book => {
              return (
                <li key={book.id}>
                  <Book
                    image={
                      book.imageLinks !== undefined
                        ? book.imageLinks.thumbnail
                        : ""
                    }
                    title={book.title}
                    author={book.authors}
                    key={book.id}
                    book={book}
                    shelf={book.shelf}
                    onUpdateBookShelf={this.onUpdateBookShelf}
                  />
                </li>
              );
            })
          ) : (
            <p>Sem resultado</p>
          )}
        </ol>
      </div>
    );
  }
}

export default ListBooks;
