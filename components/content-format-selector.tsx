import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { VideoIcon, ImageIcon, PlusCircleIcon } from "lucide-react"

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
    label: "Image",
    description: "Design visual content and infographics"
  },
  {
    id: "Other",
    icon: PlusCircleIcon,
    label: "Other",
    description: "Specify a custom content format"
  }
]

interface ContentFormatSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ContentFormatSelector({ value, onChange }: ContentFormatSelectorProps) {
  const [customFormat, setCustomFormat] = useState("")

  const handleFormatChange = (newValue: string) => {
    if (newValue === "Other") {
      onChange(customFormat || "Other")
    } else {
      onChange(newValue)
      setCustomFormat("")
    }
  }

  const handleCustomFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setCustomFormat(newValue)
    if (value === "Other" || value === customFormat) {
      onChange(newValue)
    }
  }

  return (
    <div className="space-y-4">
      <RadioGroup value={value === customFormat ? "Other" : value} onValueChange={handleFormatChange} className="grid grid-cols-3 gap-4">
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

      {value === "Other" || value === customFormat ? (
        <div className="pt-2">
          <Input
            type="text"
            placeholder="Enter custom format..."
            value={customFormat}
            onChange={handleCustomFormatChange}
            className="bg-white/50 backdrop-blur-sm border-primary/20 focus:border-primary"
          />
        </div>
      ) : null}
    </div>
  );
}