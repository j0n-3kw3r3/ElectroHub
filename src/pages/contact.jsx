import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const ContactUs = () => {
  return (
    <div className="">
      <div className="relative bg-cover bg-center h-64 backgroundImage">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white text-center mb-8">Contact Us</h1>
        </div>
      </div>
      <div className="bg-white p-20 px-[10%] grid grid-cols-2 gap-32 rounded-lg  mx-auto">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none/80 focus:ring-primary/80 focus:border-primary/80 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none/80 focus:ring-primary/80 focus:border-blue/80-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none/80 focus:ring-primary/80 focus:border-primary/80 sm:text-sm"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/80 transition-colors duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
        <div className="">
          <div className=" ">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-8">
              <BsInstagram size={15} className=" cursor-pointer" />
              <FaXTwitter size={15} className=" cursor-pointer" />
              <FaFacebookF size={15} className=" cursor-pointer" />
              <FaLinkedinIn size={15} className=" cursor-pointer" />
            </div>
          </div>
          <div className="mt-8 ">
            <h2 className="text-xl font-semibold mb-4">Other Contact Information</h2>
            <p className="text-gray-700">Phone: (123) 456-7890</p>
            <p className="text-gray-700">Address: 123 Electronics Ave, Tech City, TX 12345</p>
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093746!2d144.9537353153169!3d-37.81627977975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1b6e1b0b1b!2s123%20Electronics%20Ave%2C%20Tech%20City%2C%20TX%2012345!5e0!3m2!1sen!2sus!4v1616161616161!5m2!1sen!2sus"
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
