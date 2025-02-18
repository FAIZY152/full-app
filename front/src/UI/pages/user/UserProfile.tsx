import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserStore } from "@/store/UserStroe";
import { UpdateProfileInput } from "@/types/UserTypes";
import {
  Globe,
  Loader2,
  Locate,
  Mail,
  MapPin,
  PhoneCall,
  Plus,
} from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";

const UserProfile = () => {
  const { user, updateProfile } = UserStore();
  const [loading, setloading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<UpdateProfileInput>({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    phone: Number(user?.phone) || +92,
    profilePicture: user?.profilePicture || "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>(
    profileData.profilePicture || ""
  );

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: name === "phone" ? Number(value) : value, // ✅ No conversion needed, phone remains string
    });
  };

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      const updatedProfileData = {
        ...profileData,
        timestamp: new Date().toISOString(), // 🔥 Add current timestamp
      };
      await updateProfile(updatedProfileData);
      setloading(false);
    } catch (error) {
      toast.error(error);
      setloading(false);
    }
  };

  return (
    <div>
      <form onSubmit={updateProfileHandler}>
        <div className="max-w-7xl mx-auto mt-10 ">
          <div className="md:flex md:justify-center justify-start p-5 items-center gap-2">
            <div className="flex justify-start items-center gap-3">
              <Avatar className="md:w-20 md:h-20 relative w-16 h-16 bg-gray-200">
                <AvatarImage src={selectedProfilePicture} />
                <AvatarFallback>CN</AvatarFallback>
                <input
                  type="file"
                  accept="image/*"
                  ref={imageRef}
                  className="hidden "
                  onChange={fileChangeHandler}
                />
                <div
                  onClick={() => imageRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:bg-opacity-50 hover:bg-black hover:opacity-100  cursor-pointer">
                  <Plus className="text-white h-6 w-6" />
                </div>
              </Avatar>
              <Input
                className="outline-none p-2 border-none text-xl font-extrabold"
                type="text"
                placeholder="Name"
                onChange={changeHandler}
                value={profileData.fullname}
                name="fullname"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 md:gap-2 gap-3 items-center my-10">
            <div className="flex items-center p-2 px-2 gap-4 md:justify-center justify-start shadow-md rounded-sm">
              <Mail className=" text-gray-600" />
              <div>
                <Label className="px-2">E-mail</Label>
                <Input
                  className="rounded-sm outline-none border-none text-gray-600  w-full bg-transparent"
                  placeholder="E-mail"
                  type="email"
                  onChange={changeHandler}
                  value={profileData.email}
                  disabled
                  name="email"
                />
              </div>
            </div>

            <div className="flex items-center p-2 px-2 gap-4 md:justify-center justify-start shadow-md rounded-sm">
              <MapPin className=" text-gray-600" />
              <div>
                <Label className="px-2">City</Label>
                <Input
                  className="rounded-sm outline-none border-none text-gray-600  w-full bg-transparent"
                  placeholder="Peshawar"
                  type="text"
                  onChange={changeHandler}
                  value={profileData.city}
                  name="city"
                />
              </div>
            </div>
            <div className="flex items-center p-2 px-2 gap-4 md:justify-center justify-start shadow-md rounded-sm">
              <Globe className=" text-gray-600" />
              <div>
                <Label className="px-2">Country</Label>
                <Input
                  className="rounded-sm outline-none border-none text-gray-600  w-full bg-transparent"
                  placeholder="Pakistan"
                  type="text"
                  onChange={changeHandler}
                  value={profileData.country}
                  name="country"
                />
              </div>
            </div>
            <div className="flex items-center p-2 px-2 gap-4 md:justify-center justify-start shadow-md rounded-sm">
              <PhoneCall className=" text-gray-600" />
              <div>
                <Label className="px-2">Phone</Label>
                <Input
                  className="rounded-sm outline-none border-none text-gray-600  w-full bg-transparent"
                  placeholder="03001234567"
                  type="text"
                  onChange={changeHandler}
                  value={profileData.phone}
                  name="phone"
                />
              </div>
            </div>
            <div className="flex items-center p-4 px-6 gap-4 md:justify-center justify-start shadow-md rounded-sm">
              <Locate className="text-gray-600" />
              <div className="w-full">
                <Label className="px-4">Address</Label>
                <Textarea
                  className="rounded-sm px-4 py-3 outline-none border-none text-gray-600 w-full"
                  placeholder="Address: Peshawar Home No."
                  onChange={changeHandler}
                  value={profileData.address}
                  name="address"
                  rows={4}
                />
              </div>
            </div>
          </div>
          <div className="md:w-[50%] mx-auto">
            {loading ? (
              <button
                disabled
                className="bg-[#FF2B85] flex items-center justify-center text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Please Wait</span>
              </button>
            ) : (
              <button
                type="submit"
                className="bg-[#FF2B85] text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                Update
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
