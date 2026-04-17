import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { defaultProposal } from "@/data/proposal/defaultProposal";
import { proposalStore } from "@/stores/proposal/proposalStore";
import { EllipsisVertical, Trash } from "lucide-react";
import { useStore } from "zustand";

export default function TopNavbar() {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  const setProposal = useStore(proposalStore, (state) => state.setProposal);

  return (
    <nav className="z-50 flex w-full justify-between border-b border-b-zinc-300 bg-white px-4 py-4">
      {/* Logo */}
      <div className="flex w-full gap-4">
        <svg
          width="48"
          height="32"
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_439_15)">
            <path
              d="M31.3601 25.6C36.662 25.6 40.9601 21.3019 40.9601 16C40.9601 10.6981 36.662 6.4 31.3601 6.4C26.3842 6.4 22.2925 10.1857 21.8081 15.034C19.8467 14.1469 17.7278 13.6167 15.5578 13.4772C16.7676 5.83929 23.3819 0 31.3601 0C40.1966 0 47.3601 7.16345 47.3601 16C47.3601 24.5142 40.7096 31.4752 32.32 31.9717V32H21.7756V30.6036C21.7756 28.7896 21.0275 27.0257 19.6564 25.7069C18.2814 24.3843 16.3926 23.6218 14.4 23.6218C12.4074 23.6218 10.5186 24.3843 9.1436 25.7069C7.77251 27.0257 7.02439 28.7896 7.02439 30.6036V32H0V30.5694C0 26.8297 1.55203 23.2725 4.26673 20.6718C6.89458 18.1544 10.4038 16.7282 14.0569 16.644C14.1711 16.6414 14.2855 16.64 14.4 16.64C14.4886 16.64 14.5772 16.6408 14.6658 16.6424C18.3466 16.7081 21.8869 18.1366 24.5333 20.6718C25.9993 22.0762 27.1262 23.7596 27.8527 25.6H31.3601Z"
              fill="#5233DD"
            />
            <path
              d="M17.3418 27.9396C18.1219 28.618 18.5602 29.5382 18.5602 30.4976V32H10.2402V30.4976C10.2402 29.5382 10.6786 28.618 11.4586 27.9396C12.2388 27.2611 13.297 26.88 14.4002 26.88C15.5035 26.88 16.5617 27.2611 17.3418 27.9396Z"
              fill="#5233DD"
            />
            <path
              d="M35.0255 14.429C33.8687 14.429 32.9311 13.4913 32.9311 12.3345V11.8109C32.9311 10.9434 32.2277 10.24 31.3601 10.24C30.4925 10.24 29.7892 10.9433 29.7892 11.8109V12.3345C29.7892 13.4913 28.8515 14.429 27.6947 14.429H27.171C26.3035 14.429 25.6001 15.1324 25.6001 16C25.6001 16.8676 26.3035 17.5709 27.171 17.5709H27.6947C28.8515 17.5709 29.7892 18.5086 29.7892 19.6654V20.1891C29.7892 21.0567 30.4925 21.76 31.3601 21.76C32.2277 21.76 32.9311 21.0567 32.9311 20.1891V19.6654C32.9311 18.5086 33.8687 17.5709 35.0255 17.5709H35.5492C36.4168 17.5709 37.1201 16.8676 37.1201 16C37.1201 15.1324 36.4168 14.429 35.5492 14.429H35.0255Z"
              fill="#5233DD"
            />
            <path
              d="M8.96008 2.56003C8.96008 3.97386 10.1062 5.11999 11.5201 5.11999H12.16C13.2204 5.11999 14.08 5.97961 14.08 7.03999C14.08 8.1004 13.2204 8.96 12.16 8.96H11.5201C10.1062 8.96 8.96008 10.1062 8.96008 11.5199V12.16C8.96008 13.2204 8.10048 14.08 7.04009 14.08C5.9797 14.08 5.12009 13.2204 5.12009 12.16V11.52C5.12009 10.1062 3.97394 8.96 2.56009 8.96H1.92C0.859616 8.96 0 8.1004 0 7.03999C0 5.97961 0.859616 5.11999 1.92 5.11999H2.5601C3.97394 5.11999 5.12009 3.97385 5.12009 2.56V1.92C5.12009 0.859616 5.9797 0 7.04009 0C8.10048 0 8.96008 0.859616 8.96008 1.92V2.56003Z"
              fill="#5233DD"
            />
          </g>
          <defs>
            <clipPath id="clip0_439_15">
              <rect width="48" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>

        {/* File name & Menu Button */}
        <div className="flex items-center">
          <span className="text-[20px] font-bold">{proposal?.title}</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>New Project...</DropdownMenuItem>
              <DropdownMenuItem>Open...</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive" className="ml-auto" asChild>
            <span className="">
              <Trash /> Reset Proposal
            </span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Proposal?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset this proposal?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setProposal(defaultProposal)}>
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
}
