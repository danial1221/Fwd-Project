import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { useState } from "react";
import { CreditCard, Banknote } from "lucide-react";

type Props = {
  onCheckout: (userFormData: UserFormData, paymentMethod: "stripe" | "cod") => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState<UserFormData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  const handleDeliveryDetailsSubmit = (data: UserFormData) => {
    console.log("Delivery details submitted:", data);
    setDeliveryDetails(data);
    setShowPaymentOptions(true);
    console.log("Payment options should now show");
  };

  const handlePaymentMethodSelect = async (method: "stripe" | "cod") => {
    if (deliveryDetails) {
      await onCheckout(deliveryDetails, method);
      setDialogOpen(false);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setShowPaymentOptions(false);
      setDeliveryDetails(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Log in to check out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        {!showPaymentOptions ? (
          <UserProfileForm
            currentUser={currentUser}
            onSave={handleDeliveryDetailsSubmit}
            isLoading={isGetUserLoading}
            title="Confirm Delivery Details"
            buttonText="Continue to payment"
          />
        ) : (
          <div className="space-y-4 p-6">
            <h2 className="text-2xl font-bold">Select Payment Method</h2>
            <p className="text-gray-600">Choose how you'd like to pay for your order</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <button
                onClick={() => handlePaymentMethodSelect("stripe")}
                className="flex flex-col items-center gap-3 p-6 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition"
              >
                <CreditCard className="w-12 h-12 text-orange-500" />
                <h3 className="font-bold text-lg">Card Payment</h3>
                <p className="text-sm text-gray-600 text-center">Pay securely with Stripe</p>
              </button>

              <button
                onClick={() => handlePaymentMethodSelect("cod")}
                className="flex flex-col items-center gap-3 p-6 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition"
              >
                <Banknote className="w-12 h-12 text-orange-500" />
                <h3 className="font-bold text-lg">Cash on Delivery</h3>
                <p className="text-sm text-gray-600 text-center">Pay when you receive</p>
              </button>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowPaymentOptions(false)}
              className="w-full mt-4"
            >
              Back to Delivery Details
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
