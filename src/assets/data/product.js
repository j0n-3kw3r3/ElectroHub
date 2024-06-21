
import arduino from "../image/arduino.png";
import PowerSupply from "../image/DC Power Supply Variable, 120V 3A Bench Power Supply.png";
import PowerSupply2 from "../image/DC Power Supply Variable, 120V 3A Bench Power Supply2.jpg";
import PowerSupply3 from "../image/DC Power Supply Variable, 120V 3A Bench Power Supply3.jpg";
import PowerSupply4 from "../image/DC Power Supply Variable, 120V 3A Bench Power Supply4.jpg";
import Zoyi from "../image/Zoyi ZT-109 Small Handheld Tester Autoranging Digital Multimeter.png";
import NE555 from "../image/NE555 Timer.png";
import Raspberry from "../image/Raspberry pi 4(4GB RAM).png";

export const products = [
  {
    id: 1,
    title: "Arduino uno r3",
    img: [arduino,  PowerSupply3, PowerSupply4],
    price: 13500.0,
    discount: 30000,
    description:
      "The Arduino Uno R3 is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz quartz crystal, a USB connection, and more.",
    star: 3.5,
    liked: false,
    new: true,
    reviews: [
      {
        id: 1,
        name: "John",
        comment: "Great product!",
        rating: 4.5,
      },
      {
        id: 2,
        name: "Jane",
        comment: "Works perfectly!",
        rating: 5,
      },
    ],
    inStock: true,
    category: "Microcontrollers",
  },
  {
    id: 2,
    title: "Raspberry pi 4(4GB RAM)",
    img: [Raspberry,  PowerSupply2, PowerSupply3, PowerSupply4],
    price: 85000.0,
    star: 1,
    discount: 105000.0,
    description:
      "The Raspberry Pi 4 is a powerful single-board computer with 4GB of RAM. It can be used for various projects such as home automation, media center, and more.",
    liked: true,
    new: false,
    reviews: [
      {
        id: 1,
        name: "Mike",
        comment: "Excellent device!",
        rating: 4.8,
      },
      {
        id: 2,
        name: "Sarah",
        comment: "Highly recommended!",
        rating: 4.5,
      },
    ],
    inStock: true,
    category: "Single-board Computers",
  },
  {
    id: 3,
    title: "NE555 Timer IC",
    img: [NE555, , PowerSupply2, PowerSupply3, PowerSupply4],
    price: 100.0,
    star: 2.5,
    discount: 200.0,
    description:
      "The NE555 is a highly stable timer IC that can be used for various timing applications. It is commonly used in electronic circuits for generating accurate time delays and oscillations.",
    liked: true,
    new: true,
    reviews: [
      {
        id: 1,
        name: "David",
        comment: "Great value for money!",
        rating: 4.2,
      },
      {
        id: 2,
        name: "Emily",
        comment: "Easy to use!",
        rating: 4.7,
      },
    ],
    inStock: false,
    category: "Integrated Circuits",
  },
  {
    id: 4,
    title: "Zoyi ZT-109 Small Handheld Tester Autoranging Digital Multimeter",
    img: [Zoyi, , PowerSupply2, PowerSupply3, PowerSupply4],
    price: 25000.0,
    star: 5,
    discount: 27500.0,
    description:
      "The Zoyi ZT-109 is a small handheld digital multimeter with autoranging capabilities. It can measure voltage, current, resistance, and more, making it a versatile tool for electronics enthusiasts.",
    liked: false,
    new: true,
    reviews: [
      {
        id: 1,
        name: "Alex",
        comment: "Very accurate readings!",
        rating: 4.5,
      },
      {
        id: 2,
        name: "Olivia",
        comment: "Compact and portable!",
        rating: 4.3,
      },
    ],
    inStock: true,
    category: "Test and Measurement",
  },
  {
    id: 5,
    title: "DC Power Supply Variable, 120V 3A Bench Power Supply",
    img: [PowerSupply, PowerSupply2, PowerSupply3, PowerSupply4],
    price: 85000.0,
    star: 1.5,
    discount: 105000.0,
    description:
      "The DC Power Supply Variable is a bench power supply that provides adjustable DC voltage and current output. It is commonly used in electronics labs for powering and testing circuits.",
    liked: true,
    new: false,
    reviews: [
      {
        id: 1,
        name: "Sophia",
        comment: "Great quality!",
        rating: 4.6,
      },
      {
        id: 2,
        name: "James",
        comment: "Very reliable!",
        rating: 4.4,
      },
    ],
    inStock: false,
    category: "Power Supplies",
  },
  {
    id: 6,
    title: "NE555 Timer IC",
    img: [NE555, , PowerSupply2, PowerSupply3, PowerSupply4],
    price: 100.0,
    star: 4.5,
    discount: 200.0,
    description:
      "The NE555 is a highly stable timer IC that can be used for various timing applications. It is commonly used in electronic circuits for generating accurate time delays and oscillations.",
    liked: true,
    new: true,
    reviews: [
      {
        id: 1,
        name: "Daniel",
        comment: "Great value for money!",
        rating: 4.2,
      },
      {
        id: 2,
        name: "Emma",
        comment: "Easy to use!",
        rating: 4.7,
      },
    ],
    inStock: true,
    category: "Integrated Circuits",
  },
  {
    id: 7,
    title: "Zoyi ZT-109 Small Handheld Tester Autoranging Digital Multimeter",
    img: [Zoyi, , PowerSupply2, PowerSupply3, PowerSupply4],
    price: 25000.0,
    star: 3.5,
    discount: 27500.0,
    description:
      "The Zoyi ZT-109 is a small handheld digital multimeter with autoranging capabilities. It can measure voltage, current, resistance, and more, making it a versatile tool for electronics enthusiasts.",
    liked: false,
    new: true,
    reviews: [
      {
        id: 1,
        name: "Liam",
        comment: "Very accurate readings!",
        rating: 4.5,
      },
      {
        id: 2,
        name: "Ava",
        comment: "Compact and portable!",
        rating: 4.3,
      },
    ],
    inStock: true,
    category: "Test and Measurement",
  },
];
