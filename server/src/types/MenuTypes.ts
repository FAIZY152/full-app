import { Document } from "mongoose";

interface MenuT {
  //   _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface MenuDocs extends MenuT, Document {
  createAt: Date;
  updateAt: Date;
}