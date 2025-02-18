import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuSchema, MenuTypes } from "@/schema/MenuSchema";
import UseMenu from "@/store/UseMenu";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const EditMenu = ({
  open,
  setOpen,
  menu,
}: {
  menu: any;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState<Partial<MenuTypes>>({});
  const [inpt, setinpt] = useState<MenuTypes>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const { loading, MenuEdit } = UseMenu();

  const Changehandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setinpt({
      ...inpt,
      [name]: type == "number" ? Number(value) : value,
    });
  };
  const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = MenuSchema.safeParse(inpt);
    if (!result.success) {
      setError(result.error.formErrors.fieldErrors as Partial<MenuTypes>);
      toast.error(JSON.stringify(result.error.formErrors.fieldErrors));
      return;
    }
    try {
      const formdata = new FormData();
      formdata.append("name", inpt.name);
      formdata.append("description", inpt.description);
      formdata.append("price", String(inpt.price));

      if (inpt.image) {
        formdata.append("image", inpt.image);
      }
      await MenuEdit(menu._id, formdata);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setinpt({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      image: undefined,
    });
  }, [menu]);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-full sm:max-w-[425px] h-[80vh] p-0">
          <DialogHeader className="px-5 py-2 border-b">
            <DialogTitle>Edit to Refresh Your Menu</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[calc(80vh-80px)] px-6">
            <form className="space-y-4 py-4" onSubmit={SubmitHandler}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  placeholder="Enter Menu Name"
                  className="border-gray-300"
                  required
                  value={inpt.name}
                  onChange={Changehandler}
                />
              </div>
              {error.name && (
                <p className="text-red-500 text-sm font-medium">{error.name}</p>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter Menu description"
                  className="border-gray-300 min-h-[100px]"
                  required
                  value={inpt.description}
                  onChange={Changehandler}
                />
              </div>
              {error.description && (
                <p className="text-red-500 text-sm font-medium">
                  {error.description}
                </p>
              )}

              <div className="space-y-2">
                <Label htmlFor="price">Price (Rupees)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter Menu price"
                  className="border-gray-300"
                  required
                  value={inpt.price}
                  onChange={Changehandler}
                />
              </div>
              {error.price && (
                <p className="text-red-500 text-sm font-medium">
                  {error.price}
                </p>
              )}

              <div className="space-y-2">
                <Label htmlFor="image">Upload inpt Image</Label>
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="cursor-pointer border-gray-300"
                  onChange={(e) => {
                    setinpt({ ...inpt, image: e.target.files?.[0] });
                  }}
                />
              </div>
              {error.image && (
                <p className="text-red-500 text-sm font-medium">
                  {error.image?.name}
                </p>
              )}

              {loading ? (
                <button className="bg-[#FF2B85] flex items-center justify-center text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  <span>Please Wait</span>
                </button>
              ) : (
                <button className="bg-[#FF2B85] text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                  Update Menu
                </button>
              )}
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditMenu;
