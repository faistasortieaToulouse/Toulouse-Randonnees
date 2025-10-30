
import { mockUsers } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MembersPage() {
    const currentUser = mockUsers[0];
    const otherUsers = mockUsers.filter(u => u.id !== currentUser.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Membres de la communauté</h1>
                <p className="text-muted-foreground">Trouvez d'autres passionnés de randonnée et connectez-vous.</p>
            </div>

             <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un membre..." className="pl-8" />
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                        {otherUsers.map(user => (
                            <Card key={user.id} className="text-center flex flex-col items-center p-6">
                                <Avatar className="h-20 w-20 mb-4">
                                    {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.identite} />}
                                    <AvatarFallback className="text-2xl">{user.identite.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h3 className="font-semibold text-lg">{user.identite}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{user.commune}</p>
                                <Button className="w-full">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Ajouter en ami
                                </Button>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
