import ContentCreatorForm from '@/components/ContentCreatorForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-foreground/90 font-display">
              Content Creation Hub
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              Plan and organize your content with elegance
            </p>
          </div>
          <ContentCreatorForm />
        </div>
      </div>
    </main>
  );
}