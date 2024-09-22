import React from 'react';

function BookList({ books, onBookSelect }) {
	return (
		<div className="book-list">
			<h2>Books</h2>
			<ul>
				{books.map((book) => (
					<li key={book._id} onClick={() => onBookSelect(book)}>
						{book.title} by {book.author}
					</li>
				))}
			</ul>
		</div>
	);
}

export default BookList;
