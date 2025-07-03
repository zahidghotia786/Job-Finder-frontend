import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../Context";

export default function ClientReview() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [currentUser, setCurrentUser] = useState('');
  const { setStarRating } = useContext(UserContext)

  // Fetch reviews from the server
  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3002/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews(); // Call fetchReviews on component mount
  }, []);

  // Fetch current user profile
  const getProfile = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`http://localhost:3002/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCurrentUser(response.data._id);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);



  const showMoreReviews = () => {
    setVisibleReviews(prevCount => prevCount + 5);
  };

  const filteredReviews = reviews.filter(review => review.professionalProfile._id === id).slice().reverse();
  const canShowMore = visibleReviews < filteredReviews.length;

  const handleLike = async (idx) => {
    const reviewId = filteredReviews[idx]._id; // Get the review ID
    const userId = currentUser; // Ensure you are using the correct user ID

    // console.log('Liking review with ID:', reviewId, 'by user ID:', userId); // Log for debugging

    try {
      await axios.put(`http://localhost:3002/reviews/${reviewId}/like`, { userId });
      // Refresh reviews after liking
      fetchReviews();
    } catch (error) {
      console.error('Error liking the review:', error);
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="text-yellow-500">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    return stars;
  };

  // Calculate total rating

  useEffect(() => {
    // Calculate total rating and percentage
    const totalRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
    const totalReviews = filteredReviews.length;
    const totalPossibleRating = totalReviews * 5;
  
    // For the percentage of stars received
    const starsReceivedPercentage = totalPossibleRating > 0 ? Math.round((totalRating / totalPossibleRating) * 100) : 0;
  
    setStarRating(starsReceivedPercentage); // Now safe to call here
  }, [filteredReviews, setStarRating]); // Add dependencies
  


  return (
    <div className="p-4 mt-5 w-full flex flex-col items-center gap-3">
      <h1 className="mt-10 mb-4 text-xl sm:text-2xl font-bold text-shadow">
        🔻 Client's Reviews 🔻
      </h1>
      <div className="w-[250px] h-[4px] bg-blue-700 mb-10 rounded-full"></div>
      {/* Map through visible reviews */}
      {filteredReviews.slice(0, visibleReviews).map((review, idx) => (
        <div

          key={review._id} // Use review ID for key instead of index
          className="relative w-[90%] bg-gray-100 border border-gray-300 shadow-md rounded-xl overflow-hidden p-5 transition-all hover:shadow-lg hover:scale-105 ease-in-out"
        >
          <div className="flex flex-col justify-between space-y-4">
            {/* Top section for user info */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                {review.userProfile.firstName} {review.userProfile.lastName}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Review/Comment Text */}
            <div className="w-full text-left">
              <p className="text-md font-medium text-gray-700">
                {review.comment || "No comment provided."}
              </p>
            </div>

            {/* Rating Display */}
            <div className="w-full text-left">
              <div className="flex items-center">
                {renderStars(review.rating)} {/* Render stars based on rating */}
              </div>
            </div>

            {/* Like Button */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleLike(idx)} // Pass only idx
                className="flex items-center text-red-600 hover:text-green-600"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                <span>{review.likedBy.length || 0} Likes</span>
              </button>


              {/* Email Button */}
              <a
                href={`mailto:${review.userProfile.email}`}
                className="text-indigo-500 font-semibold hover:underline"
              >
                Contact
              </a>
            </div>

            {/* Updated At */}
            <div className="text-sm text-gray-500">
              Comment At: {new Date(review.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))}

      {/* Show More Button */}
      {canShowMore && (
        <div className="w-full text-center mt-6">
          <button
            onClick={showMoreReviews}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}
