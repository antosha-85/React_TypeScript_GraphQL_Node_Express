import { ObjectId, Collection } from "mongodb";

export interface Listing {
  _id: ObjectId;
  // title: string;
  // image: string;
  // address: string;
  // price: number;
  // numOfGuests: number;
  // numOfBeds: number;
  // numOfBaths: number;
  // rating: number;
}
export interface Booking {
  _id: ObjectId;
}
export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
  
}
export interface Database {
  bookings: Collection<Booking>;
  listings: Collection<Listing>;
  users: Collection<User>;
}

// ---

// interface IdentityObj<T = any> {
//     field: T;
// }
// const identity = <T = any >(arg:T ): T=> {
//     const obj: IdentityObj<T> = {
//         field: arg,
//     }
//     return obj.field
// }
// identity<number>(5)
// identity<string>('5')
