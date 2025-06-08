import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

type Option = {
  key: string;
  label: string;
};

type Props = {
  options: Option[];
  selectedKey: string;
  onChange?: (key: string) => void;
  renderItem?: (option: Option) => React.ReactNode;
};

export const Select = ({
  selectedKey,
  options,
  onChange,
  renderItem,
}: Props) => {
  return (
    <RadixSelect.Root
      value={selectedKey}
      onValueChange={onChange}>
      <RadixSelect.Trigger
        className="inline-flex items-center justify-between bg-transparent text-gray-950 text-base font-medium rounded-md border-2 border-gray-100 px-2 py-1.5 w-full"
        aria-label="Select option">
        <RadixSelect.Value placeholder="Select an option" />
        <RadixSelect.Icon>
          <ChevronDown
            className="text-gray-950"
            size={20}
          />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className="bg-white w-[--radix-select-trigger-width] rounded-md shadow-xl p-1"
          position="popper"
          sideOffset={5}>
          <RadixSelect.Viewport>
            {options.map((o) => (
              <RadixSelect.Item
                key={o.key}
                value={o.key}
                className="flex items-center text-base text-gray-950 hover:bg-gray-100 focus:bg-gray-100 outline-none rounded-none px-2 py-1.5 select-none cursor-pointer">
                {renderItem ? (
                  renderItem(o)
                ) : (
                  <>
                    <RadixSelect.ItemIndicator className="mr-2">
                      <Check
                        size={18}
                        className="text-gray-900"
                      />
                    </RadixSelect.ItemIndicator>
                    <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
                  </>
                )}
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
