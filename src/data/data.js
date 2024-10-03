import { CiViewList } from "react-icons/ci";
import { BiMovie } from "react-icons/bi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { WiStars } from "react-icons/wi";
import { BsStars } from "react-icons/bs";

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
    label: "Güvenilir, hızlı, ücretsiz!",
    icon: IoShieldCheckmarkOutline,
  },
];

export const navTabs = [
  { id: 4, label: "Listeler", to: "/lists", icon: BsStars },
  { id: 1, label: "Liste Oluştur", to: "/add-list" },
  { id: 2, label: "Kullanıcılar", to: "/users" },
];

export const howItWorks = [
  {
    id: 1,
    icon: FaRegUserCircle,
    title: "Kayıt Olun",
    desc: "  Platformumuza kolayca kayıt olun ve kendinize ait bir profil oluşturun.",
  },
  {
    id: 2,
    icon: MdFormatListBulletedAdd,
    title: "Listelerinizi Oluşturun",
    desc: "Sevdiğiniz filmleri ekleyerek kendi listelerinizi oluşturun ve paylaşın.",
  },
  {
    id: 3,
    icon: WiStars,
    title: "Keyfinize Bakın",
    desc: "Oluşturulan diğer filmlere göz atarak keyifli vakit geçirin ve yeni filmler keşfedin.",
  },
];
