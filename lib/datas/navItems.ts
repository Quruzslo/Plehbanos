interface navItemsType {
  name: string;
  path: string;
  position: "left" | "right";
  children?: string[];
}

const navItems: navItemsType[] = [
  {
    name: "Szolgáltatások",
    path: "/#szolgaltatasok",
    position: "left",
  },
  {
    name: "Munkáink",
    path: "/#munkaink",
    position: "left",
  },
  {
    name: "Termékek",
    path: "/termekek",
    position: "right",
  },
  {
    name: "Kapcsolat",
    path: "/kapcsolat",
    position: "right",
  },
];

export default navItems;
