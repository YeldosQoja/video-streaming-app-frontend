import type { CSSProperties, ReactNode, SelectHTMLAttributes } from "react";
import { Select as RadixSelect } from "radix-ui";
import { Check, ChevronDown } from "lucide-react";
import "./styles.css";

type Option = {
  value: string;
  label: string;
  icon?: ReactNode;
};

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  triggerStyle?: CSSProperties;
}

export const Select = ({ selectedValue, options, onValueChange, triggerStyle }: Props) => {
  const selectedOption = options.find((o) => o.value === selectedValue);

  return (
    <RadixSelect.Root
      value={selectedValue}
      onValueChange={onValueChange}>
      <RadixSelect.Trigger
        className="select-trigger"
        style={triggerStyle}
        aria-label="Select option">
        <RadixSelect.Value asChild>
          <span className="label">
            {selectedOption === undefined
              ? "Select an option"
              : selectedOption.label}
          </span>
        </RadixSelect.Value>
        <RadixSelect.Icon asChild>
          <ChevronDown
            className="icon"
            size={20}
          />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className="select-content"
          position="popper"
          sideOffset={5}>
          <RadixSelect.ScrollUpButton />
          <RadixSelect.ScrollDownButton />
          <RadixSelect.Viewport>
            {options.map((o) => (
              <RadixSelect.Item
                key={o.value}
                value={o.value}
                className="select-item">
                <RadixSelect.ItemIndicator asChild>
                  <Check
                    size={18}
                    className="item-indicator"
                  />
                </RadixSelect.ItemIndicator>
                {o.icon}
                <RadixSelect.ItemText>
                  {o.label}
                </RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
