"use server";

import {
  Booking,
  DateBi,
  MessageObj,
  MessageStart,
  Payment,
} from "../type/type";
import { decodeTokenGetUserId } from "./jwtDecoder";

export const messageStart = async (
  messageStart: MessageStart,
  token: string
) => {
  try {
    console.log("messageStart Service -", messageStart);
    console.log("token Service -", decodeTokenGetUserId(token));
    // const url = process.env.NEXT_MESSAGE_START;
    // if (url) {
    //   const res = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({
    //       message: messageStart.message,
    //       booking: messageStart.booking,
    //     }),
    //   });
    //   console.log("putWishlists-1", res.status);
    //   if (!res.ok) {
    //     console.log("putWishlists-0");
    //     return null;
    //   }

    //   return res.status;
    // }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};
function convertDate(dateString: string): DateBi {
  const dateObj = new Date(dateString);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return { day, month, year };
}
export const getAllChat = async (token: string) => {
  try {
    const url = process.env.NEXT_GET_ALL_CHAT;

    if (url) {
      const res = await fetch(url, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await res.json();
      let result: MessageObj[] = [];
      for (let i = 0; i < responseData.length; i++) {
        const checkInDate = convertDate(responseData[i].booking.checkInDate);
        const checkOutDate = convertDate(responseData[i].booking.checkOutDate);
        const tempBooking: Booking = {
          apartmentId: responseData[i].booking.checkInDate,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          totalPrice: responseData[i].booking.totalPrice,
          payment: responseData[i].booking.payment,
        };
        const temp: MessageObj = {
          fotoMaster: responseData[i].fotoMaster,
          fotoApartment: responseData[i].fotoApartment,
          nameApartment: responseData[i].nameApartment,
          nameMaster: responseData[i].nameMaster,
          booking: tempBooking,
          message: responseData[i].message,
        };
        result.push(temp);
      }
      return result;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};
