import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Components/Bookshelf";
import Search from "./Components/Search";
import { Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    loaded: false
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books, loaded: true });
  }

  filterShelf(shelf) {
    const { books } = this.state;
    return books.filter(book => {
      return book.shelf === shelf;
    });
  }

  onUpdateBookShelf = (book, bookshelf) => {
    if (this.state.books) {
      BooksAPI.update(book, bookshelf).then(() => {
        book.shelf = bookshelf;
        this.setState(currState => ({
          books: currState.books
            .filter(myBook => myBook.id !== book.id)
            .concat([book])
        }));
      });
      toast.success(`📚 Book '${book.title}' updated!`);
    }
  };

  render() {
    const { loaded } = this.state;
    const shelves = ["currentlyReading", "read", "wantToRead"];
    let description = "";
    return (
      <div className="app">
        <Route exact path={process.env.PUBLIC_URL + "/"}
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
          <Link to={process.env.PUBLIC_URL + "/search"} className="open-search">
            <button>Add a book</button>
          </Link>
        </div>
        <Route exact path={process.env.PUBLIC_URL + "/search"}
          render={() => (
            <Search
              books={this.state.books}
              onUpdateBookShelf={this.onUpdateBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
