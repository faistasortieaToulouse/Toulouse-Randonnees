
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockUsers } from "@/lib/mock-data";
import { User, ShieldAlert } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProfilePage() {
    const user = mockUsers[0]; // Using mock admin user for example

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <User className="h-10 w-10 text-accent"/>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Profil et Paramètres</h1>
                    <p className="text-muted-foreground">Gérez vos informations personnelles et les paramètres de votre compte.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-8">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Avatar className="h-24 w-24 mb-2">
                                {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.identite} />}
                                <AvatarFallback className="text-3xl">{user.identite.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle>{user.identite}</CardTitle>
                            <CardDescription>{user.role}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">Changer la photo</Button>
                        </CardContent>
                    </Card>
                     <Card className="border-destructive/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-destructive">
                                <ShieldAlert className="h-5 w-5" />
                                Zone de danger
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row items-center justify-between rounded-lg border border-destructive bg-destructive/5 p-4 gap-4">
                            <div>
                                <p className="font-semibold">Supprimer mon compte</p>
                                <p className="text-sm text-muted-foreground">Toutes vos données seront définitivement effacées.</p>
                            </div>
                            <Button variant="destructive" className="w-full sm:w-auto shrink-0">
                                Se désinscrire
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations du profil</CardTitle>
                            <CardDescription>Ces informations seront visibles par les autres membres.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="prenom">Prénom</Label>
                                    <Input id="prenom" defaultValue={user.prenom} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nom">Nom</Label>
                                    <Input id="nom" defaultValue={user.nom} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="identite">Pseudo (Identité)</Label>
                                <Input id="identite" defaultValue={user.identite} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description du profil</Label>
                                <Textarea id="description" defaultValue={user.description} placeholder="Une petite bio, vos centres d'intérêt..."/>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="commune">Commune</Label>
                                    <Input id="commune" defaultValue={user.commune} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="dateNaissance">Date de naissance</Label>
                                    <Input id="dateNaissance" type="date" defaultValue={user.dateNaissance} />
                                </div>
                            </div>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="genre">Genre</Label>
                                    <Select defaultValue={user.genre}>
                                        <SelectTrigger id="genre">
                                            <SelectValue placeholder="Sélectionnez votre genre" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="femme">Femme</SelectItem>
                                            <SelectItem value="homme">Homme</SelectItem>
                                            <SelectItem value="autre">Autre</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="langues">Langues parlées</Label>
                                    <Input id="langues" defaultValue={user.langues} placeholder="Français, Anglais..."/>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button>Enregistrer les modifications</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations du compte</CardTitle>
                            <CardDescription>Ces informations sont privées.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue={user.email} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="telephone">Numéro de téléphone</Label>
                                <Input id="telephone" type="tel" defaultValue={user.telephone} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="password">Changer de mot de passe</Label>
                                <Input id="password" type="password" placeholder="Nouveau mot de passe"/>
                            </div>
                             <div className="flex justify-end">
                                <Button>Mettre à jour le compte</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
