import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

const Layout = ({ children, showHero = false }: Props) => {
  const { currentUser } = useGetMyUser();
  const shouldShowHero = showHero && currentUser?.role !== "owner";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {shouldShowHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
