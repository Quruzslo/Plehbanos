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
    position: "left",
  },
  {
    name: "Kapcsolat",
    path: "/kapcsolat",
    position: "left",
  },
];

export default navItems;
