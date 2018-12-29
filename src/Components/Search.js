import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';
import Book from "./Book";

class Search extends Component {
    state = {
        query: '',
        books: []
    }

    onSearch = (evt) => {
        this.setState({query: evt.target.value});
        BooksAPI.search(this.state.query)
                .then(response => {
                    this.setState( {
                        books: response
                    })
                })
        console.log(this.state.books)
    }

    render() {
        const { query, books } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className='close-search'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               onChange={this.onSearch}
                               value={query}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books && books.map(book => {
                            return <li>
                                <Book image={book.imageLinks.smallThumbnail}
                                  title={book.title}
                                  author={book.authors}
                                />
                            </li>
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;

/*
  NOTES: The search from BooksAPI is limited to a particular set of search terms.
  You can find these search terms here:
  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
  you don't find a specific author or title. Every search is limited by search terms.*/
