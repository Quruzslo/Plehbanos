import {
  PackageIcon,
  ListDashesIcon,
  AddressBookTabsIcon,
} from "@phosphor-icons/react/ssr";

export type AdminLink = {
  name: string;
  slug: string;
  path: string;
  icon: any;
};

const adminLinks: AdminLink[] = [
  {
    name: "Termékek",
    slug: "termekek",
    path: "/admin/termekek",
    icon: PackageIcon,
  },
  {
    name: "Rendelések",
    slug: "rendelesek",
    path: "/admin/rendelesek",
    icon: ListDashesIcon,
  },
  {
    name: "Levelezés",
    slug: "levelezes",
    path: "/admin/levelezes",
    icon: AddressBookTabsIcon,
  },
];

export default adminLinks;
