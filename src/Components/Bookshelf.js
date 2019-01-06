import React, {Component} from 'react';
import Book from './Book';
import ListBooks from "./ListBooks";

class Bookshelf extends Component {
    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.shelf}</h2>
                    <div className="bookshelf-books">
                        <ListBooks books={this.props.books} />
                        {/*<ol className="books-grid">
                            <li>
                                <Book
                                    image="http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
                                    title='To kill a Mockinbird'
                                    author='Harper Lee'
                                />
                            </li>
                            <li>
                                <Book
                                    image="http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
                                    title="Ender's Game"
                                    author="Orson Scott Card"
                                />
                            </li>
                        </ol>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default Bookshelf;