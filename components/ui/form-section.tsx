import { Label } from "@/components/ui/label"

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base">{title}</Label>
      {children}
    </div>
  );
}