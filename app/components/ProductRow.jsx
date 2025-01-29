import React from "react";
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
import { Button } from "@/components/ui/button";
import EditProduct from "./EditProduct"; // Import the new component

const ProductRow = ({ product, onDelete, onEdit }) => {
  return (
    <tr key={product.id} className="py-0">
      <td className="border border-gray-300 px-4 py-2">{product.id}</td>
      <td className="border border-gray-300 px-4 py-2">
        <img src={product.image} alt={product.title} className="w-16 h-auto" />
      </td>
      <td className="border border-gray-300 px-4 py-2">{product.title}</td>
      <td className="border border-gray-300 px-4 py-2">{product.description}</td>
      <td className="border border-gray-300 px-4 py-2">{product.price} SOL</td>
      <td className="border border-gray-300 px-4 py-2">{product.category}</td>
      <td className="border border-gray-300 px-4 py-2 flex flex-row gap-2">
        {/* Edit Product Component */}
        <EditProduct product={product} onEditComplete={onEdit} />

        {/* Delete button triggers delete action */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will delete your data from our servers.
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