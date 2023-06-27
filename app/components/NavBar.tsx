import { Link } from "@remix-run/react";
import { TbBell } from "react-icons/tb";
import AccountManager from "./AccountManager";

export default function NavBar() {
  return (
    <nav className="bg-[#fffcf7] border border-gray-200 shadow">
      <div className="max-w-3xl flex items-center gap-4 py-4 px-4 mx-auto text-sm text-black">
        <Link to="/">
          <img
            className="w-[80px]"
            src="https://i.pinimg.com/originals/aa/d6/77/aad67746323d7a7fe963a0be2e912a3a.png"
            alt="logo"
          />
        </Link>
        <span className="text-black bg-white p-1 rounded-full text-lg ml-auto">
          <TbBell />
        </span>
        <AccountManager />
      </div>
    </nav>
  );
}
