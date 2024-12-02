import { Outlet } from 'react-router-dom';
import Settingdashbord from './Settingdashbord';
function Settings() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Sidebar */}
      <aside className="col-span-3 sm:col-span-4 md:col-span-3">
        <Settingdashbord />
      </aside>

      {/* Main Content */}
      <main className="col-span-9 sm:col-span-8 md:col-span-9">
        <Outlet />
      </main>
    </div>
  );
}

export default Settings;
