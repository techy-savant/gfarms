import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EditProduct = ({ product, onEditComplete }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });
  const [editData, setEditData] = useState({
    name: product.name,
    price: product.price,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showNotification = (type, message) => {
    setAlertMessage({ type, message });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/product/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        showNotification("success", "Product updated successfully");
        onEditComplete(); // Callback to refresh the product list
        setOpen(false);
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      showNotification("error", "Failed to update product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert variant={alertMessage.type === "error" ? "destructive" : "default"}>
          <AlertDescription>{alertMessage.message}</AlertDescription>
        </Alert>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product name and price below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="name" className="text-right min-w-[80px]">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Label htmlFor="price" className="text-right min-w-[80px]">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={editData.price}
                onChange={handleChange}
                className="flex-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              onClick={handleSubmit} 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProduct;