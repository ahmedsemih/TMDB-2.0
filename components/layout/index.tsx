import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './navbar';

type Props = {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout;