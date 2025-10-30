import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Info className="h-10 w-10 text-accent"/>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">À Propos</h1>
          <p className="text-muted-foreground">Bienvenue sur votre application Toulouse Randonnées.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notre Objectif</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>Trouve sur les cartes de randonnée ton circuit.</p>
          <p>Propose le aux autres membres et créée ta sortie.</p>
          <p>Et si une sortie t'intéresse, inscris toi !</p>
        </CardContent>
      </Card>
    </div>
  );
}
