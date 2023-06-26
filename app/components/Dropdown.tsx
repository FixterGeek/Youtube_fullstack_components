import { Menu } from "@headlessui/react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function Dropdown({
  className = "",
  children,
  cta = "Abrir",
}: {
  className?: string;
  children: ReactNode;
  cta: ReactNode;
}) {
  return (
    <Menu>
      <main className="relative">
        <Menu.Button>{cta}</Menu.Button>
        <Menu.Items
          className={twMerge(
            "shadow-md bg-slate-100 absolute top-8 right-0 rounded-md py-3 px-4 grid min-w-[180px] ",
            className
          )}
        >
          {children}
        </Menu.Items>
      </main>
    </Menu>
  );
}
// TODO: Understanding the syntax well
// <Menu.Item>
// {({ active }) => (
//   <a
//     className={`${active && "bg-blue-500"}`}
//     href="/account-settings"
//   >
//     Documentation
//   </a>
// )}
// </Menu.Item>
