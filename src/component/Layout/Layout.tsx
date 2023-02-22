import { FunctionComponent } from "react";
import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: FunctionComponent<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
