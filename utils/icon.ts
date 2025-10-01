import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { PiTreeViewBold, PiTreeViewThin } from "react-icons/pi";
import {
  LiaCalendarCheckSolid,
  LiaCalendarTimes,
  LiaProjectDiagramSolid,
} from "react-icons/lia";
import { AiOutlineDollar } from "react-icons/ai";
import { GrDocumentPerformance } from "react-icons/gr";
import { IoDocumentsOutline } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LuUser } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IconType } from "react-icons";


const iconMap: Record<string, IconType> = {
  dashboard: MdOutlineDashboard,
  users: TbUsers,
  department: PiTreeViewBold,
  attendance: LiaCalendarCheckSolid,
  leaves: LiaCalendarTimes,
  projects: LiaProjectDiagramSolid,
  payroll: AiOutlineDollar,
  performance: GrDocumentPerformance,
  documents: IoDocumentsOutline,
  announcements: HiOutlineSpeakerphone,
  resignations: PiTreeViewThin,
  holidays: PiTreeViewThin,
  user: LuUser,
  settings: IoSettingsOutline,
  logout: MdOutlineLogout,
};


export default iconMap;
