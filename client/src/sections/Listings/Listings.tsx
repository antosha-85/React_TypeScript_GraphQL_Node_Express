import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo";
import List from "antd/es/list";
import Avatar from "antd/es/avatar";
import { Button, Spin } from "antd";
import "./styles/Listings.css";
import { Listings as ListingsData } from "./__generated__/Listings";
import { ListingsSkeleton } from "./components";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from "./__generated__/DeleteListing";

const LISTINGS = gql`
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

const DELETE_LISTING = gql`
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
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;
  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => handleDeleteListing(listing.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape="square" size={48} />}
          />
        </List.Item>
      )}
    />
  ) : // </List>
  null;
  if (loading) {
    // return <h2>Loading...</h2>;
    return (
      <div className="listings">
        <ListingsSkeleton title={title} />)
      </div>
    );
  }
  if (error) {
    return <h2>Uh oh! Something went wrong! Please try again later:(</h2>;
  }

  // const deleteListingLoadingMessage = deleteListingLoading ? (
  //   <h4>Deletion in progress ...</h4>
  // ) : null;
  const deleteListingErrorMessage = deleteListingError ? (
    <h4>Uh oh! Something went wrong with deleting - please try again later!</h4>
  ) : null;
  return (
    <div className="listings">
      <Spin spinning={deleteListingLoading}>
        <h2>{title}</h2>
        {listingsList}
        {/* {deleteListingLoadingMessage} */}
        {deleteListingErrorMessage}
      </Spin>
    </div>
  );
};
