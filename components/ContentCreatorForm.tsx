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
import { CalendarIcon, Target, Users, Info } from "lucide-react"
import { toast } from "sonner"
import { FormSection } from "@/components/ui/form-section"
import { ContentFormatSelector } from "@/components/content-format-selector"
import { createContentRecord } from "@/lib/airtable"

const contentGoals = [
  { value: "Engagement", label: "Engagement", icon: Target },
  { value: "Recruiting", label: "Recruiting", icon: Users },
  { value: "Information", label: "Information", icon: Info }
]

export default function ContentCreatorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    contentFormat: "Video",
    contentGoal: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    notes: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.contentGoal || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    
    try {
      await createContentRecord({
        contentFormat: formData.contentFormat as 'Video' | 'Audio',
        contentGoal: formData.contentGoal as 'Engagement' | 'Recruiting' | 'Information',
        startDate: format(formData.startDate, 'yyyy-MM-dd'),
        endDate: format(formData.endDate, 'yyyy-MM-dd'),
        notes: formData.notes
      })
      
      toast.success("Content plan created successfully!")
      
      // Reset form
      setFormData({
        contentFormat: "Video",
        contentGoal: "",
        startDate: undefined,
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
      <Card className="border-2">
        <CardHeader>
          <CardTitle>New Content Plan</CardTitle>
          <CardDescription>Create a new content plan for your media project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <FormSection title="Content Format">
            <ContentFormatSelector
              value={formData.contentFormat}
              onChange={(value) => setFormData({ ...formData, contentFormat: value })}
            />
          </FormSection>

          <FormSection title="Content Goal">
            <Select
              value={formData.contentGoal}
              onValueChange={(value) => setFormData({ ...formData, contentGoal: value })}
            >
              <SelectTrigger>
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

          <div className="grid gap-6 md:grid-cols-2">
            <FormSection title="Start Date">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => setFormData({ ...formData, startDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormSection>

            <FormSection title="End Date">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => setFormData({ ...formData, endDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormSection>
          </div>

          <FormSection title="Additional Notes">
            <Textarea
              placeholder="Add any additional notes or requirements..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="min-h-[100px] resize-y"
            />
          </FormSection>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Content Plan"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}