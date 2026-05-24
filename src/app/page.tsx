import PostList from "@/features/posts/components/PostList";

export default function HomePage() {
  return (
    <div className="space-y-10">
      
      <section className="bg-white rounded-2xl p-10 shadow-sm text-center">
        <h1 className="text-5xl font-bold mb-4">
          SocialBoard
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Plataforma social para crear, compartir y analizar
          jugadas tácticas de fútbol.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Últimas publicaciones
        </h2>
        <PostList />
      </section>
    </div>
  )
}