import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import PetalRain from '../effects/PetalRain';

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen app-shell-bg relative overflow-hidden">
      <PetalRain />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-fuchsia-200/25 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div
        className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl animate-float-slow pointer-events-none"
        style={{ animationDelay: '1.2s' }}
      />
      
      <div className="shrink-0 z-20 h-full">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 h-full">
        <div className="shrink-0 z-20">
          <Header />
        </div>
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10 scroll-smooth will-change-scroll">
          <div key={location.pathname} className="max-w-[1800px] mx-auto w-full pb-12 page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
