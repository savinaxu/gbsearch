import React, { Component } from 'react';
import Book from "../components/Book";
import API from "../utils/API";

class Saved extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        this.getSavedBooks()
    }

    getSavedBooks = () => {
        API.getSavedBooks()
         .then(res => 
            this.setState({
                books: res.data
            }))
         .catch(err => console.log(err))
    }

    handleBookDelete = id => {
        API.deleteBook(id).then(res => this.getSavedBooks())
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mt-4">
                            <div className="card-header">
                                <h3>
                                <strong>
                                    <i className="fa fa-download" aria-hidden="true" /> Saved Books
                                </strong>
                                </h3>
                            </div>
                            <div className="card-body">
                                {this.state.books.length ? (
                                    <ul className="list-group">
                                        {this.state.books.map(book => (
                                            <Book
                                                key={book._id}
                                                title={book.title}
                                                subtitle={book.subtitle}
                                                url={book.link}
                                                authors={book.authors.join(", ")}
                                                description={book.description}
                                                image={book.image}
                                                Button={() => (
                                                    <button
                                                    onClick={() => this.handleBookDelete(book._id)}
                                                    className="btn btn-danger ml-2"
                                                    >
                                                    Delete
                                                    </button>
                                                )}
                                            />
                                        ))}
                                    </ul>
                                ) : (
                                    <h2 className="text-center">No Saved Books</h2>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Saved