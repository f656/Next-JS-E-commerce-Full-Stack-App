// Admin Sidebar icons.
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_SHOW } from "@/routes/AdminPanelRoute";

 export const adminAppSideBarMenu = [
  {
    title: "Dashboard",
    url: ADMIN_DASHBOARD,
    icon: AiOutlineDashboard,
  },
  {
    title: "Category",
    url: "#",
    icon: BiCategory,
    submenu: [
      {
        tittle: "Add Category",
        url: ADMIN_CATEGORY_ADD,
      },
      {
        tittle: "All Category",
        url: ADMIN_CATEGORY_SHOW,
      },
    ],
  },
  {
    title: "Products",
    url: "#",
    icon: IoShirtOutline,
    submenu: [
      {
        tittle: "Add Product",
        url: ADMIN_PRODUCT_ADD,
      },
      {
        tittle: "All Variant",
        url: "#",
      },
      {
        tittle: "All Products",
        url: ADMIN_PRODUCT_SHOW,
      },
      {
        tittle: "Product Variants",
        url: "#",
      },
    ],
  },
  {
    title: "Coupons",
    url: "#",
    icon: RiCoupon2Line,
    submenu: [
      {
        tittle: "Add Coupon",
        url: "#",
      },
      {
        tittle: "All Coupons",
        url: "#",
      },
    ],
  },
  {
    title: "Orders",
    url: "#",
    icon: MdOutlineShoppingBag,
  },
  {
    title: "Customers",
    url: "#",
    icon: LuUserRound,
  },
  {
    title: "Rating & Review",
    url: "#",
    icon: IoMdStarOutline,
  },
  {
    title: "Media",
    url: ADMIN_MEDIA_SHOW,
    icon: MdOutlinePermMedia,
  },
];
