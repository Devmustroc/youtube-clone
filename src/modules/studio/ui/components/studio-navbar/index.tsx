import Link from "next/link";
import Image from "next/image";
import {SidebarTrigger} from "@/components/ui/sidebar";
import { SearchInput } from "./search-input";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";

export const StudioNavbar = () => {
    return (
        <nav
            className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50"
        >
           <div
            className="flex items-center gap-4 w-full"
           >
               { /* Menu Logo */ }
               <div
                className="flex items-center flex-shrink-0 gap-4"
               >
                   <SidebarTrigger />
                   <Link
                       href="/studio"
                   >
                       <div
                           className="flex items-center gap-2"
                       >
                           <Image
                               src="/logo.svg"
                               alt="logo"
                               width={32}
                               height={32}
                           />
                           <p>
                            <span
                                className="text-xl font-semibold tracking-tight"
                            >
                                 Studio
                            </span>
                           </p>
                       </div>
                   </Link>
               </div>
           </div>
            { /* spacer */ }
            <div className="flex-1" />

            <div
                className="flex shrink-0 items-center flex gap-4"
            >
                <AuthButton />
            </div>
        </nav>
    );
}