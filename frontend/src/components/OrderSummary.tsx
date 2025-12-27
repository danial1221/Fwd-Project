import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash, PlusCircle, MinusCircle } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  decreaseQuantity: (cartItem: CartItem) => void;
  increaseQuantity: (cartItem: CartItem) => void;
  removeItemCompletely: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, decreaseQuantity, increaseQuantity, removeItemCompletely }: Props) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>Rs{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              <span>{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="p-0"
                  onClick={() => decreaseQuantity(item)}
                >
                  <MinusCircle size={20} />
                </Button>
                <Button
                  variant="ghost"
                  className="p-0"
                  onClick={() => increaseQuantity(item)}
                >
                  <PlusCircle size={20} />
                </Button>
              </div>
              <Button variant="ghost" className="p-0" onClick={() => removeItemCompletely(item)}>
                <Trash color="red" size={18} />
              </Button>
              <div className="font-bold">Rs{((item.price * item.quantity) / 100).toFixed(2)}</div>
            </div>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>Rs{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
