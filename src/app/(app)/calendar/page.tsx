"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { mockEvents } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const eventsOnSelectedDate = mockEvents.filter(event => 
    new Date(event.date).toDateString() === (date ? date.toDateString() : new Date().toDateString())
  );
  
  const upcomingEvents = mockEvents.filter(event => new Date(event.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Calendrier interactif</h1>
        <p className="text-muted-foreground">Visualisez tous les événements de randonnée à venir.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-shrink-0">
            <Card>
               <CardContent className="p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-3"
                />
               </CardContent>
            </Card>
        </div>
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle className="break-words">
                        Événements du {date ? date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 min-h-[150px]">
                    {eventsOnSelectedDate.length > 0 ? (
                        eventsOnSelectedDate.map(event => (
                            <div key={event.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50">
                                <div>
                                    <p className="font-semibold">{event.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        à {new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - Organisé par {event.organizer.identite}
                                    </p>
                                </div>
                                <Link href={`/events/${event.id}`} className="shrink-0">
                                    <ArrowUpRight className="h-5 w-5 text-muted-foreground hover:text-primary"/>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">Aucun événement prévu pour cette date.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Tous les événements à venir</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[400px] overflow-y-auto pr-4 space-y-4">
          {upcomingEvents.map(event => (
            <div key={event.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="bg-muted p-2 rounded-md flex flex-col items-center justify-center text-sm w-16 shrink-0">
                  <span className="font-semibold">{new Date(event.date).toLocaleString('fr-FR', { month: 'short' }).toUpperCase()}</span>
                  <span className="font-bold text-xl">{new Date(event.date).getDate()}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                    à {new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} par {event.organizer.identite}
                </p>
              </div>
              <div className="flex -space-x-2 overflow-hidden">
                {[event.organizer, ...event.participants].slice(0,3).map(p => 
                  p.avatarUrl && <Image key={p.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-card" src={p.avatarUrl} width={32} height={32} alt={p.identite} />
                )}
                {event.participants.length + 1 > 3 && <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-2 ring-card text-xs font-medium">+{event.participants.length + 1 - 3}</div>}
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/events/${event.id}`}>
                  Voir
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
