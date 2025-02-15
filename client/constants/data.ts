import { Href } from "expo-router";
import icons from "./icons";
import i18nLocale from "@/lib/locales/i18n";
export interface ISettings {
  title: string;
  icon: any;
  href: Href;
}

export interface Extras {
  id: string;
  name: string;
  price: number;
}
export interface Item {
  id: string;
  name: string;
  price: number;
  totalPrice: number;
  qty: number;
  extras: Extras[];
}
export interface Order {
  id: string;
  waiterName: string;
  clientNumber: string;
  time: string;
  orderType: "Delivery" | "Pickup" | "Table";
  status: "Pending" | "Ready";
  clientName: string;
  price: number;
  items: Item[];
}

export const settings: Array<ISettings> = [
  {
    title: i18nLocale.t("settingsScreen.personalDetails"),
    icon: icons.person,
    href: "/(root)/(tabs)/(top-tabs)",
  },
  {
    title: i18nLocale.t("settingsScreen.notifications"),
    icon: icons.bell,
    href: "/",
  },
  {
    title: i18nLocale.t("settingsScreen.security"),
    icon: icons.shield,
    href: "/(root)/(tabs)/(top-tabs)",
  },
  // {
  //   title: "Language",
  //   icon: icons.language,
  // },
  {
    title: i18nLocale.t("settingsScreen.helpCenter"),
    icon: icons.info,
    href: "/(root)/(tabs)/(top-tabs)",
  },
  // {
  //   title: "Invite Friends",
  //   icon: icons.people,
  // },
];

export const languages = [
  {
    id: "1",
    label: "Arabic",
    value: "ar",
    icon: icons.egypt,
  },
  {
    id: "2",
    label: "English",
    value: "en",
    icon: icons.us,
  },
];

export const orders: Order[] = [
  {
    id: "1",
    waiterName: "s24",
    time: "20:10",
    orderType: "Delivery",
    status: "Pending",
    clientName: "Tx-1231",
    clientNumber: "+201069605541",
    price: 2000,
    items: [
      {
        id: "30",
        name: "Cheesy Burger",
        price: 300,
        totalPrice: 600,
        qty: 2,
        extras: [
          {
            id: "88",
            name: "Cheese",
            price: 45,
          },
          {
            id: "99",
            name: "Bread",
            price: 45,
          },
          {
            id: "100",
            name: "Tomato",
            price: 45,
          },
        ],
      },
      {
        id: "30a",
        name: "Cheesy Chicken Burger",
        price: 250,
        totalPrice: 600,
        qty: 2,
        extras: [
          {
            id: "88",
            name: "Cheese",
            price: 45,
          },
          {
            id: "99",
            name: "Bread",
            price: 45,
          },
          {
            id: "100",
            name: "Tomato",
            price: 45,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    clientNumber: "+201069605541",

    waiterName: "s12",
    time: "18:45",
    orderType: "Pickup",
    status: "Ready",
    clientName: "Tx-1232",
    price: 1500,
    items: [
      {
        id: "31",
        name: "Vegan Salad",
        price: 400,
        totalPrice: 400,
        qty: 1,
        extras: [
          {
            id: "101",
            name: "Avocado",
            price: 50,
          },
          {
            id: "102",
            name: "Olives",
            price: 30,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    clientNumber: "+201069605541",

    waiterName: "s33",
    time: "19:20",
    orderType: "Table",
    status: "Pending",
    clientName: "Tx-1233",
    price: 2200,
    items: [
      {
        id: "32",
        name: "Grilled Chicken",
        price: 800,
        totalPrice: 1600,
        qty: 2,
        extras: [
          {
            id: "103",
            name: "BBQ Sauce",
            price: 50,
          },
          {
            id: "104",
            name: "Corn",
            price: 30,
          },
        ],
      },
    ],
  },
  {
    id: "4",
    clientNumber: "+201069605541",

    waiterName: "s27",
    time: "21:15",
    orderType: "Delivery",
    status: "Ready",
    clientName: "Tx-1234",
    price: 1800,
    items: [
      {
        id: "33",
        name: "Spaghetti Carbonara",
        price: 600,
        totalPrice: 1200,
        qty: 2,
        extras: [
          {
            id: "105",
            name: "Extra Cheese",
            price: 40,
          },
          {
            id: "106",
            name: "Bacon",
            price: 50,
          },
        ],
      },
    ],
  },
  {
    id: "5",
    clientNumber: "+201069605541",

    waiterName: "s19",
    time: "22:05",
    orderType: "Pickup",
    status: "Pending",
    clientName: "Tx-1235",
    price: 2100,
    items: [
      {
        id: "34",
        name: "Steak",
        price: 1500,
        totalPrice: 1500,
        qty: 1,
        extras: [
          {
            id: "107",
            name: "Mushrooms",
            price: 50,
          },
          {
            id: "108",
            name: "Pepper Sauce",
            price: 50,
          },
        ],
      },
    ],
  },
  {
    id: "6",
    clientNumber: "+201069605541",

    waiterName: "s05",
    time: "20:50",
    orderType: "Table",
    status: "Ready",
    clientName: "Tx-1236",
    price: 1750,
    items: [
      {
        id: "35",
        name: "Pizza Margherita",
        price: 700,
        totalPrice: 1400,
        qty: 2,
        extras: [
          {
            id: "109",
            name: "Extra Basil",
            price: 25,
          },
          {
            id: "110",
            name: "Olives",
            price: 50,
          },
        ],
      },
    ],
  },
];
