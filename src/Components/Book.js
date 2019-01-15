import React, { Component } from "react";
import { func, shape, string, array } from "prop-types";

class Book extends Component {
  static propTypes = {
    onUpdateBookShelf: func.isRequired,
    book: shape({
      shelf: string
    }),
    title: string,
    authors: array
  };

  onUpdateBookShelf = evt => {
    evt.preventDefault();
    this.props.onUpdateBookShelf(this.props.book, evt.target.value);
  };
  render() {
    const { shelf } = this.props.book;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${this.props.image})`
            }}
          />

          <div className="book-shelf-changer">
            <select
              value={shelf === undefined ? "none" : shelf}
              onChange={this.onUpdateBookShelf}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.author}</div>
      </div>
    );
  }
}

export default Book;
