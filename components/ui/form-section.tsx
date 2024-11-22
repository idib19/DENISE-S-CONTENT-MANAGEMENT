import { Label } from "@/components/ui/label"

interface FormSectionProps {
  title: string;
  titleClass?: string;
  children: React.ReactNode;
}

export function FormSection({ title, titleClass, children }: FormSectionProps) {
  return (
    <div className="space-y-3">
      <Label className={`text-base ${titleClass}`}>{title}</Label>
      {children}
    </div>
  );
}