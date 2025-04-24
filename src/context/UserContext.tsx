import { getCurrentUser } from "@/lib/services/AuthService";
import { IUser } from "@/lib/types/user";
import {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async () => {
    const userData: IUser = await getCurrentUser();
    setUser(userData);
    setLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [loading]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
