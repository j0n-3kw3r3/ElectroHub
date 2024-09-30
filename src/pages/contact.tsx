import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import bg from "../assets/image/circuit.jpg";
import CustomInput from "../components/useinput";
import { ChatBubbleBottomCenterTextIcon, EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import CustomTextArea from "../components/usetextarea";

const schema = z.object({
  name: z.string(),
  message: z.string(),
  email: z.string().email(),
});

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: loginEP,
  //   onSuccess: (data) => {
  //     dispatch(loginSuccess(data));
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     toast.error("Invalid Credentials");
  //   },
  // });

  // //  function to handle the form submission
  // const submitHandler = async (data) => {
  //   try {
  //     await mutateAsync(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="">
      <div className="relative bg-cover bg-center md:h-40 h-32 ">
        <div className="absolute inset-0 bg-black/80 z-10 "></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="md:text-4xl text-xl font-bold text-white/90">Contact Us</h1>
        </div>
        <img src={bg} alt="" className=" absolute top-0 z-0 w-full h-full object-cover " />
      </div>
      <div className="bg-white/80 md:p-18 p-10 px-[10%] md:flex space-y-16 md:space-y-0  gap-32 rounded-lg  mx-auto">
        <form className="space-y-6 flex-1 md:max-w-md">
          <CustomInput
            type="text"
            variant="bordered"
            label="Name"
            radius="sm"
            name="name"
            placeholder="Enter your name"
            errors={errors}
            classStyle="w-full mb-10    "
            register={register}
            icon={<UserIcon className="size-5 text-default-400 pointer-events-none " />}
          />

          <CustomInput
            type="email"
            variant="bordered"
            label="Email"
            radius="sm"
            name="email"
            placeholder="emailyou@example.com"
            errors={errors}
            classStyle="w-full mb-24  "
            register={register}
            icon={<EnvelopeIcon className="size-5 text-default-400 pointer-events-none " />}
          />

          <CustomTextArea
            type="text"
            variant="bordered"
            radius="sm"
            label="Message"
            name="message"
            placeholder="Enter your message"
            errors={errors}
            classStyle=" w-full mb-24  "
            register={register}
            icon={<ChatBubbleBottomCenterTextIcon className="size-5 text-default-400 pointer-events-none " />}
          />
          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white text-sm py-2 px-4 w-full rounded hover:bg-primary/80 transition-colors duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
        <div className=" text-sm">
          <div className=" ">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4 md:space-x-8">
              <BsInstagram size={15} className=" cursor-pointer" />
              <FaXTwitter size={15} className=" cursor-pointer" />
              <FaFacebookF size={15} className=" cursor-pointer" />
              <FaLinkedinIn size={15} className=" cursor-pointer" />
            </div>
          </div>
          <div className="mt-8 ">
            <h2 className=" font-semibold mb-4">Other Contact Information</h2>
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
