import React, { Component } from 'react';
import Book from './Book';

class ListBooks extends Component {

    onUpdateBookShelf = (bookshelf, bookId) => {
        this.props.onUpdateBookShelf(bookshelf, bookId)
    }

    render() {
        const { books } = this.props
        return (
            <div>
                <ol className="books-grid">
                    {books.length > 0 ? books.map(book => {
                        return <li key={book.id}>
                            <Book image={book.imageLinks !== undefined ? book.imageLinks.thumbnail: ''}
                                  title={book.title}
                                  author={book.authors}
                                  key={book.id}
                                  book={book}
                                  onUpdateBookShelf={this.onUpdateBookShelf}
                            />
                        </li>
                    }): <p>Sem resultado</p>}
                </ol>
            </div>
        )
    }
}

export default ListBooks;