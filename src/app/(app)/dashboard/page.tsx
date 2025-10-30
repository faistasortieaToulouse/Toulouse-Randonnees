
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEvents, mockForumTopics, mockUsers } from "@/lib/mock-data";
import { Activity, ArrowUpRight, CalendarPlus, PlusCircle, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue sur Toulouse rando, Alex !</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mes Événements à Venir
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +2 depuis la semaine dernière
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Invitations en Attente
            </CardTitle>
            <CalendarPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Pour la rando "Canal du Midi"
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux Messages</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +3 depuis votre dernière visite
            </p>
          </CardContent>
        </Card>
        <Card className="bg-primary text-primary-foreground sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Prêt pour une nouvelle aventure ?</CardTitle>
            </CardHeader>
            <CardContent>
                <Button asChild variant="secondary" className="w-full">
                    <Link href="/events/create">
                        <PlusCircle className="mr-2 h-4 w-4" /> Créer une sortie
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mes prochaines randonnées</CardTitle>
            <CardDescription>
              Les sorties auxquelles vous êtes inscrit(e).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockEvents.slice(0, 3).map(event => (
              <div key={event.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="bg-muted p-2 rounded-md flex flex-col items-center justify-center text-sm">
                    <span>{new Date(event.date).toLocaleString('fr-FR', { month: 'short' }).toUpperCase()}</span>
                    <span className="font-bold text-lg">{new Date(event.date).getDate()}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-muted-foreground">Organisé par {event.organizer.identite}</p>
                </div>
                 <div className="flex -space-x-2 overflow-hidden">
                    {event.participants.slice(0, 3).map(p => 
                        p.avatarUrl && <Image key={p.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-background" src={p.avatarUrl} width={24} height={24} alt={p.identite} />
                    )}
                    {event.participants.length > 3 && <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted ring-2 ring-background text-xs font-medium">+{event.participants.length-3}</div>}
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/events/${event.id}`}>
                    Voir
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activité du forum</CardTitle>
            <CardDescription>Dernières discussions de la communauté.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockForumTopics.map(topic => (
              <div key={topic.id} className="flex flex-col gap-1">
                 <Link href={`/forum/${topic.id}`} className="font-semibold hover:underline">{topic.title}</Link>
                 <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>par {topic.author.identite}</span>
                    <Badge variant="outline">{topic.replies} réponses</Badge>
                 </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
