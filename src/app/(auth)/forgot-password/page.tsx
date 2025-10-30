"use client"

import Link from "next/link"
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email) {
      setError("Veuillez entrer votre adresse email.")
      return
    }

    // Placeholder for password reset logic
    try {
      // Here you would call your authentication service to send a password reset email
      console.log(`Password reset link sent to ${email}`)
      setSuccess("Si un compte avec cet email existe, un lien de réinitialisation a été envoyé.")
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.")
    }
  }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Mot de passe oublié</CardTitle>
        <CardDescription>
          Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
             <Alert variant="default" className="border-green-500 text-green-700 dark:border-green-600 dark:text-green-400">
              <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-600" />
              <AlertTitle>Succès</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!!success}
            />
          </div>
          <Button type="submit" className="w-full" disabled={!!success}>
            Envoyer le lien
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="underline">
            Retour à la connexion
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
