import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardBiProps, MarkerBi } from "@/app/type/type";

type Apartments = {
  apartmentsAll: CardBiProps[];
  apartments: CardBiProps[];
  apartmentsMap: CardBiProps[];
  countPage: number;
};

const initialState: Apartments = {
  apartmentsAll: [],
  apartments: [],
  apartmentsMap: [],
  countPage: 1,
};

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    setApartmentsAll(state, action: PayloadAction<CardBiProps[]>) {
      state.apartmentsAll = action.payload;
      state.apartmentsMap = action.payload;
    },
    setApartments(state, action: PayloadAction<CardBiProps[]>) {
      state.apartments = action.payload;
    },
    showMap(state) {
      state.apartmentsMap = [...state.apartmentsAll];
    },
    showCard(state) {
      state.countPage = 1;
      state.apartments = [...state.apartmentsAll.slice(0, 18)];
    },
    pushPushOnePage(state) {
      const { countPage, apartmentsAll, apartments } = state;

      // Визначаємо початковий індекс
      const startIndex = countPage === 1 ? countPage * 18 : countPage * 6 + 18;

      // Визначаємо кількість елементів, які потрібно додати
      const numberOfElementsToAdd = Math.min(
        6,
        apartmentsAll.length - apartments.length
      );

      // Додаємо елементи до списку апартаментів
      if (numberOfElementsToAdd > 0) {
        const tempArr = apartmentsAll.slice(
          startIndex,
          startIndex + numberOfElementsToAdd
        );
        state.apartments.push(...tempArr);
      }

      // Збільшуємо лічильник сторінок
      state.countPage++;
    },

    navFilter(
      state,
      action: PayloadAction<{ name: string; name2: string; type: string }>
    ) {
      const { name, name2, type } = action.payload;

      const result = state.apartmentsAll.filter((item) => {
        if (
          item[type as keyof CardBiProps] === name ||
          item[type as keyof CardBiProps] === name2
        ) {
          return item;
        }
      });
      state.apartments = result;
      state.apartmentsMap = result;
    },
  },
});

export const {
  setApartmentsAll,
  navFilter,
  setApartments,
  pushPushOnePage,
  showMap,
  showCard,
} = apartmentsSlice.actions;
export default apartmentsSlice.reducer;
