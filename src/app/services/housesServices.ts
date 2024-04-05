"use server";

import { Filter } from "../type/type";

const getHouses = async () => {
  const url = process.env.NEXT_GET_APARTAMENTS;

  if (!url) {
    throw new Error("URL is undefined.");
  }
  const response = await fetch(url, {
    next: {
      revalidate: 5000,
    },
  });
  if (!response.ok) throw new Error("Unable to fetch houses.");
  return response.json();
};

export const getFirstPage = async (userId?: string) => {
  let url = process.env.NEXT_GET_FIRST_PAGE;
  if (!url) {
    throw new Error("URL is undefined.");
  }
  if (userId) {
    url = url + `&idUser=${userId}`;
  }

  const response = await fetch(url, {
    next: {
      revalidate: 500,
    },
  });
  if (!response.ok) {
    console.error("getFirstPageServer", response);
    throw new Error("Unable to fetch housesc.");
  }
  return response.json();
};

export const getFilter = async (filter: Filter) => {
  const url = process.env.NEXT_FILTER;
  if (!url) {
    throw new Error("URL is undefined.");
  }
  console.log("filter", filter);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      typeAccommodation: filter.typeAccommodation,
      minimumPrice: filter.minimumPrice,
      maximumPrice: filter.maximumPrice,
      bedrooms: filter.bedrooms,
      beds: filter.beds,
      bathrooms: filter.bathrooms,
      rating: filter.rating,
      typeOfHousing: filter.typeOfHousing,
      offeredAmenitiesDTO: filter.offeredAmenitiesDTO,
      hostsLanguage: filter.hostsLanguage,
    }),
  });
  if (!response.ok) {
    console.error("getFilter", response);
    throw new Error("Unable to fetch getFilter.");
  }

  return response.json();
};

export const getApartamentId = async (id: string, idUser: string = "0") => {
  const url = process.env.NEXT_GET_APARTAMENT_ID;
  if (!url) {
    throw new Error("URL is undefined.");
  }

  const response = await fetch(`${url}?id=${id}&idUser=${idUser}`, {
    next: {
      revalidate: 150,
    },
  });
  if (!response.ok) throw new Error(response.statusText);

  const res = response.json();
  return res;
};

export const getAllHouses = async () => {
  const response = await getHouses();
  return response;
};
