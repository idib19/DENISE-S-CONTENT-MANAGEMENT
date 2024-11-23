"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Users, Info, Sparkles, Megaphone } from "lucide-react"
import { toast } from "sonner"
import { FormSection } from "@/components/ui/form-section"
import { ContentFormatSelector } from "@/components/content-format-selector"
import { createContentRecord } from "@/lib/airtable"

const contentGoals = [
  { value: "Engagement", label: "Engagement", icon: Sparkles },
  { value: "Recruiting", label: "Recruiting", icon: Users },
  { value: "Information", label: "Information", icon: Info },
  { value: "Promotion", label: "Promotion", icon: Megaphone }
]

export default function ContentCreatorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    contentFormat: "Video",
    contentGoal: "",
    endDate: undefined as Date | undefined,
    notes: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.contentGoal || !formData.endDate) {
      toast.error("Please fill in all required fields")
      return
    }

    if (formData.contentFormat === "Other" || !formData.contentFormat.trim()) {
      toast.error("Please specify a content format")
      return
    }

    setIsSubmitting(true)
    
    try {
      await createContentRecord({
        contentFormat: formData.contentFormat,
        contentGoal: formData.contentGoal as 'Engagement' | 'Recruiting' | 'Information' | 'Promotion',
        endDate: format(formData.endDate, 'yyyy-MM-dd'),
        notes: formData.notes
      })
      
      toast.success("Content plan created successfully!")
      
      setFormData({
        contentFormat: "Video",
        contentGoal: "",
        endDate: undefined,
        notes: ""
      })
    } catch (error) {
      toast.error("Failed to create content plan. Please try again.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="elegant-card overflow-hidden">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-2xl font-display">New Content Plan</CardTitle>
          <CardDescription className="font-light">Create a new content plan for your media project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <FormSection title="Content Format" titleClass="font-display">
            <ContentFormatSelector
              value={formData.contentFormat}
              onChange={(value) => setFormData({ ...formData, contentFormat: value })}
            />
          </FormSection>

          <FormSection title="Content Goal" titleClass="font-display">
            <Select
              value={formData.contentGoal}
              onValueChange={(value) => setFormData({ ...formData, contentGoal: value })}
            >
              <SelectTrigger className="bg-white/50 backdrop-blur-sm">
                <SelectValue placeholder="Select a goal" />
              </SelectTrigger>
              <SelectContent>
                {contentGoals.map(({ value, label, icon: Icon }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormSection>

          <FormSection title="Target Completion Date" titleClass="font-display">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white/50 backdrop-blur-sm",
                    !formData.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate ? format(formData.endDate, "PPP") : "Select target date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.endDate}
                  onSelect={(date) => setFormData({ ...formData, endDate: date })}
                  initialFocus
                  className="rounded-lg border-none shadow-lg"
                />
              </PopoverContent>
            </Popover>
          </FormSection>

          <FormSection title="Additional Notes" titleClass="font-display">
            <Textarea
              placeholder="Add any additional notes or requirements..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="min-h-[100px] resize-y bg-white/50 backdrop-blur-sm"
            />
          </FormSection>

          <Button 
            type="submit" 
            className="w-full bg-primary/90 hover:bg-primary font-medium text-base py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Content Plan"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}