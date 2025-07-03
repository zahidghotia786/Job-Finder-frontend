import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import PropTypes from "prop-types";

const testimonialList = [
	{
		author: {
			fullName: "Sarah Johnson",
			picture: "https://cdn.easyfrontend.com/pictures/users/user1.jpg",
			designation: "Client",
		},
		rating: 5,
		description:
			"I had an amazing experience finding a skilled electrician through this platform. The service was prompt, and the professional was highly qualified. Highly recommend!",
	},
	{
		author: {
			fullName: "David Brown",
			picture: "https://cdn.easyfrontend.com/pictures/users/user2.jpg",
			designation: "Client",
		},
		rating: 4.8,
		description:
			"As a busy professional, I appreciate how easy it is to connect with trusted healthcare providers. The doctor I found through this platform was attentive and caring. Thank you for such a wonderful service!",
	},
	{
		author: {
			fullName: "Emily White",
			picture: "https://cdn.easyfrontend.com/pictures/users/user3.jpg",
			designation: "Client",
		},
		rating: 5,
		description:
			"I needed a plumber urgently, and this platform connected me with a great professional within minutes. The service was fast and efficient. I will definitely use this service again!",
	},
	{
		author: {
			fullName: "Michael Smith",
			picture: "https://cdn.easyfrontend.com/pictures/users/user4.jpg",
			designation: "Client",
		},
		rating: 4.5,
		description:
			"I found an excellent nurse through this platform for my father's care. The nurse was compassionate and skilled, making the entire process much easier for our family. Thank you!",
	},
	{
		author: {
			fullName: "Olivia Williams",
			picture: "https://cdn.easyfrontend.com/pictures/users/user5.jpg",
			designation: "Client",
		},
		rating: 4.9,
		description:
			"This platform is a lifesaver! I was able to find a highly-rated doctor within my locality quickly. The appointment process was seamless, and the staff were very professional.",
	},
];


const Rating = ({ rating, showLabel, className, ...rest }) => (
	<p className={classNames("mb-6", className)} {...rest}>
		<span>
			{[...Array(5)].map((_, i) => {
				const index = i + 1;
				let content = "";
				if (index <= Math.floor(rating))
					content = (
						<FontAwesomeIcon icon={faStar} className="text-yellow-500" />
					);
				else if (rating > i && rating < index + 1)
					content = (
						<FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />
					);
				else if (index > rating)
					content = (
						<FontAwesomeIcon
							icon={faStar}
							className="text-yellow-200 dark:text-opacity-20"
						/>
					);

				return <Fragment key={i}>{content}</Fragment>;
			})}
		</span>
		{showLabel && <span>{rating.toFixed(1)}</span>}
	</p>
);

Rating.propTypes = {
	rating: PropTypes.number.isRequired,
	showLabel: PropTypes.bool,
	className: PropTypes.string,
};

const TestimonialItem = ({ testimonial }) => (
	<div className="bg-gray-100 shadow-xl rounded-2xl transition duration-300 h-full p-6">
		<div className="mt-4">
			<Rating rating={testimonial.rating} showLabel={false} />
			<p className="opacity-50 mb-6">{testimonial.description}</p>
			<div className="flex items-center">
				<div className="mr-2">
					<img
						src={testimonial.author.picture}
						alt={testimonial.author.fullName}
						className="max-w-full h-auto rounded-full border"
						width="47"
					/>
				</div>
				<div>
					<h4 className="text-xl font-medium">{testimonial.author.fullName}</h4>
					<p className="text-sm">
						<i>{testimonial.author.designation}</i>
					</p>
				</div>
			</div>
		</div>
	</div>
);

TestimonialItem.propTypes = {
	testimonial: PropTypes.object.isRequired,
};

const Testimonial = () => {
	return (
		<section className="ezy__testimonial1 light py-14 md:py-24 bg-[#c4c4c5] ">
			<div className="container px-4 mx-auto">
				<div className="flex justify-center md:mb-6">
					<div className="sm:max-w-lg text-center">
						<h2 className="text-3xl leading-none md:text-[45px] font-bold mb-4">
							Community Reviews
						</h2>
						<p>
							Experience the convenience of connecting with professionals in your area for all your needs. Hear from our satisfied clients!
						</p>
					</div>
				</div>
				<div className="grid grid-cols-6 gap-6 pt-8">
					{testimonialList.map((testimonial, i) => (
						<div className="col-span-6 md:col-span-3 lg:col-span-2" key={i}>
							<TestimonialItem testimonial={testimonial} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};


export default Testimonial;
