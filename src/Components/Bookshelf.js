import React, { Component } from "react";
import ListBooks from "./ListBooks";
import { func, string } from "prop-types";

class Bookshelf extends Component {
  static propTypes = {
    onUpdateBookShelf: func.isRequired,
    shelf: string
  };

  onUpdateBookShelf = (book, bookshelf) => {
    this.props.onUpdateBookShelf(book, bookshelf);
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
