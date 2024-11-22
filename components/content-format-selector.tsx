import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ImageIcon, VideoIcon, NewspaperIcon, MusicIcon } from "lucide-react"

const contentFormats = [
  {
    id: "Video",
    icon: VideoIcon,
    label: "Video",
    description: "Create engaging video content"
  },
  {
    id: "Image",
    icon: ImageIcon,
    label: "Image",
    description: "Design visual content"
  },
  {
    id: "Article",
    icon: NewspaperIcon,
    label: "Article",
    description: "Write compelling articles"
  },
  {
    id: "Audio",
    icon: MusicIcon,
    label: "Audio",
    description: "Produce audio content"
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
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
        >
          <RadioGroupItem value={id} id={id} className="sr-only" />
          <Icon className="mb-3 h-6 w-6" />
          <div className="space-y-1 text-center">
            <p className="font-medium leading-none">{label}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
}