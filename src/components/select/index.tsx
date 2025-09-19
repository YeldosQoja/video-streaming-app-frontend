import { SelectHTMLAttributes } from "react";
import { Select as RadixSelect } from "radix-ui";
import { Check, ChevronDown } from "lucide-react";
import "./styles.css";

type Option = {
  value: string;
  label: string;
};

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  renderItem?: (option: Option) => React.ReactNode;
}

export const Select = ({
  selectedValue,
  options,
  renderItem,
  onValueChange,
}: Props) => {
  return (
    <RadixSelect.Root
      value={selectedValue}
      onValueChange={onValueChange}>
      <RadixSelect.Trigger
        className="select-trigger"
        aria-label="Select option">
        <RadixSelect.Value placeholder="Select an option" />
        <RadixSelect.Icon>
          <ChevronDown
            className="select-icon"
            size={20}
          />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className="select-content"
          position="popper"
          sideOffset={5}>
          <RadixSelect.Viewport>
            {options.map((o) => (
              <RadixSelect.Item
                key={o.value}
                value={o.value}
                className="select-item">
                {renderItem ? (
                  renderItem(o)
                ) : (
                  <>
                    <RadixSelect.ItemIndicator
                      style={{ marginRight: "0.5rem" }}>
                      <Check
                        size={18}
                        style={{ color: "#111827" }}
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
