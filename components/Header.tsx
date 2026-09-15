import { checkUser } from "@/lib/checkUser";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const user = await checkUser();
  return <HeaderClient user={user ? { credits: user.credits, plan: user.plan } : null} />;
};

export default Header;
