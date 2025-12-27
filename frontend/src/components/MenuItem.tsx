import { MenuItem } from "../types";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const MenuItemCard = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="flex items-center justify-between p-4 shadow-sm hover:shadow-md transition">
      <div>
        <div className="text-lg font-semibold">{menuItem.name}</div>
        <div className="text-sm text-gray-500 mt-1">Delicious and freshly prepared</div>
      </div>
      <CardContent className="flex items-center gap-4">
        <div className="text-lg font-bold">Rs{(menuItem.price / 100).toFixed(2)}</div>
        <Button onClick={addToCart} className="bg-orange-500 text-white">Add</Button>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
