import React, { Component } from "react";
import Book from "./Book";
import PropTypes from "prop-types";

class ListBooks extends Component {
  static propTypes = {
    onUpdateBookShelf: PropTypes.func.isRequired
  };

  onUpdateBookShelf = (bookshelf, book) => {
    this.props.onUpdateBookShelf(bookshelf, book);
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
