import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditMenu from "./EditMenu";
import { MenuSchema, MenuTypes } from "@/schema/MenuSchema";
import UseMenu from "@/store/UseMenu";
import useResturent from "@/store/UseResturent";
import { toast } from "sonner";

const AddMenu = () => {
  const { createMenu, loading, DeleteMenu } = UseMenu();
  const { resturent } = useResturent();
  toast.error("resturent:", resturent);
  const [open, setOpen] = useState<boolean>(false);
  const [Editopen, setEditOpen] = useState<boolean>(false);
  const [inpt, setInpt] = useState<MenuTypes>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [Error, setError] = useState<Partial<MenuTypes>>({});
  const [selectMenu, setSelectMenu] = useState<any>();

  const ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setInpt({
      ...inpt,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  // Delete Menu
  const MenuDelete = async (restId: string, menuId: string) => {
    await DeleteMenu(restId, menuId);
  };

  const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = MenuSchema.safeParse(inpt);
    if (!result.success) {
      const error = result.error.formErrors.fieldErrors;
      setError(error as Partial<MenuTypes>);
      return;
    }
    // Call api
    try {
      const formData = new FormData();
      formData.append("name", inpt.name);
      formData.append("description", inpt.description);
      formData.append("price", String(inpt.price));

      if (inpt.image) {
        formData.append("image", inpt.image);
      }
      await createMenu(formData); // dont pass the type when you pass function
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl">Available Menus</h2>
        <Button
          onClick={() => setOpen(true)}
          className="bg-pink-600 hover:bg-pink-600/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Menus
        </Button>
      </div>

      <div className="space-y-4">
        {resturent?.menu.map((item: any) => (
          <Card key={item._id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <p className="font-semibold">Price: {item.price}</p>
                  <Button
                    onClick={() => {
                      setSelectMenu(item);
                      setEditOpen(true);
                    }}
                    variant="outline"
                    className="bg-pink-600 hover:bg-pink-600/90 text-white border-0">
                    Edit
                  </Button>
                  <Button
                    onClick={() => MenuDelete(resturent._id, item._id)}
                    variant="outline"
                    className="bg-gray-600 hover:bg-gray-400 text-white border-0">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-full sm:max-w-[425px] h-[80vh] p-0">
          <DialogHeader className="px-5 py-2 border-b">
            <DialogTitle>Add A New Menu</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[calc(80vh-80px)] px-6">
            <form className="space-y-4 py-4" onSubmit={SubmitHandler}>
              <div className="space-y-2">
                <Label htmlFor="name">Title</Label>
                <Input
                  name="name"
                  placeholder="Enter Menu Name"
                  className="border-gray-300"
                  required
                  value={inpt.name}
                  onChange={ChangeEventHandler}
                />
              </div>
              {Error.name && (
                <p className="text-red-500 text-sm font-medium">{Error.name}</p>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter menu description"
                  className="border-gray-300 min-h-[100px]"
                  required
                  value={inpt.description}
                  onChange={ChangeEventHandler}
                />
              </div>
              {Error.description && (
                <p className="text-red-500 text-sm font-medium">
                  {Error.description}
                </p>
              )}

              <div className="space-y-2">
                <Label htmlFor="price">Price (Rupees)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter menu price"
                  className="border-gray-300"
                  required
                  value={inpt.price}
                  onChange={ChangeEventHandler}
                />
              </div>
              {Error.price && (
                <p className="text-red-500 text-sm font-medium">
                  {Error.price}
                </p>
              )}

              <div className="space-y-2">
                <Label htmlFor="image">Upload Menu Image</Label>
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="cursor-pointer border-gray-300"
                  required
                  onChange={(e) =>
                    setInpt({
                      ...inpt,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                />
              </div>
              {/* {Error.image && (
                <p className="text-red-500 text-sm font-medium">
                  {Error.image}
                </p>
              )} */}

              {loading ? (
                <button className="bg-[#FF2B85] flex items-center justify-center text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  <span>Please Wait</span>
                </button>
              ) : (
                <button className="bg-[#FF2B85] text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                  Add Menu
                </button>
              )}
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {selectMenu && (
        <EditMenu open={Editopen} setOpen={setEditOpen} menu={selectMenu} />
      )}
    </div>
  );
};
export default AddMenu;
