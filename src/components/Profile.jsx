import { useState, useEffect } from 'react';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        province: '',
        city: '',
        zone: '',
        email: '',
        phone: '',
        professionalCategory: '',
        aboutMe: '',
        costPerHour: '',
        profileImage: null,
        workAtHome: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch user profile data
    const getProfile = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found, user is not authenticated');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3002/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setFormData(data);
            } else {
                console.log('Error fetching profile:', response.status);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file input change for profile image
    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            profileImage: e.target.files[0],
        });
    };

    // Handle form submission to update profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await fetch('http://localhost:3002/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                alert('Profile updated successfully!');
                getProfile(); // Refresh the profile data
                setIsEditing(false); // Close the edit form
            } else {
                console.log('Error updating profile:', response.status);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Profile Image and Header Section */}
            <div className="flex flex-col md:flex-row items-center mb-6">
                {user.profileImage ? (
                    <img
                        src={`http://localhost:3002/${user.profileImage}`}
                        alt="Profile"
                        className="rounded-full w-32 h-32 border-4 border-blue-600 shadow-md"
                    />
                ) : (
                    <div className="bg-gray-400 rounded-full w-32 h-32 flex items-center justify-center border-4 border-white shadow-md">
                        <span className="text-4xl">👤</span>
                    </div>
                )}
                <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold" style={{ textShadow: '1px 1px 2px blue' }}>{user.firstName} {user.lastName}</h2>
                    <p className="text-lg text-gray-700 mt-2" style={{ textShadow: '1px 1px 1px blue' }}>{user.professionalCategory}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-2 bg-blue-600 text-white text-[15px] font-medium px-4 py-1 rounded transition duration-300 hover:bg-blue-700"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* About Section */}
            <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2" style={{ textShadow: '1px 1px 1px blue' }}>About Me</h3>
                <p className="text-gray-600">{user.aboutMe || 'No information available'}</p>
            </div>

            {/* Additional Information */}
            <div className="space-y-4 mb-6">
                <h3 className="text-2xl font-semibold" style={{ textShadow: '1px 1px 1px blue' }}>Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-300 rounded">
                        <strong style={{ textShadow: '1px 1px blue' }}>Email:</strong> {user.email}
                    </div>
                    <div className="p-4 border border-gray-300 rounded">
                        <strong style={{ textShadow: '1px 1px 0px 0px lightblue' }}>Phone:</strong> {user.phone}
                    </div>

                    {user.userType === 'professional' ?
                        <div className="p-4 border border-gray-300 rounded">
                            <strong style={{ textShadow: '1px 1px 0px 0px lightblue' }}>City:</strong> {user.city}
                        </div>
                        : null}

                    {user.userType === 'professional' ?
                        <div className="p-4 border border-gray-300 rounded">
                            <strong style={{ textShadow: '1px 1px 0px 0px lightblue' }}>Province:</strong> {user.province}
                        </div>
                        : null}

                    {user.userType === 'professional' ?
                        <div className="p-4 border border-gray-300 rounded">
                            <strong style={{ textShadow: '1px 1px 0px 0px lightblue' }}>Zone:</strong> {user.zone}
                        </div>
                        : null}

                    {user.userType === 'professional' ?
                        <div className="p-4 border border-gray-300 rounded">
                            <strong style={{ textShadow: '1px 1px 0px 0px lightblue' }}>Work at Home:</strong> {user.workAtHome}
                        </div>
                        : null}
                    {user.userType === 'professional' ?
                        <div className="p-4 border border-gray-300 rounded">
                            <strong style={{ textShadow: '1px 1px 0px 0px lightblue' }}>Cost Per Hour:</strong> {user.costPerHour}$
                        </div>
                        : null}

                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden overflow-y-scroll">
                    <div className={`bg-white p-6 rounded shadow-md w-11/12 md:w-1/3 mt-[350px] ${user.userType === 'professional' ? 'mb-[10px] sm:mt-[280px]' : 'mt-0'}`}>
                        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="p-2 border border-gray-300 rounded w-full"
                            />

                            {user.userType === 'professional' ?
                                <input
                                    type="text"
                                    name="province"
                                    value={formData.province}
                                    onChange={handleChange}
                                    placeholder="Province"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                : null}

                            {user.userType === 'professional' ?
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                : null}

                            {user.userType === 'professional' ?
                                <input
                                    type="text"
                                    name="zone"
                                    value={formData.zone}
                                    onChange={handleChange}
                                    placeholder="Zone"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                : null}

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="p-2 border border-gray-300 rounded w-full"
                            />

                            {user.userType === 'professional' ?
                                <input
                                    type="text"
                                    name="professionalCategory"
                                    value={formData.professionalCategory}
                                    onChange={handleChange}
                                    placeholder="Professional Category"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                : null}

                            <textarea
                                name="aboutMe"
                                value={formData.aboutMe}
                                onChange={handleChange}
                                placeholder="About Me"
                                className="p-2 border border-gray-300 rounded w-full"
                                rows="4"
                            />

                            {user.userType === 'professional' ?
                                <input
                                    type="text"
                                    name="costPerHour"
                                    value={formData.costPerHour}
                                    onChange={handleChange}
                                    placeholder="Cost Per Hour"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                : null}

                            {user.userType === 'professional' ?
                                <input
                                    type="text"
                                    name="workAtHome"
                                    value={formData.workAtHome}
                                    onChange={handleChange}
                                    placeholder="Yes or No"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                : null}

                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
                                >
                                    Update Profile
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-red-600 text-white font-bold px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
