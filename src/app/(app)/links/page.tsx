import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2 } from "lucide-react";

const links = [
    { title: "FFRandonnée - Fédération Française de la Randonnée Pédestre", url: "www.ffrandonnee.fr", description: "Le site officiel pour trouver des itinéraires homologués et des informations pratiques." },
    { title: "Visorando", url: "visorando.com", description: "Des milliers d'idées de randonnées partout en France avec cartes et fiches détaillées." },
    { title: "AllTrails", url: "alltrails.com", description: "Application populaire avec une grande communauté et des avis sur de nombreux sentiers." },
    { title: "OpenTopoMap", url: "opentopomap.org", description: "Carte topographique libre basée sur les données d'OpenStreetMap." },
    { title: "OpenStreetMap", url: "openstreetmap.org", description: "La carte libre et collaborative mondiale, une source de données essentielle pour de nombreuses cartes de randonnée." },
    { title: "Météo France Montagne", url: "meteofrance.com/previsions-meteo-montagne", description: "Prévisions météorologiques spécifiques pour les massifs montagneux." },
    { title: "Météo France Occitanie", url: "meteofrance.com/previsions-meteo-france/occitanie/regin11", description: "Prévisions météorologiques pour la région Occitanie." },
    { title: "HexaTrek", url: "www.hexatrek.com/", description: "Le sentier de grande randonnée qui traverse la France." },
    { title: "MonGR", url: "www.mongr.fr/", description: "Le site de la FFRandonnée dédié aux itinéraires de Grande Randonnée (GR®)." },
    { title: "IGNrando", url: "ignrando.fr/", description: "Le portail de l'Institut Géographique National pour trouver et partager des parcours." },
    { title: "Komoot - Randonnées depuis Toulouse", url: "www.komoot.com/discover/Toulouse/@43.6046000,1.4451000/tours?sport=hike", description: "Suggestions de randonnées et itinéraires autour de Toulouse sur Komoot." },
    { title: "Wikiloc - Randonnées depuis Toulouse", url: "fr.wikiloc.com/wikiloc/map.do?sw=43.2371%2C0.9537&ne=43.9215%2C2.0483&place=Toulouse", description: "Parcours partagés par la communauté Wikiloc près de Toulouse." },
    { title: "Visorando - Randonnées depuis Toulouse", url: "www.visorando.com/?component=rando&task=searchCircuitV2&loc=Toulouse", description: "Sélection de randonnées autour de Toulouse sur Visorando." },
];

export default function LinksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Liens de randonnées</h1>
        <p className="text-muted-foreground">Une sélection de sites et ressources pour les passionnés de marche.</p>
      </div>
       <div className="space-y-4">
        {links.map(link => (
            <Card key={link.title}>
                <CardHeader>
                    <CardTitle className="text-lg">
                        <a href={`https://${link.url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                            {link.title} <Link2 className="h-4 w-4"/>
                        </a>
                    </CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                </CardHeader>
            </Card>
        ))}
      </div>
    </div>
  );
}
