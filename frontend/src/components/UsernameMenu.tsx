import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useGetMyRestaurantOrders } from "@/api/MyRestaurantApi";
import { useGetMyUser } from "@/api/MyUserApi";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  const { currentUser, isLoading } = useGetMyUser();
  const { orders, isLoading: isOrdersLoading } = useGetMyRestaurantOrders();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoading ? null : (
          <>
            {currentUser?.role === "owner" ? (
              <>
                <DropdownMenuItem>
                  <Link
                    to="/manage-restaurant"
                    className="font-bold hover:text-orange-500 flex items-center gap-2"
                  >
                    <span>Manage Restaurant</span>
                    {!isOrdersLoading && orders && orders.length > 0 && (
                      <Badge variant="secondary">{orders.length}</Badge>
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/user-profile" className="font-bold hover:text-orange-500">
                    User Profile
                  </Link>
                </DropdownMenuItem>
              </>
            ) : currentUser?.role === "customer" ? (
              <>
                <DropdownMenuItem>
                  <Link to="/order-status" className="font-bold hover:text-orange-500">
                    Order Status
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/user-profile" className="font-bold hover:text-orange-500">
                    User Profile
                  </Link>
                </DropdownMenuItem>
              </>
            ) : null}
          </>
        )}
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-orange-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
