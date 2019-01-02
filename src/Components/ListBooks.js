import React from 'react';
import Book from './Book';

const ListBooks = ({books}) => {
    return (
        <div>
            <ol className="books-grid">
                {books.length > 0 ? books.map(book => {
                    return <li>
                        <Book image={book.imageLinks.smallThumbnail}
                              title={book.title}
                              author={book.authors}
                        />
                    </li>
                }): <p>Sem resultado</p>}
            </ol>
        </div>
    );
};

export default ListBooks;