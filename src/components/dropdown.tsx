import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

type Props = {
  options: { id: number; label: string }[];
};

export const Dropdown = ({ options }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex justify-between items-center bg-transparent text-gray-950 text-base font-medium rounded-md border-2 border-gray-100 px-2 py-1.5">
          {options[0].label}
          <ChevronDown
            size={22}
            className="text-gray-950"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="bg-white flex flex-col rounded-md shadow-lg will-change-[transform,opacity] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
          {options.map((o) => (
            <DropdownMenuItem
              key={o.id}
              asChild>
              <button className="bg-transparent text-sm text-gray-950 hover:bg-gray-100 rounded-md p-2 select-none text-left">
                {o.label}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
