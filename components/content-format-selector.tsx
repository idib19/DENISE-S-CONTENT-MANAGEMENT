import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { VideoIcon, ImageIcon } from "lucide-react"

const contentFormats = [
  {
    id: "Video",
    icon: VideoIcon,
    label: "Video",
    description: "Create engaging video content"
  },
  {
    id: "Picture",
    icon: ImageIcon,
    label: "Picture/Infographic",
    description: "Design visual content and infographics"
  }
]

interface ContentFormatSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ContentFormatSelector({ value, onChange }: ContentFormatSelectorProps) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-4">
      {contentFormats.map(({ id, icon: Icon, label, description }) => (
        <Label
          key={id}
          htmlFor={id}
          className="flex flex-col items-center justify-between rounded-xl border border-border/50 bg-white/50 backdrop-blur-sm p-6 hover:bg-accent hover:text-accent-foreground transition-colors duration-200 [&:has([data-state=checked])]:border-primary/50 [&:has([data-state=checked])]:bg-primary/5 cursor-pointer"
        >
          <RadioGroupItem value={id} id={id} className="sr-only" />
          <Icon className="mb-3 h-8 w-8 text-primary/80" />
          <div className="space-y-1 text-center">
            <p className="font-medium leading-none font-display">{label}</p>
            <p className="text-sm text-muted-foreground font-light">{description}</p>
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
}