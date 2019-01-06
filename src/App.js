import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from "./Components/Bookshelf";
import Search from "./Components/Search";
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        shelves: ['currentlyReading', 'read', 'wantToRead'],
        data: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                this.setState({ data: books })
                console.log(this.state.data)
            })
    }

    filterShelf(shelf){
        const { data } = this.state
        const shelfBooks = data.filter( book => {
            return book.shelf === shelf
        })

        return shelfBooks
    }

    render() {
        const { shelves } = this.state
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {shelves.map(shelf => {
                                    if (shelf === 'currentlyReading'){
                                        return <Bookshelf shelf='Currently Reading'
                                                           books={this.filterShelf(shelf)}
                                                           key={shelf}
                                                />
                                    } else if (shelf === 'read'){
                                        return <Bookshelf shelf='Read'
                                                          books={this.filterShelf(shelf)}
                                                          key={shelf}
                                        />
                                    } else if (shelf === 'wantToRead') {
                                        return <Bookshelf shelf='Want To Read'
                                                          books={this.filterShelf(shelf)}
                                                          key={shelf}
                                        />
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                )} />
                <Route path='/search' component={Search} />
                <div className="open-search">
                    <Link to='/search' className='open-search'>
                        <button>Add a book</button>
                    </Link>
                </div>

            </div>
        )
    }
}

export default BooksApp
