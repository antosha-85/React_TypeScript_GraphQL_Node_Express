import React, { useState, useEffect } from "react";
import { server } from "../../lib/api/server";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
  Listing,
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
  const [listings, setListings] = useState<Listing[] | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data.listings);
    setListings(data.listings); // check the console to see the listings data from our GraphQL Request!
  };
  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
    fetchListings();
  };
  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => deleteListing(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {/* <button onClick={fetchListings}>Query Listings!</button> */}
      {/* <button onClick={deleteListing}>Delete Listing</button> */}
    </div>
  );
};
// export const Listings2:FunctionComponent<Props> = ({title, children}) => {
//     return <h2>{title}</h2>
// }
