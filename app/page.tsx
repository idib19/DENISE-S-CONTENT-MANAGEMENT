import ContentCreatorForm from '@/components/ContentCreatorForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Content Creation Form</h1>
            <p className="text-muted-foreground">Plan and organize your content creation workflow</p>
          </div>
          <ContentCreatorForm />
        </div>
      </div>
    </main>
  );
}