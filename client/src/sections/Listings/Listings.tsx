import React from "react";
import { server } from "../../lib/api/server";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from "./types";
const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
mutation DeleteListing($id: ID!) {
  deleteListing(id: $id) {
   id
  }
}
`;
interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data.listings); // check the console to see the listings data from our GraphQL Request!
  };
  const deleteListing = async () => {
    const {data} = await server.fetch<DeleteListingData, DeleteListingVariables>({query: DELETE_LISTING,
    variables: {
      id: "5f3e0027ab23a907a06d2140"
    }})
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings!</button>
      <button onClick={deleteListing}>Delete Listing</button>
    </div>
  );
};
// export const Listings2:FunctionComponent<Props> = ({title, children}) => {
//     return <h2>{title}</h2>
// }
