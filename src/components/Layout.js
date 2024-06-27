import { Outlet } from "react-router-dom";
import Banner from './Banner';

function Layout() {
  return (
    <>
        <div className="Layout">
            <Banner />
        </div>
        
        <Outlet />
    </>
  );
}

export default Layout
