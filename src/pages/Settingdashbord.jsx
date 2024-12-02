import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaPlug, FaBell, FaRegCreditCard, FaFileInvoice, FaCommentDots } from 'react-icons/fa';

function Settingdashbord() {
  const navItems = [
    { to: 'Setting/', label: 'My Account', icon: <FaUser /> },
    { to: 'ConnectedApps', label: 'Connected Apps', icon: <FaPlug /> },
    { to: 'MyNotifications', label: 'My Notifications', icon: <FaBell /> },
    { to: 'Plans', label: 'Plans', icon: <FaRegCreditCard /> },
    { to: 'BillingInvoices', label: 'Billing & Invoices', icon: <FaFileInvoice /> },
    { to: 'GiveFeedback', label: 'Give Feedback', icon: <FaCommentDots /> },
  ];

  return (
    <div className="w-full md:w-1/4">
      <ul className="space-y-4 text-gray-600">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              aria-label={item.label}
              className={({ isActive }) =>
                `flex items-center justify-center sm:justify-start gap-3 py-2 px-4 duration-200 border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent text-lg lg:border-0 hover:font-bold ${
                  isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden sm:block whitespace-nowrap">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Settingdashbord;
