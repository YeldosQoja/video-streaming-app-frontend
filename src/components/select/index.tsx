import "./styles.css";
import type { ReactNode, CSSProperties } from "react";
import { Select as RadixSelect } from "radix-ui";
import { Check, ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
  icon?: ReactNode;
};

type Props = {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  triggerStyle?: CSSProperties;
};

export const Select = ({
  value,
  options,
  onChange,
  triggerStyle,
}: Props) => {
  const selectedOption = options.find((o) => o.value === value);

  return (
    <RadixSelect.Root
      value={value}
      onValueChange={onChange}>
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
                <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
