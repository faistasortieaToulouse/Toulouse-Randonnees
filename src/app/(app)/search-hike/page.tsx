
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockHikes } from "@/lib/mock-data";
import { MapPin, Search, LocateFixed, AlertTriangle, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";

function HikeCard({ hike }: { hike: typeof mockHikes[0] }) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="relative">
                <Image
                    src={hike.imageUrl}
                    alt={hike.title}
                    width={600}
                    height={400}
                    className="w-full h-40 object-cover"
                    data-ai-hint={hike.imageHint}
                />
                <Badge variant={hike.type === "Open Topo Maps" ? "default" : "secondary"} className="absolute top-2 right-2">{hike.type}</Badge>
            </div>
            <CardContent className="p-4 flex-1 flex flex-col">
                <h3 className="text-base font-bold font-headline mb-2">{hike.title}</h3>
                <div className="text-xs text-muted-foreground space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{hike.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{hike.distance} / {hike.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3" />
                        <Badge variant="outline" className="text-xs">{hike.difficulty}</Badge>
                    </div>
                </div>
                <Button asChild className="w-full mt-3" size="sm">
                    <Link href={`/events/create?hikeId=${hike.id}`}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Organiser une sortie
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}


export default function SearchHikePage() {
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
                <p className="text-sm">Les circuits trouvés s'afficheraient ici sur la carte.</p>
            </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Rechercher un circuit</h1>
        <p className="text-muted-foreground">Trouvez un itinéraire de rando ou une balade urbaine et organisez votre sortie.</p>
      </div>
      
       <Card>
            <CardContent className="p-4">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Entrez un nom de lieu (ex: Toulouse centre, Pyrénées, Forêt de Bouconne...)" className="pl-10 h-12 text-base" />
                </div>
            </CardContent>
        </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="h-full min-h-[400px] lg:min-h-0">
                <CardContent className="p-2 h-full">
                    <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                        {renderMapContent()}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <h2 className="text-xl font-semibold tracking-tight">Résultats de la recherche</h2>
            {mockHikes.map(hike => (
                <HikeCard key={hike.id} hike={hike} />
            ))}
        </div>
      </div>
    </div>
  );
}
