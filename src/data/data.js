import { CiViewList } from "react-icons/ci";
import { BiMovie } from "react-icons/bi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

export const Features = [
  {
    id: 1,
    label: "Sınırsız liste oluşturun!",
    icon: CiViewList,
  },
  {
    id: 2,
    label: "Her hafta güncellenen film listesi!",
    icon: BiMovie,
  },
  {
    id: 3,
    label: "Hızlı, güvenilir!",
    icon: IoShieldCheckmarkOutline,
  },
];

export const navTabs = [
  { id: 1, label: "Liste Oluştur", to: "/add-list" },
  { id: 2, label: "Kullanıcılar", to: "/users" },
  { id: 3, label: "Profilim", to: "/profile" },
];
