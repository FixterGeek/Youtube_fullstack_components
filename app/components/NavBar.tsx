import { Link } from "@remix-run/react";
import { TbBell } from "react-icons/tb";
// import AccountManager from "./AccountManager";

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-violet-500">
      <div className="max-w-3xl flex items-center gap-4 py-4 px-4 mx-auto text-white text-sm">
        <Link to="/">
          <img
            className="w-[140px]"
            src="https://www.logodesign.net/images/home-logos/brand-amazon-logo.png"
            alt="logo"
          />
        </Link>
        <span className="text-black bg-white p-1 rounded-full text-lg ml-auto">
          <TbBell />
        </span>
        {/* <AccountManager /> */}
      </div>
    </nav>
  );
}
