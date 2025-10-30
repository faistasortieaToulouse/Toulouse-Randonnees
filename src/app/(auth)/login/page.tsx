"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SocialLoginButtons from "@/components/app/SocialLoginButtons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { signInWithIdentifier } from "@/firebase/auth/auth"
import { useAuth } from "@/firebase"

export default function LoginPage() {
  const router = useRouter()
  const auth = useAuth();
  const [identite, setIdentite] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await signInWithIdentifier(auth, identite, password)
      router.push('/dashboard')
    } catch (err: any) {
      let friendlyMessage = "L'identifiant ou le mot de passe est incorrect.";
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          // Keep the message generic for security
      } else if (err.message.includes("not found")) {
          // Custom error from our function
      }
      else {
        friendlyMessage = "Une erreur s'est produite lors de la connexion."
      }
      setError(friendlyMessage)
    }
  }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>
          Entrez votre identifiant ci-dessous pour vous connecter à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur de connexion</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="identite">Identifiant</Label>
            <Input
              id="identite"
              type="text"
              placeholder="Votre pseudo"
              required
              value={identite}
              onChange={(e) => setIdentite(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mot de passe</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Ou continuer avec
              </span>
            </div>
          </div>
          <SocialLoginButtons />
        </form>
        <div className="mt-4 text-center text-sm">
          Vous n'avez pas de compte ?{" "}
          <Link href="/signup" className="underline">
            S'inscrire
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
