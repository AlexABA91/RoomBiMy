"use server";

import { Booking, Payment } from "../type/type";

export const bookingFetch = async (booking: Booking, token: string) => {
  try {
    const url = process.env.NEXT_ADD_BOOKING_ID;
    if (url) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          apartmentId: booking.apartmentId,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          totalPrice: booking.totalPrice,
          payment: booking.payment,
        }),
      });
      console.log("putWishlists-1", res.status);
      if (!res.ok) {
        console.log("putWishlists-0");
        return null;
      }

      return res.status;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export const bookingPayment = async (token: string) => {
  try {
    const url = process.env.NEXT_GET_PAYMENT_ID;
    if (url) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("status=-", res.status);
      const responseData: Payment[] = await res.json();
      console.log("bookingPayment =-", responseData);
      return responseData;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};
