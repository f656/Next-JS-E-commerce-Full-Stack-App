import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import adminLogo from "@/public/assets/images/favicon.ico";
import { useSelector } from "react-redux";
// User dropdown icon.
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const UserDropdown = () => {
  const auth = useSelector((store) => store.authStore.auth);
  // console.log("AUTH STORE 👉", useSelector((store) => store.authStore.auth));
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={adminLogo.src} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="me-5 w-44">
        <DropdownMenuLabel>
          <p className="font-semibold">{auth?.name || "User"}</p>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="" className="cursor-pointer">
            <IoShirtOutline />
            New Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="" className="cursor-pointer">
            <MdOutlineShoppingBag />
            Orders
          </Link>
        </DropdownMenuItem>
        <LogoutButton/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
