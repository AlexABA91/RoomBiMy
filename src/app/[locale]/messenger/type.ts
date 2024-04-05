// import { DateBi, MessageObj, Payment } from "@/app/type/type";

// function convertDate(dateString: string): DateBi {
//   const dateObj = new Date(dateString);
//   const day = dateObj.getDate();
//   const month = dateObj.getMonth() + 1;
//   const year = dateObj.getFullYear();

//   return { day, month, year };
// }

// const payment: Payment = {
//   cardNumber: "string",
//   expirationDate: "string",
//   cvv: "string",
//   cardType: "string",
// };

// export const Message: MessageObj[] = [
//   {
//     fotoMaster: "avatar1.jpg",
//     fotoApartment: "1.jpg",
//     nameApartment: "The Cromwell Collection",
//     nameMaster: "Jane Smith",
//     booking: {
//       apartmentId: 1,
//       checkInDate: convertDate("2024-03-21T23:02:28.700184"),
//       checkOutDate: convertDate("2024-03-28T23:02:28.700211"),
//       totalPrice: 200,
//       payment: payment,
//     },
//     message: [
//       {
//         comment: "Привіт, як ви?",
//         dateTime: "2024-03-21T19:02:28.925299",
//         rentalApartmentId: 1,
//         masterIdUser: 14,
//       },
//       {
//         comment: "Добрий вечір, як я можу вам допомогти?",
//         dateTime: "2024-03-21T20:02:28.933971",
//         rentalApartmentId: 1,
//         masterIdUser: 1,
//       },
//       {
//         comment: "Дуже хочу орендувати кімнату від вас.",
//         dateTime: "2024-03-21T21:02:28.934047",
//         rentalApartmentId: 1,
//         masterIdUser: 14,
//       },
//       {
//         comment: "О, ласкаво просимо! З радістю вас побачу.",
//         dateTime: "2024-03-21T22:02:28.934064",
//         rentalApartmentId: 1,
//         masterIdUser: 1,
//       },
//     ],
//   },
//   {
//     fotoMaster: "avatar2.jpg",
//     fotoApartment: "21.jpg",
//     nameApartment: "Tulse Hill Luxury Cosy Rooms",
//     nameMaster: "John Doe",
//     booking: {
//       apartmentId: 2,
//       checkInDate: convertDate("2024-03-31T23:02:28.714536"),
//       checkOutDate: convertDate("2024-04-04T23:02:28.714536"),
//       totalPrice: 300,
//       payment: payment,
//     },
//     message: [
//       {
//         comment:
//           "Добрий день! Ми сім'я з чотирьох осіб і хотіли б забронювати дім на літні канікули. Чи є вас підходящі варіанти?",
//         dateTime: "2024-03-21T19:02:28.93408",
//         rentalApartmentId: 2,
//         masterIdUser: 14,
//       },
//       {
//         comment:
//           "Доброго дня! Так, у нас є декілька варіантів для вашої сім'ї. Скільки часу ви плануєте провести у нас?",
//         dateTime: "2024-03-21T20:02:28.934094",
//         rentalApartmentId: 2,
//         masterIdUser: 2,
//       },
//       {
//         comment:
//           "Ми плануємо залишитися на два тижні, приблизно з 15 липня по 1 серпня. Чи є доступні дати в цей період?",
//         dateTime: "2024-03-21T21:02:28.934119",
//         rentalApartmentId: 2,
//         masterIdUser: 14,
//       },
//       {
//         comment:
//           "Так, у нас є доступні дати на ваш період перебування. Які у вас вимоги до дому? Наприклад, скільки спалень вам потрібно?",
//         dateTime: "2024-03-21T22:02:28.934132",
//         rentalApartmentId: 2,
//         masterIdUser: 2,
//       },
//     ],
//   },
//   {
//     fotoMaster: "avatar3.jpg",
//     fotoApartment: "31.jpg",
//     nameApartment: "Camden House",
//     nameMaster: "Alice Johnson",
//     booking: {
//       apartmentId: 3,
//       checkInDate: convertDate("2024-03-23T23:02:28.714554"),
//       checkOutDate: convertDate("2024-04-04T23:02:28.714554"),
//       totalPrice: 300,
//       payment: payment,
//     },
//     message: [
//       {
//         comment:
//           "Привіт! Цикавить чи є на кухні все необхідне обладнання для приготування їжи?",
//         dateTime: "2024-03-21T20:02:28.934146",
//         rentalApartmentId: 3,
//         masterIdUser: 14,
//       },
//       {
//         comment: "Так, кухня повністю обладнана.",
//         dateTime: "2024-03-21T21:02:28.934164",
//         rentalApartmentId: 3,
//         masterIdUser: 3,
//       },
//     ],
//   },
// ];
