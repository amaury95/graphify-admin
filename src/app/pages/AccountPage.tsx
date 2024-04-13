import { useAuth } from "provider/Auth";

export function AccountPage() {
  const { account } = useAuth();
  return <>{JSON.stringify(account)}</>;
}
