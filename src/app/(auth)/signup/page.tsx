"use client";

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SocialLoginButtons from "@/components/app/SocialLoginButtons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { signUpWithEmail } from "@/firebase/auth/auth";
import { useAuth } from "@/firebase";

export default function SignupPage() {
  const router = useRouter();
  const auth = useAuth();
  const [identite, setIdentite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [genre, setGenre] = useState<"Femme" | "Homme" | "Autre" | undefined>();
  const [etudiant, setEtudiant] = useState(false);
  const [majeur, setMajeur] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!majeur) {
      setError("Vous devez certifier être majeur(e) pour vous inscrire.");
      return;
    }
    if (!identite || !email || !password || !genre) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      await signUpWithEmail(auth, { email, password, identite, genre, etudiant, majeur });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription.");
    }
  };


  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-xl">S'inscrire</CardTitle>
        <CardDescription>
          Créez votre compte pour rejoindre la communauté Toulouse rando
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erreur d'inscription</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          <div className="grid gap-2">
            <Label htmlFor="identite">Pseudo (Identité)</Label>
            <Input id="identite" placeholder="RandoFan" required value={identite} onChange={(e) => setIdentite(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="genre">Genre</Label>
            <Select onValueChange={(value: "Femme" | "Homme" | "Autre") => setGenre(value)} value={genre} required>
              <SelectTrigger id="genre">
                <SelectValue placeholder="Sélectionnez votre genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Femme">Femme</SelectItem>
                <SelectItem value="Homme">Homme</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="etudiant" checked={etudiant} onCheckedChange={(checked) => setEtudiant(!!checked)} />
            <Label htmlFor="etudiant" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Je suis étudiant(e)
            </Label>
          </div>

           <div className="flex items-center space-x-2">
            <Checkbox id="majeur" checked={majeur} onCheckedChange={(checked) => setMajeur(!!checked)} />
            <Label htmlFor="majeur" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Je certifie être majeur(e)
            </Label>
          </div>

          <Button type="submit" className="w-full">
            Créer un compte
          </Button>

           <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Ou s'inscrire avec
              </span>
            </div>
          </div>
          <SocialLoginButtons />

        </form>
        <div className="mt-4 text-center text-sm">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="underline">
            Se connecter
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
