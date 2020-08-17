import {ObjectId, Collection} from 'mongodb'

export interface Listing {
  _id: ObjectId;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number,
  rating: number;
}

export interface Database {
listings: Collection<Listing>;
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