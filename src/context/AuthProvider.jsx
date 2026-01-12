import { AuthContext } from "./AuthContext.js";
import { useLogin, useLogout, useMe, useSignup } from "../hooks/useAuth.js";

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading } = useMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();

  const value = {
    user,
    isLoading,
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    authLoading:
      loginMutation.isPending ||
      signupMutation.isPending ||
      logoutMutation.isPending,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
