import React, { Component } from "react";
import ListBooks from "./ListBooks";

class Bookshelf extends Component {
  onUpdateBookShelf = (bookshelf, book) => {
    this.props.onUpdateBookShelf(bookshelf, book)
  };

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelf}</h2>
          <div className="bookshelf-books">
            <ListBooks
              books={this.props.books}
              onUpdateBookShelf={this.onUpdateBookShelf}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
