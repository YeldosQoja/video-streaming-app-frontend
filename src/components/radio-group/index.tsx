import "./styles.css";
import { RadioGroup as RadixRadioGroup } from "radix-ui";
import { Label } from "../label";

type RadioGroupItem = {
  value: string;
  id: string;
};

type Props = {
  items: RadioGroupItem[];
  value?: string;
  onValueChange?: (value: string) => void;
};

export const RadioGroup = ({ items, value, onValueChange }: Props) => {
  const handleValueChange = (value: string) => {
    if (onValueChange) onValueChange(value);
  };

  return (
    <RadixRadioGroup.Root
      className="radio-group"
      value={value}
      onValueChange={handleValueChange}>
      {items.map(({ id, value }) => (
        <div key={id}>
          <RadixRadioGroup.Item
            value={value}
            id={id}
            className="item">
            <RadixRadioGroup.Indicator className="indicator" />
          </RadixRadioGroup.Item>
          <Label htmlFor={id}>{value}</Label>
        </div>
      ))}
    </RadixRadioGroup.Root>
  );
};
