import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductRow = ({ product, onDelete, onEdit }) => {
  const [editData, setEditData] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Simulate a PUT request
    onEdit(editData);
  };

  return (
    <tr key={product.id} className="py-0">
      <td className="border border-gray-300 px-4 py-2">{product.id}</td>
      <td className="border border-gray-300 px-4 py-2">
        <img src={product.image} alt={product.title} className="w-16 h-auto" />
      </td>
      <td className="border border-gray-300 px-4 py-2">{product.title}</td>
      <td className="border border-gray-300 px-4 py-2">
        {product.description}
      </td>
      <td className="border border-gray-300 px-4 py-2">{product.price} SOL</td>
      <td className="border border-gray-300 px-4 py-2">{product.category}</td>
      <td className="border border-gray-300 px-4 py-2 flex flex-row gap-2">
        {/* Edit button opens the dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Make changes to your product here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={editData.title}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={editData.price}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="image" className="">
                  Image Link
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={editData.image}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="flex items-center gap-4 w-[80%] max-w-[250px] border border-gray-300 rounded-lg">
                <select
                  name="category"
                  value={editData.category}
                  onChange={handleChange}
                  className="mb-4 px-4 py-1 w-full"
                >
                  <option value="">Select Category</option>
                  <option value="grains">Grains</option>
                  <option value="legumes">Legumes</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="tubers">Tubers</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              {/* Save changes button */}
              <Button type="button" onClick={handleSaveChanges}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete button triggers delete action */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will delete your data from
                our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(product.id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  );
};

export default ProductRow;
