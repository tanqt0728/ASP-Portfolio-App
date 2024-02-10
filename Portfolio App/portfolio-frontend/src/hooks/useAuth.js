import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if the token does not exist
    if (!token) {
      // Redirect to the login page
      router.push("/auth/login");
    }
    // Optionally, validate the token's validity with your backend here
  }, [router]);
};

export default useAuth;
