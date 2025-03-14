
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: any) => void;
  type?: string;
  required?: boolean;
  step?: string;
  error?: string;
}

export function FormInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  step,
  error,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(type === "number" ? parseFloat(e.target.value) : e.target.value)}
        required={required}
        step={step}
        className={error ? "border-red-500" : ""}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
