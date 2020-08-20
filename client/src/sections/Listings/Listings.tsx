import React from "react";
import { server } from "../../lib/api/server";
import {ListingsData} from './types'
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

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const fetchListings = async() => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data.listings); // check the console to see the listings data from our GraphQL Request!
  }

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings!</button>
    </div>
  );
};
// export const Listings2:FunctionComponent<Props> = ({title, children}) => {
//     return <h2>{title}</h2>
// }
