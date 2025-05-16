import AuthWrapper from '../components/authWrapper';
import Navbar, { Header } from './navbar';
import { SidebarProvider } from '@/app/context/sideBarState';
export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AuthWrapper>
      <div className="w-full grid grid-rows-layout grid-cols-layout h-screen">
        <header className='row-span-1 col-span-3'>
          <Header />
        </header>
        <Navbar />
        <main className='md:row-span-2 md:col-span-2 col-span-3 bg-gray-100 w-full'>
            {children}
        </main>
      </div>
    </AuthWrapper>
    </SidebarProvider>
  );
}

