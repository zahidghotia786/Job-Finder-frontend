import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../Context";

export default function ClientBooking() {
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const [visibleBookings, setVisibleBookings] = useState(5);

    const { setCount } = useContext(UserContext)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:3002/bookings');
                setBookings(response.data); // No need to await response.data
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        const totalCount = bookings.filter(booking => booking.professionalProfile._id === id).length;
        setCount(totalCount);
    }, [bookings, id]);

    const showMoreBookings = () => {
        setVisibleBookings(prevCount => prevCount + 5);
    };

    const filteredBookings = bookings
        .filter(booking => booking.professionalProfile._id === id)
        .slice()
        .reverse();
    const canShowMore = visibleBookings < filteredBookings.length;

    return (
        <div className="p-4 mt-5 w-full flex flex-col items-center">
            <h1 className="mt-10 mb-4 text-xl sm:text-2xl font-bold text-shadow">
                🔻 Client's Bookings 🔻
            </h1>
                 <div className="w-[250px] h-[4px] bg-blue-700 mb-10 rounded-full"></div>
            <div className="w-full border flex flex-wrap justify-around gap-3 p-2 pt-10">
            {/* Map through visible bookings */}
            {filteredBookings.slice(0, visibleBookings).map((booking) => {
                const { userProfile, startDate, endDate, hours, location, _id } = booking; 
                return (
                    <div key={_id} className="relative w-[300px] sm:w-[240px] bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-xl rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-500 ease-in-out">

                        <div className="p-5 flex flex-col items-center justify-between space-y-6">
                            {/* Top section with gradient and icon */}
                            <div className="w-full flex justify-between items-center">
                                <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                                    Booking Info
                                </h2>
                                <div className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-full shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h1m0-4h-1v2h1v2h-1m-1 6v-1m0-4V7m0-3v3m-4 2v-2m0-2v4" />
                                    </svg>
                                </div>
                            </div>

                            {/* Booking Details */}
                            <div className="w-full text-left">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Client: <span className="text-indigo-500">{userProfile.firstName} {userProfile.lastName}</span>
                                </h3>
                                <p className="mt-1 text-gray-600">📞 Phone: {userProfile.phone}</p>
                                <p className="mt-1 text-gray-600">📅 Start Date: <span className="text-indigo-500">{new Date(startDate).toLocaleDateString()}</span></p>
                                <p className="mt-1 text-gray-600">📅 End Date: <span className="text-indigo-500">{new Date(endDate).toLocaleDateString()}</span></p>
                                <p className="mt-1 text-gray-600">⏳ Hours: {hours}</p>
                                <p className="mt-1 text-gray-600">📍 Location: <span className="text-indigo-500">{location}</span></p>
                            </div>

                            {/* Call-to-action button */}
                            <a href={`mailto:${userProfile.email}`} className="w-full mt-4 text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-2 rounded-lg shadow-lg hover:from-blue-500 hover:to-purple-600 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
                                Send Mail
                            </a>

                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 bg-pink-400 bg-opacity-20 h-32 w-32 rounded-full blur-xl"></div>
                            <div className="absolute bottom-0 left-0 bg-blue-400 bg-opacity-20 h-32 w-32 rounded-full blur-xl"></div>
                        </div>
                    </div>
                );
            })}
            </div>
            {/* Show More Button */}
            {canShowMore && (
                <div className="w-full text-center mt-6">
                    <button onClick={showMoreBookings} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out">
                        See More
                    </button>
                </div>
            )}
        </div>
    );
}
