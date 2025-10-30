import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEvents } from "@/lib/mock-data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, PlusCircle, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

function EventCard({ event }: { event: typeof mockEvents[0] }) {
    const participantAvatars = event.participants.slice(0, 3);
    const remainingParticipants = event.participants.length - participantAvatars.length;

    return (
        <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <CardTitle className="font-headline text-lg mb-0">{event.title}</CardTitle>
                    <Badge variant="secondary">{event.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2 pt-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à {new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
                 <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>RDV : {event.meetingPoint}</span>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                   {event.organizer.avatarUrl && <Image src={event.organizer.avatarUrl} alt={event.organizer.identite} width={24} height={24} className="rounded-full" />}
                   <span>Organisé par <span className="font-semibold text-foreground">{event.organizer.identite}</span></span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="flex items-center">
                    <div className="flex -space-x-2 overflow-hidden mr-2">
                        {participantAvatars.map(p => p.avatarUrl && (
                            <Image key={p.id} src={p.avatarUrl} alt={p.identite} width={28} height={28} className="inline-block rounded-full ring-2 ring-card" />
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {event.participants.length} / {event.maxParticipants}
                    </span>
                 </div>
                <Button asChild size="sm" className="w-full sm:w-auto">
                    <Link href={`/events/${event.id}`}>
                        Détails <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Inscris-toi à une randonnée</h1>
          <p className="text-muted-foreground">Trouve ta prochaine sortie et rejoins d'autres passionnés.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button asChild className="w-full">
            <Link href="/events/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Créer une sortie
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
