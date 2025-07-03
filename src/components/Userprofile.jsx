import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "./Loader";
import ClientReview from "./ClientReview";
import ClientBooking from "./ClientBooking";
import UserContext from "../Context";

export default function Userprofile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentUser, setCurrentUser] = useState('')
  const { count, starRating } = useContext(UserContext)


  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    hours: 0,
    location: "",
    professionalId: id,
    userId: currentUser._id
  });

  useEffect(() => {
    if (currentUser) {
      setBookingData(prevData => ({
        ...prevData,
        userId: currentUser._id.toString()
      }));
    }
  }, [currentUser]);

  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
    professionalId: id,
    userId: currentUser._id
  });

  useEffect(() => {
    if (currentUser) {
      setReviewData(prevData => ({
        ...prevData,
        userId: currentUser._id.toString()
      }));
    }
  }, [currentUser]);


  // Fetch the user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/userId/${id}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);


  const getProfile = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`http://localhost:3002/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setCurrentUser(response.data);

  }


  useEffect(() => {
    getProfile()
  }, [])


  const handleBookingSubmit = async () => {
    try {
      await axios.post(`http://localhost:3002/bookUser`, bookingData);
      setShowBookingModal(false);
      alert("Booking successful!");
    } catch (error) {
      console.error(error);
    }
  };



  // Handle review form submission
  const handleReviewSubmit = async () => {
    try {
      await axios.post(`http://localhost:3002/reviewUser`, reviewData)

      setShowReviewModal(false);
      alert("Review submitted!");
    } catch (error) {
      console.error(error);
    }
  };



  // Render loading state if data isn't available
  if (!user) {
    return <div className="w-screen h-screen flex justify-center items-center"><Loader /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
<div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6 relative overflow-hidden">
  {/* Profile Image or Placeholder */}
  <div className="flex items-center justify-center mb-6">
    {user.profileImage ? (
      <img
        className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        src={`http://localhost:3002/${user.profileImage}`}
        alt={`${user.firstName} ${user.lastName}`}
      />
    ) : (
      <div className="bg-blue-500 rounded-full text-white w-32 h-32 flex items-center justify-center text-2xl font-bold shadow-md">
        {user.firstName[0]}{user.lastName[0]}
      </div>
    )}
  </div>

  {/* User Information */}
  <div className="text-center mb-6">
    <h2 className="text-3xl font-bold text-gray-800">{user.firstName} {user.lastName}</h2>
    <p className="text-gray-600 mb-4">{user.professionalCategory}</p>
  </div>

  {/* Booking and Rating Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-4">
    <div className="bg-gray-100 text-gray-800 font-semibold text-lg p-3 rounded-md shadow-md">
      <h1>Bookings: {count}</h1>
    </div>
    <div className="bg-gray-100 text-gray-800 font-semibold text-lg p-3 rounded-md shadow-md">
      <h1>Rating: {starRating}% ⭐</h1>
    </div>
  </div>

  {/* User Location and Contact Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mb-4">
    <div>
      <p className="font-semibold text-gray-700">Location:</p>
      <p>{user.city}, {user.zone}, {user.province}</p>
    </div>
    <div>
      <p className="font-semibold text-gray-700">Email:</p>
      <a href={`mailto:${user.email}`} className="hover:text-blue-500">
        {user.email}
      </a>
    </div>
    <div>
      <p className="font-semibold text-gray-700">Phone:</p>
      <a href={`tel:${user.phone}`} className="hover:text-blue-500">
        {user.phone}
      </a>
    </div>
    <div>
      <p className="font-semibold text-gray-700">Hourly Rate:</p>
      <p>${user.costPerHour}/hour</p>
    </div>
    <div>
      <p className="font-semibold text-gray-700">Work At Home:</p>
      <p>{user.workAtHome} available for work at home</p>
    </div>
    <div className="md:col-span-2">
      <p className="font-semibold text-gray-700">About Me:</p>
      <p>{user.aboutMe}</p>
    </div>
  </div>

  {/* Booking and Review Buttons */}
  <div className="flex justify-center space-x-4 mt-6">
    <button
      onClick={() => setShowBookingModal(true)}
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
    >
      Book This Professional
    </button>
    <button
      onClick={() => setShowReviewModal(true)}
      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
    >
      Leave a Review
    </button>
  </div>
</div>


      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Book This Professional</h2>
            <label className="block mb-2">Start Date</label>
            <input
              type="date"
              value={bookingData.startDate}
              onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
              className="border p-2 w-full mb-4"
            />
            <label className="block mb-2">End Date</label>
            <input
              type="date"
              value={bookingData.endDate}
              onChange={(e) => setBookingData({ ...bookingData, endDate: e.target.value })}
              className="border p-2 w-full mb-4"
            />
            <label className="block mb-2">Hours</label>
            <input
              type="number"
              value={bookingData.hours}
              onChange={(e) => setBookingData({ ...bookingData, hours: e.target.value })}
              className="border p-2 w-full mb-4"
            />
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={bookingData.location}
              onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
              className="border p-2 w-full mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleBookingSubmit}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Submit
              </button>
              <button
                onClick={() => setShowBookingModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
            <label className="block mb-2">Star Rating (0 to 5)</label>
            <input
              type="number"
              value={reviewData.rating}
              onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
              min="0"
              max="5"
              className="border p-2 w-full mb-4"
            />
            <label className="block mb-2">Comment</label>
            <textarea
              value={reviewData.comment}
              onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
              className="border p-2 w-full mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleReviewSubmit}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              >
                Submit
              </button>
              <button
                onClick={() => setShowReviewModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {/* client booking  */}

      <ClientBooking />

      {/* review client  */}

      <ClientReview />
    </div>
  );
}
