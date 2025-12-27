import { useCreateMyUser, useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RoleSelectionPage = () => {
  const { user } = useAuth0();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser } = useUpdateMyUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role: "customer" | "owner") => {
    const userData = {
      email: user?.email!,
      name: currentUser?.name || user?.name || "",
      addressLine1: currentUser?.addressLine1 || "",
      city: currentUser?.city || "",
      country: currentUser?.country || "",
      role: role,
    };

    await updateUser(userData);
    navigate("/");
  };

  if (isGetLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Welcome to MernEats!</h1>
          <p className="text-xl text-gray-600">How would you like to use our platform?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition cursor-pointer" onClick={() => handleRoleSelection("customer")}>
            <CardHeader>
              <CardTitle className="text-2xl text-center">I'm a Customer</CardTitle>
              <CardDescription className="text-center">
                Order food from restaurants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-orange-500">✓</span>
                <span>Browse and search restaurants</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">✓</span>
                <span>Order your favorite food</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">✓</span>
                <span>Track your orders</span>
              </div>
              <Button className="w-full mt-4 bg-orange-500">Continue as Customer</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition cursor-pointer" onClick={() => handleRoleSelection("owner")}>
            <CardHeader>
              <CardTitle className="text-2xl text-center">I'm a Restaurant Owner</CardTitle>
              <CardDescription className="text-center">
                Manage your restaurant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-orange-500">✓</span>
                <span>Create and manage your restaurant</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">✓</span>
                <span>Update menu and pricing</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">✓</span>
                <span>Manage incoming orders</span>
              </div>
              <Button className="w-full mt-4 bg-orange-500">Continue as Owner</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
