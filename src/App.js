import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from "./Components/Bookshelf";
import Search from "./Components/Search";
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Bookshelf category='Currently Reading'/>
                                <Bookshelf category='Want to Read'/>
                                <Bookshelf category='Read'/>
                            </div>
                        </div>
                    </div>
                )} />
                <Route path='/search' component={Search} />
                <div className="open-search">
                    <Link to='/search' className='open-search'>
                        <button>Add a book</button>
                    </Link>
                    {/*<button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>*/}
                </div>

            </div>
        )
    }
}

export default BooksApp
