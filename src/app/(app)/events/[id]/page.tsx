
import { mockEvents, mockHikes, mockUsers } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, TrendingUp, Users, UserPlus, Check, Star, CloudSun, Sun } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import HikeRecommendation from "@/components/app/HikeRecommendation";

function Rating() {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 cursor-pointer" />
      ))}
    </div>
  );
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = mockEvents.find(e => e.id === params.id);
  if (!event) {
    notFound();
  }
  const hike = mockHikes.find(h => h.id === event.hikeId);
  const eventDate = new Date(event.date);
  const showWeather = eventDate.getFullYear() === 2025 && eventDate.getMonth() === 9; // October is month 9

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div>
            <Badge variant="secondary" className="mb-2">{event.status}</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold font-headline">{event.title}</h1>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-4 gap-y-2 text-muted-foreground mt-2">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{eventDate.toLocaleDateString('fr-FR', { dateStyle: 'full' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{eventDate.toLocaleTimeString('fr-FR', { timeStyle: 'short' })}</span>
                </div>
                 <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <MapPin className="h-4 w-4" />
                    <span>{event.meetingPoint}</span>
                </div>
            </div>
        </div>
        
        {/* Map Placeholder */}
        <Card>
            <CardHeader>
                <CardTitle>Le circuit</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-muted-foreground" />
                </div>
            </CardContent>
        </Card>

        {/* Description */}
        <Card>
            <CardHeader><CardTitle>Description de la sortie</CardTitle></CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground dark:prose-invert">
                <p>Rejoignez-nous pour une magnifique randonnée sur le circuit "{hike?.title}". C'est une excellente occasion de profiter de la nature et de rencontrer de nouvelles personnes.</p>
                <p>Le point de rendez-vous est fixé à <strong>{event.meetingPoint}</strong>. Assurez-vous d'arriver un peu en avance. N'oubliez pas d'apporter de l'eau, de bonnes chaussures et une collation.</p>
                <p>Au plaisir de vous y voir !</p>
            </CardContent>
        </Card>

        {/* Hike Details */}
        {hike && (
            <Card>
                <CardHeader><CardTitle>Détails du circuit : {hike.title}</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> <span>{hike.location}</span></div>
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /> <span>{hike.distance}</span></div>
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> <span>{hike.duration}</span></div>
                    <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-muted-foreground" /> <Badge variant="outline">{hike.difficulty}</Badge></div>
                </CardContent>
            </Card>
        )}
        
        {/* Ratings Section - visible only after event */}
        {event.status === 'Terminé' && (
          <Card>
            <CardHeader><CardTitle>Notations</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <p>Notez cette randonnée :</p>
                <Rating />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <p>Notez l'organisateur ({event.organizer.identite}) :</p>
                <Rating />
              </div>
              <p className="text-xs text-muted-foreground">* Vos notes ne sont visibles que par les administrateurs.</p>
              <Button>Soumettre les notes</Button>
            </CardContent>
          </Card>
        )}

        {hike && <HikeRecommendation hike={hike} />}

      </div>
      <div className="lg:col-span-1 space-y-6">
        <Card>
            <CardHeader><CardTitle>S'inscrire</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
                <p>Rejoignez cette sortie pour une journée mémorable.</p>
                {(event.participants.length + 1) >= event.maxParticipants ? (
                     <Button size="lg" variant="outline" className="w-full"><Check className="mr-2 h-4 w-4" /> Mettre en liste d'attente</Button>
                ) : (
                    <Button size="lg" className="w-full"><UserPlus className="mr-2 h-4 w-4" /> Participer</Button>
                )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Météo prévue</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4 text-muted-foreground">
                {showWeather ? (
                    <>
                        <Sun className="h-10 w-10 text-yellow-400" />
                        <div>
                            <p className="font-semibold text-foreground">Ensoleillé</p>
                            <p className="text-sm">Température prévue : 19°C</p>
                        </div>
                    </>
                ) : (
                    <>
                        <CloudSun className="h-10 w-10 text-yellow-400" />
                        <div>
                            <p className="font-semibold text-foreground">Bientôt disponible</p>
                            <p className="text-sm">Les prévisions seront affichées ici à l'approche de l'événement.</p>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Organisateur</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
                {event.organizer.avatarUrl && <Image src={event.organizer.avatarUrl} alt={event.organizer.identite} width={48} height={48} className="rounded-full" />}
                <div>
                    <p className="font-semibold">{event.organizer.identite}</p>
                    <p className="text-sm text-muted-foreground">{event.organizer.role}</p>
                </div>
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Participants</span>
              <span className="text-sm font-medium text-muted-foreground">{event.participants.length + 1} / {event.maxParticipants}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[event.organizer, ...event.participants].map(p => (
              <div key={p.id} className="flex items-center gap-3">
                {p.avatarUrl && <Image src={p.avatarUrl} alt={p.identite} width={32} height={32} className="rounded-full" />}
                <span className="font-medium text-sm">{p.identite}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
