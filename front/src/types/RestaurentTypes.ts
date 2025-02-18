export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type ResturentT = {
  _id: string;
  user: string;
  resturentName: string;
  city: string;
  country: string;
  deliveryTime: string;
  deliveryPrice: number;
  cusines: string[];
  menu: MenuItem[];
  imageFile: string;
};

export type ResturentTypes = {
  loading: boolean;
  resturent: ResturentT | any;
  permit: boolean;
  singleResturent: ResturentT | any;
  createResturents: (formdata: FormData) => void;
  getResturent: () => void;
  handlePermit: () => void;
  updateResturent: (formdata: FormData) => void;
  addMenuResturent: (menuId: string) => Promise<void>;
  updatedMenuResturent: (updateMenu: any) => Promise<any>;
  deleteMenuResturent: (menuId: string) => Promise<void>;
  GetSingleResturent: (resturentId: string) => Promise<void>;
};
