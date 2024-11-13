import icons from "./icons";

export const links = [
  {
    icon: icons.homeIcon,
    text: "Профиль",
    forward: "./",
  },
  {
    icon: icons.walletIcon,
    text: "Денежные средства",
    forward: "/home/wallet",
  },
  {
    icon: icons.profileIcon,
    text: "Личные данные",
    forward: "/home/profile",
  },
  {
    icon: icons.statsIcon,
    text: "Статистика бизнеса",
    forward: "/stats",
  },
  {
    icon: icons.bonusIcon,
    text: "Бонусы",
    forward: "/bonus",
  },
  {
    icon: icons.historyIcon,
    text: "История выплат",
    forward: "/history",
  },
  {
    icon: icons.planIcon,
    text: "План инвестиций",
    forward: "/plan",
  },
  {
    icon: icons.logOutIcon,
    text: "Выйти из профиля",
    forward: "./",
  },
];

export const socialLinks = [
  {
    icon: icons.tgIcon,
    forward: "./",
  },
  {
    icon: icons.vkIcon,
    forward: "./",
  },
  {
    icon: icons.instaIcon,
    forward: "./",
  },
];
