"use client"

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  const navegarRegistrado = (path: string) => {
    router.push(user ? path : "/login")
  }

  return (
    <div className="space-y-10">
      
      <section className="bg-white rounded-3xl p-14 shadow-sm text-center">
          <h1 className="text-6xl font-bold mb-6">
              SocialBoard ⚽
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Diseña pizarras tácticas, comparte análisis de partidos
              y colabora con otros usuarios en una única plataforma.
          </p>

          <div className="flex justify-center gap-4 mt-8">
              <Button onClick={() => router.push("/posts")}>
                  Publicaciones
              </Button>

              <Button onClick={() => navegarRegistrado("/boards")} variant="outline">
                  Pizarras tácticas
              </Button>
          </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
          <Card className="hover:-translate-y-1 hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-4">
                  ⚽
              </div>

              <h3 className="text-xl font-semibold">
                  Pizarras tácticas
              </h3>

              <p className="text-gray-500 mt-3">
                  Diseña y analiza jugadas mediante un editor visual.
              </p>
          </Card>

          <Card className="hover:-translate-y-1 hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-4">
                  📝
              </div>

              <h3 className="text-xl font-semibold">
                  Publicaciones
              </h3>

              <p className="text-gray-500 mt-3">
                  Comparte tus propios análisis o visualiza los análisis de la comunidad.
              </p>
          </Card>

          <Card className="hover:-translate-y-1 hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-4">
                  💬
              </div>

              <h3 className="text-xl font-semibold">
                  Comentarios
              </h3>

              <p className="text-gray-500 mt-3">
                  Debate cada jugada con la comunidad.
              </p>
          </Card>
      </section>
    </div>
  )
}