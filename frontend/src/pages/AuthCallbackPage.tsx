import { useCreateMyUser, useGetMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user, error, isLoading: authLoading } = useAuth0();
  const { createUser } = useCreateMyUser();
  const { currentUser, isLoading } = useGetMyUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (error) {
      console.error("Auth error:", error);
      navigate("/");
      return;
    }
  }, [error, navigate]);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
  }, [createUser, user]);

  useEffect(() => {
    if (!isLoading && currentUser) {
      navigate("/role-selection");
    }
  }, [currentUser, isLoading, navigate]);

  if (authLoading) return <>Loading...</>;
  if (error) return <>Redirecting...</>;

  return <>Loading...</>;
};

export default AuthCallbackPage;
