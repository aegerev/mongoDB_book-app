import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './BookList';
import BookDetails from './BookDetails';
import './App.css';

function App() {
	const [books, setBooks] = useState([]);
	const [selectedBook, setSelectedBook] = useState(null);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await axios.get('http://localhost:4000/books');
				setBooks(response.data);
			} catch (error) {
				console.error('Error fetching books:', error);
			}
		};

		fetchBooks();
	}, []);

	const handleBookSelect = (book) => {
		setSelectedBook(book);
	};

	return (
		<div className="app">
			<h1>Book Review Platform</h1>
			<BookList books={books} onBookSelect={handleBookSelect} />
			{selectedBook && <BookDetails book={selectedBook} />}
		</div>
	);
}

export default App;
