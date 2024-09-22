import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookDetails({ book }) {
	const [details, setDetails] = useState(book);
	const [review, setReview] = useState('');
	const [submitStatus, setSubmitStatus] = useState('');

	useEffect(() => {
		const fetchBookDetails = async () => {
			try {
				const response = await axios.get(
					`http://localhost:4000/books/${book._id}`
				);
				setDetails(response.data);
			} catch (error) {
				console.error('Error fetching book details:', error);
			}
		};

		fetchBookDetails();
	}, [book]);

	const handleSubmitReview = async (e) => {
		e.preventDefault();
		if (!review.trim()) {
			setSubmitStatus('Review cannot be empty');
			return;
		}

		try {
			// TODO: Post the review to the backend using axios
			// await axios.post(...);

			// TODO: Update the details state to include the new review
			// setDetails(prevDetails => ...);

			// TODO: Clear the review input and set a success message
			// setReview('');
			// setSubmitStatus('Review added successfully!');

			// Placeholder for response handling
			setSubmitStatus('Implement the functionality to post a review');
		} catch (error) {
			console.error('Error submitting review:', error);
			setSubmitStatus('Failed to add review');
		}
	};

	return (
		<div className="book-details">
			<h2>{details.title}</h2>
			<p>Author: {details.author}</p>
			<h3>Reviews</h3>
			{details.reviews && (
				<ul>
					{details.reviews.map((review, index) => (
						<li key={index}>{review}</li>
					))}
				</ul>
			)}
			<form onSubmit={handleSubmitReview} className="review-form">
				<input
					type="text"
					value={review}
					onChange={(e) => setReview(e.target.value)}
					placeholder="Write a review"
				/>
				<button type="submit">Submit Review</button>
				{submitStatus && <p>{submitStatus}</p>}
			</form>
		</div>
	);
}

export default BookDetails;
