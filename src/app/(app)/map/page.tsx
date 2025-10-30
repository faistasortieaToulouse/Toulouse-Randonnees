"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockEvents } from "@/lib/mock-data";
import { ArrowUpRight, MapPin, LocateFixed, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function InteractiveMapPage() {
  const upcomingEvents = mockEvents.filter(event => new Date(event.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const [locationStatus, setLocationStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const requestLocation = () => {
    setLocationStatus("loading");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude:", position.coords.latitude, "Longitude:", position.coords.longitude);
          setLocationStatus("success");
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage("Vous avez refusé l'accès à la géolocalisation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage("Les informations de localisation ne sont pas disponibles.");
              break;
            case error.TIMEOUT:
              setErrorMessage("La demande de géolocalisation a expiré.");
              break;
            default:
              setErrorMessage("Une erreur inconnue est survenue.");
              break;
          }
          setLocationStatus("error");
        }
      );
    } else {
      setErrorMessage("La géolocalisation n'est pas prise en charge par ce navigateur.");
      setLocationStatus("error");
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const renderMapContent = () => {
    switch (locationStatus) {
      case "loading":
        return (
          <div className="text-center text-muted-foreground">
            <MapPin className="h-16 w-16 mx-auto animate-bounce"/>
            <p className="mt-2 font-semibold">Carte interactive en cours de chargement...</p>
            <p className="text-sm">Veuillez autoriser l'accès à votre position.</p>
          </div>
        );
      case "error":
        return (
            <div className="text-center text-destructive">
                <AlertTriangle className="h-16 w-16 mx-auto"/>
                <p className="mt-4 font-semibold">Impossible d'accéder à votre position</p>
                <p className="text-sm mt-2">{errorMessage}</p>
                <Button onClick={requestLocation} variant="outline" className="mt-4">
                    <LocateFixed className="mr-2 h-4 w-4"/>
                    Réessayer
                </Button>
            </div>
        );
      case "success":
        return (
            <div className="text-center text-green-600">
                <LocateFixed className="h-16 w-16 mx-auto"/>
                <p className="mt-2 font-semibold">Position trouvée !</p>
                <p className="text-sm">La carte s'afficherait ici avec votre position.</p>
            </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Carte des points de départ</h1>
        <p className="text-muted-foreground">Explorez les points de départ des randonnées autour de Toulouse.</p>
      </div>
      <Card className="flex-1 flex flex-col">
        <CardContent className="p-2 flex-1">
            <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                {renderMapContent()}
            </div>
        </CardContent>
      </Card>
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
