import list from "../assets/image/list.jpg";
import hobbyists from "../assets/image/hobbyists.jpg";
import electro from "../assets/image/electro.jpg";
import merchants from "../assets/image/merchants.jpg";
import customers from "../assets/image/customers.jpg";
import bg from "../assets/image/circuit.jpg";
import { Link } from "react-router-dom";

const AboutUs = () => { 
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-cover bg-center md:h-64 h-32 ">
        <div className="absolute inset-0 bg-black/80 z-10 "></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="md:text-4xl text-xl font-bold text-white/90">About Us</h1>
        </div>
        <img src={bg} alt="" className=" absolute top-0 z-0 w-full h-full object-cover " />
      </div>

      {/* Main Content */}
      <div className=" space-y-10 pb-16">
        {/* Who We Are Section */}
        <div className="flex flex-col md:flex-row items-center px-[5%] py-10  bg-primary/5 ">
          <div className="md:w-1/2 md:md:p-16 px-[5%] ">
            <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
            <p className="text-gray-700">
              Welcome to Electrohub, your one-stop shop for all your electronic component needs. We specialize in
              providing a wide range of electronic components including resistors, capacitors, integrated circuits
              (ICs), power supply units, and more. Our mission is to bridge the gap between merchants and customers by
              offering a seamless shopping experience.
            </p>
          </div>
          <div className="md:w-1/2  p-4">
            <img src={list} alt="Who We Are" className=" shadow-md  " />
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="flex flex-col md:flex-row-reverse items-center px-[5%] py-10 ">
          <div className="md:w-1/2 md:p-16 px-[5%] ">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to provide high-quality electronic components at competitive prices while ensuring
              exceptional customer service. We aim to support both hobbyists and professionals in their electronic
              projects by offering a comprehensive selection of components and tools.
            </p>
          </div>
          <div className="md:w-1/2 p-4">
            <img src={hobbyists} alt="Our Mission" className=" shadow-md    " />
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="flex flex-col md:flex-row items-center bg-primary/5 px-[5%] py-10 ">
          <div className="md:w-1/2 md:p-16 px-[5%] ">
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Resistors</li>
              <li>Capacitors</li>
              <li>Integrated Circuits (ICs)</li>
              <li>Power Supply Units</li>
              <li>And much more...</li>
            </ul>
          </div>
          <div className="md:w-1/2 p-4">
            <img src={electro} alt="What We Offer" className=" shadow-md  " />
          </div>
        </div>

        {/* Our Merchants Section */}
        <div className="flex flex-col md:flex-row-reverse items-center  px-[5%] py-10 ">
          <div className="md:w-1/2 md:p-16 px-[5%] ">
            <h2 className="text-2xl font-bold mb-4">Our Merchants</h2>
            <p className="text-gray-700">
              We partner with reputable merchants who share our commitment to quality and customer satisfaction. Our
              merchants are carefully selected to ensure that they provide genuine and reliable products.
            </p>
          </div>
          <div className="md:w-1/2 p-4">
            <img src={merchants} alt="Our Merchants" className=" shadow-md  " />
          </div>
        </div>

        {/* Our Customers Section */}
        <div className="flex flex-col md:flex-row items-center bg-primary/5 px-[5%] py-10 ">
          <div className="md:w-1/2 md:p-16 px-[5%] ">
            <h2 className="text-2xl font-bold mb-4">Our Customers</h2>
            <p className="text-gray-700">
              Our customers are at the heart of everything we do. Whether you are a DIY enthusiast, a student, or a
              professional engineer, we are here to support you with the best products and services. We value your
              feedback and strive to continuously improve our platform to meet your needs.
            </p>
          </div>
          <div className="md:w-1/2 p-4">
            <img src={customers} alt="Our Customers" className=" shadow-md  " />
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="text-center px-[10%] ">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions or need assistance, please do not hesitate to contact us. Our customer support
            team is always ready to help you.
          </p>
          <Link
            to="/contact-us"
            className="bg-primary text-white py-3 px-4 rounded hover:bg-primary/80 transition-colors duration-300"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
