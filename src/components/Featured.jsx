import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Featured() {
  const [booking, setBooking] = useState([]);
  const [review, setReview] = useState([]);
  const [sortedProfessionalIds, setSortedProfessionalIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [topProfessionals, setTopProfessionals] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); // Initially show only 4 professionals

  // Fetch booking data
  const fetchingBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3002/bookings");
      setBooking(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Fetch review data
  const fetchingReviews = async () => {
    try {
      const response = await axios.get("http://localhost:3002/reviews");
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Fetch all users data
  const fetchingAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/allUsers");
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Combine booking and review professionalIds, count occurrences, and sort by frequency
  const sortProfessionalsByFrequency = () => {
    const allProfessionalIds = [
      ...booking.map((item) => item.professionalId),
      ...review.map((item) => item.professionalId),
    ];

    const idCounts = allProfessionalIds.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    const sortedIds = Object.keys(idCounts).sort((a, b) => idCounts[b] - idCounts[a]);

    setSortedProfessionalIds(sortedIds);
  };

  // Match sortedProfessionalIds with user data
  const matchProfessionalsWithUsers = () => {
    const matchedProfessionals = sortedProfessionalIds.map((id) => {
      const user = allUsers.find((user) => user._id === id);
      return user || { professionalId: id, firstName: "Unknown", lastName: "", professionalCategory: "Unknown", profileImage: "" };
    });
    setTopProfessionals(matchedProfessionals);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchingBookings();
    fetchingReviews();
    fetchingAllUsers();
  }, []);

  // Sort professionals after bookings and reviews are fetched
  useEffect(() => {
    if (booking.length > 0 && review.length > 0) {
      sortProfessionalsByFrequency();
    }
  }, [booking, review]);

  // Match professionals with user data after both sortedProfessionalIds and allUsers are available
  useEffect(() => {
    if (sortedProfessionalIds.length > 0 && allUsers.length > 0) {
      matchProfessionalsWithUsers();
    }
  }, [sortedProfessionalIds, allUsers]);

  // Show more professionals on "View More" button click
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div className="w-full mt-6 flex flex-col items-center">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topProfessionals.slice(0, visibleCount).map((professional, index) => (
          <div key={professional.professionalId} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
              
              <Link to={`userprofile/${professional._id}`}>
            {professional.profileImage ? (
              <img
                className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md mb-4"
                src={`http://localhost:3002/${professional.profileImage}`}
                alt={`${professional.firstName} ${professional.lastName}`}
              />
            ) : (
              <div className="bg-blue-500 rounded-full text-white w-24 h-24 flex items-center justify-center text-2xl font-bold mb-4">
                {professional.firstName[0]}{professional.lastName[0]}
              </div>
            )}
            <h3 className="text-lg font-bold text-center">{professional.firstName} {professional.lastName}</h3>
            <p className="text-gray-500 text-center">{professional.professionalCategory}</p>
            <span className="mt-2 inline-block bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-xs">
              <strong>Top :</strong> {index + 1}
            </span>
            </Link>
          </div>
        ))}
      </div>
      {visibleCount < topProfessionals.length && (
        <button
          onClick={handleViewMore}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          View More
        </button>
      )}
    </div>
  );
}
