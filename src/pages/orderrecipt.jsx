import { useNavigate, useParams } from "react-router-dom";
import { fetchOrdersEP } from "../services";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";

const OrderReceipt = () => {
  const orderId = useParams().orderId;
  const navigate = useNavigate();

  const {
    isPending,
    error,
    data: orders,
  } = useQuery({
    queryKey: ["Orders"],
    queryFn: fetchOrdersEP,
  });

  const order = orders?.find((order) => order.orderId === orderId);

  if (isPending) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="">
      <div className="grid grid-cols-3 ">
        <div className="bg-white/80 px-16 py-10 col-span-2  md">
          <div className="border shadow p-10">
            <h2 className="text-2xl font-bold mb-4">
              Your Order <u className=" text-primary">#{orderId}</u> Has Been Placed
            </h2>
            <p className="text-gray-700 mb-4">
              Thank you for shopping at Electrohub. Your order has been placed and will ship soon.
            </p>

            <div className="mb-10">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2 ">Item(s)</th>
                    <th className="text-left py-2 "></th>
                    <th className="text-right py-2 ">Unit Price($)</th>
                    <th className="text-right py-2 ">Quantity</th>
                    <th className="text-right py-2 ">Total Price($)</th>
                  </tr>
                </thead>
                <tbody className=" text-sm  ">
                  {order?.orderItems.map((item) => (
                    <tr key={item.id} className="pb-8 border-b ">
                      <td className=" pr-4">
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="w-8 h-8 object-cover  "
                        />
                      </td>
                      <td className=" py-2 truncate ">{item.product.name}</td>
                      <td className=" py-2 text-right">{item.product.price}</td>
                      <td className=" py-2 text-right">{item.quantity}</td>
                      <td className=" py-2  font-semibold text-right">{item.product.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">What's Next</h3>
              <p className="text-gray-700">
                Now that your order has been placed, you can keep track of it through your account. You'll also receive
                a shipment confirmation email when your order leaves our fulfillment center.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Payment</h3>
              <p className="text-gray-700">
                Payment orders are subject to a 28-hour verification delay. This policy protects all parties from
                unauthorized use of credit information.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Shipment</h3>
              <p className="text-gray-700">
                Your order may arrive in multiple shipments, but you will not be charged extra. Shipping charges for the
                entire order will be based on the final shipment.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">
                Have Questions? We have three easy ways for you to get answers!
              </h3>
              <ul className="list-disc pl-4">
                <li className="text-gray-700">Login to your account to view and modify your order history.</li>
                <li className="text-gray-700">
                  Visit our Customer Help Center, where you can submit questions and view our knowledge base.
                </li>
                <li className="text-gray-700">Call +234 810 915 6506 for friendly, informed customer service.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-primary/5  py-10 space-y-4">
          <div className=" mx-8 bg-white/80 border shadow rounded p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Thanks for Your Order!</h2>
              <p className="text-gray-700 mb-2">Order number: #{orderId}</p>
              <a href="#" className="text-primary underline mb-4">
                Track your order here
              </a>
            </div>
            <div className=" bg-primary/5 mx-[5%] rounded p-4 space-y-2 ">
              <div className="border-b">
                <div className=" mb-4">
                  <h3 className="text-xl font-bold">Shipping Address</h3>
                  <p className="text-gray-700">
                    {order?.street} {order?.city} {order?.country} {order?.postalCode}
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Payment</h3>
                  <p className="text-gray-700">Card ending in 2818</p>
                </div>
              </div>
              <div className="mb-4">
                <h3 className=" cursor-pointer underline font-bold ">Manage or cancel your order</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10 border-t ">
        <div className="border-t flex items-center border-b p-4 border-primary rounded-lg ">
          <div className=" flex-1">
            <h3 className="text-lg font-semibold mb-2">Tell us what you think</h3>
            <p className="text-gray-700 mb-4">Take our quick online survey to tell us about your experience.</p>
          </div>
          <Button
            onClick={() => {
              navigate("/contact-us");
            }}
            className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary/80"
          >
            Leave Feedback
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
