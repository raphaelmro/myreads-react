import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Components/Bookshelf";
import Search from "./Components/Search";
import { Route, Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    shelves: ["currentlyReading", "read", "wantToRead"],
    data: [],
    loaded: false
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        data: books,
        loaded: true
      });
    });
  }

  filterShelf(shelf) {
    const { data } = this.state;
    return data.filter(book => {
      return book.shelf === shelf;
    });
  }

  onUpdateBookShelf = (bookshelf, book) => {
    if (this.state.data) {
      BooksAPI.update(bookshelf, book).then(() => {
        book.shelf = bookshelf;
        this.setState(currState => ({
          data: currState.data
            .filter(myBook => myBook.id !== book.id)
            .concat([book])
        }));
      });
    }
  };

  render() {
    const { shelves, loaded } = this.state;
    let description = "";
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {loaded ? (
                    shelves.map(shelf => {
                      if (shelf === "currentlyReading") {
                        description = "Currently Reading";
                      } else if (shelf === "read") {
                        description = "Read";
                      } else if (shelf === "wantToRead") {
                        description = "Want To Read";
                      }

                      return (
                        <Bookshelf
                          shelf={description}
                          books={this.filterShelf(shelf)}
                          key={shelf}
                          onUpdateBookShelf={this.onUpdateBookShelf}
                        />
                      );
                    })
                  ) : (
                    <p>Carregando...</p>
                  )}
                </div>
              </div>
            </div>
          )}
        />
        <Route path="/search" component={Search} />
        <div className="open-search">
          <Link to="/search" className="open-search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BooksApp;
