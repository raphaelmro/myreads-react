import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Components/Bookshelf";
import Search from "./Components/Search";
import { Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class BooksApp extends React.Component {
  static propTypes = {
    onUpdateBookShelf: PropTypes.func.isRequired
  };

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
    console.log(book.shelf);
    if (this.state.data) {
      BooksAPI.update(bookshelf, book).then(() => {
        book.shelf = bookshelf;
        this.setState(currState => ({
          data: currState.data
            .filter(myBook => myBook.id !== book.id)
            .concat([book])
        }));
      });
      toast.success(`📚 Book '${book.title}' updated!`);
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
                <ToastContainer />
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
        <div className="open-search">
          <Link to="/search" className="open-search">
            <button>Add a book</button>
          </Link>
        </div>
        <Route
          path="/search"
          render={() => (
            <Search
              books={this.state.data}
              onUpdateBookShelf={this.onUpdateBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
