import React, { Component } from 'react';
import Form from "../components/Form";
import Book from "../components/Book";
import API from "../utils/API";

class Home extends Component {
    state = {
        books: [],
        q: "",
        message: "Search For A Book To Begin!"
    } 

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };
    
    getBooks = () => {
        API.getBooks(this.state.q)
            .then(res =>
                this.setState({
                    books: res.data
                })
            )
            .catch(() =>
                this.setState({
                    books: [],
                    message: "No New Books Found, Try a Different Query"
                })
            );
    };
    
    handleFormSubmit = event => {
        event.preventDefault();
        this.getBooks();
    };

    handleBookSave = id => {
        const book = this.state.books.find(book => book.id === id);

        API.saveBook({
            googleId: book.id,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            url: book.volumeInfo.infoLink,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail
        }).then(() => this.getBooks());
    };

      
    render() {
        console.log(this.state.books)
        return (
            <div>
                <div className="col-md-12">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3>
                                <strong>
                                    <i className="fa fafar fa-book" aria-hidden="true" /> Book Search
                                </strong>
                            </h3>
                        </div>
                        <div className="card-body">
                            <Form 
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                                q={this.state.q}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3>
                                <strong>Results</strong>
                            </h3>
                        </div>
                        <div className="card-body">
                            {this.state.books.length === 0 ? (
                                <h2 className="text-center">
                                    {this.state.message}
                                </h2>
                            ) : (
                                <ul className="list-group">
                                    {this.state.books.map(book => (
                                        <Book
                                            key={book.id}
                                            title={book.volumeInfo.title}
                                            subtitle={book.volumeInfo.subtitle}
                                            link={book.volumeInfo.infoLink}
                                            authors={book.volumeInfo.authors.join(", ")}
                                            description={book.volumeInfo.description}
                                            image={book.volumeInfo.imageLinks.thumbnail}
                                            Button={() => (
                                                <button
                                                  onClick={() => this.handleBookSave(book.id)}
                                                  className="btn btn-primary ml-2"
                                                >
                                                  Save
                                                </button>
                                            )}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Home