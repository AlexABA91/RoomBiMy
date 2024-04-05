import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateBi, DateBooking, RentalApartmentDTO } from "@/app/type/type";
import { Draft } from "@reduxjs/toolkit";

type reserv = {
  id: number;
  date: DateBooking | null;
  numberOfGuests: number;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfBabies: number;
  numberOfAnimals: number;
  totalPrice: number;
  serviceFee: number;
  pricePerNight: number;
  status: string;
  rentalApartment: RentalApartmentDTO | null;
};

const initialState: reserv = {
  id: 0,
  date: null,
  numberOfGuests: 1,
  numberOfAdults: 1,
  numberOfChildren: 0,
  numberOfBabies: 0,
  numberOfAnimals: 0,
  totalPrice: 0,
  serviceFee: 0,
  pricePerNight: 0,
  status: "",
  rentalApartment: null,
};

const reservSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    setId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    setRentalApartment(state, action: PayloadAction<RentalApartmentDTO>) {
      state.rentalApartment = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setStartDate(state, action: PayloadAction<DateBi>) {
      if (state.date == null) {
        const temp: DateBooking = {
          start: action.payload,
          end: action.payload,
        };
        state.date = temp;
      }
      if (state.date) {
        state.date.start = action.payload;
      }
    },
    setEndDate(state, action: PayloadAction<DateBi>) {
      if (state.date) {
        state.date.end = action.payload;
      }
    },
    setPricePerNight(state, action: PayloadAction<number>) {
      state.pricePerNight = action.payload;
      state.serviceFee = action.payload / 10;
      state.totalPrice = state.serviceFee + action.payload;
    },
    setTotalPrice(state, action: PayloadAction<number>) {
      if (state.numberOfGuests > 3) {
        const serviceFee = (state.numberOfGuests - 3) * 50;
        state.totalPrice = state.serviceFee + action.payload + serviceFee;
      } else {
        state.totalPrice = state.serviceFee + action.payload;
      }
    },
    setDate(state, action: PayloadAction<DateBooking | null>) {
      state.date = action.payload;
    },
    increment(state: Draft<reserv>, action: PayloadAction<string>) {
      (state as any)[action.payload]++;
      state.numberOfGuests++;
      if (state.numberOfGuests > 3) {
        state.totalPrice += 50;
      }
    },
    decrement(state: Draft<reserv>, action: PayloadAction<string>) {
      if ((state as any)[action.payload] > 0) {
        (state as any)[action.payload]--;
        state.numberOfGuests--;
        if (state.numberOfGuests > 3) state.totalPrice -= 50;
      }
    },
  },
});

export const {
  setId,
  setStartDate,
  setEndDate,
  setDate,
  increment,
  decrement,
  setPricePerNight,
  setTotalPrice,
  setStatus,
  setRentalApartment,
} = reservSlice.actions;
export default reservSlice.reducer;
