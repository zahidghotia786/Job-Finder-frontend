import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function Category({ searchTerm }) {
    const [professional, setProfessional] = useState([]);
    const [visibleCount, setVisibleCount] = useState(4); // Initially show 4 professionals

    useEffect(() => {
        fetchingUser();
    }, []);

    const fetchingUser = async () => {
        try {
            const response = await axios.get('http://localhost:3002/allUsers');
            // Get the current date
            const currentDate = new Date();

            // Assign createdAt date to each user
            const usersWithDate = response.data.map(user => ({
                ...user,
                createdAt: currentDate // Set createdAt to current date
            }));

            setProfessional(usersWithDate);
        } catch (error) {
            console.error("Error fetching professional users:", error);
        }
    };

    const showMore = () => {
        setVisibleCount(prevCount => prevCount + 4); // Show 4 more professionals
    };

    // Function to truncate text to a specified number of words
    const truncateText = (text, limit) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
    };

    // Filter professionals by search term or return all if searchTerm is empty
    const filteredProfessionals = searchTerm 
        ? professional.filter(user =>
            user.professionalCategory.toLowerCase().includes(searchTerm.toLowerCase())
        ) 
        : professional;


    return (
        <div className="container p-4 mt-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Meet Our Professionals</h2>
            <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProfessionals.length > 0 ? (
                    filteredProfessionals.slice(0, visibleCount).map(user => (
                        <div key={user._id} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border rounded-lg overflow-hidden bg-white shadow-lg p-6 relative">
                            {/* Profile Image */}
                            <Link to={`userprofile/${user._id}`}>
                                {user.profileImage ? (
                                    <img
                                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-300 shadow-md"
                                        src={`http://localhost:3002/${user.profileImage}`}
                                        alt={`${user.firstName} ${user.lastName}`}
                                    />
                                ) : (
                                    <div className="bg-indigo-200 rounded-full w-24 h-24 flex items-center justify-center border-4 border-white shadow-md mb-4">
                                        <span className="text-4xl">👤</span>
                                    </div>
                                )}

                                {/* Name and Basic Info */}
                                <h3 className="text-xl font-semibold text-center text-gray-800">{user.firstName} {user.lastName}</h3>
                                <p className="text-center text-gray-600">{user.professionalCategory}</p>

                                {/* About Me with Word Limit */}
                                <p className="mt-4 text-sm text-gray-700">{truncateText(user.aboutMe, 20)}</p>

                                {/* Location */}
                                <p className="mt-2 text-sm text-gray-500">
                                    {user.city}, {user.province} - {user.zone}
                                </p>

                                {/* Cost Per Hour */}
                                <p className="mt-4 text-center font-bold text-indigo-600">
                                    Cost per hour: <span className="text-gray-800">${user.costPerHour}</span>
                                </p>
                            </Link>

                            {/* Badge for Additional Engagement */}
                            {user.createdAt && new Date() - new Date(user.createdAt) < 7 * 24 * 60 * 60 * 1000 && (
                                <div className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                    New
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className=" w-screen h-max flex justify-center items-center bg-gray-50"><Loader /></div>
                )}
            </div>

            {/* Show More Button */}
            {visibleCount < filteredProfessionals.length && (
                <div className="text-center mt-8">
                    <button
                        onClick={showMore}
                        className="bg-indigo-600 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out">
                        View More
                    </button>
                </div>
            )}
        </div>
    );
}
