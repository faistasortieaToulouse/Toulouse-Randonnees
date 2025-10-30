"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Hike } from "@/types";
import { Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";

type RecommendationType = {
  type: "recommendation" | "caution" | "tip";
  text: string;
};

// Simulated AI recommendations based on hike type
const recommendations: Record<Hike['type'], RecommendationType[]> = {
  "Open Topo Maps": [
    { type: "recommendation", text: "Les cartes OpenTopoMap sont excellentes pour le dénivelé. Repérez les courbes de niveau pour anticiper les montées." },
    { type: "caution", text: "Certains sentiers peuvent être moins entretenus. Fiez-vous aux chemins principaux indiqués." },
    { type: "tip", text: "Téléchargez la carte pour un accès hors ligne, la couverture réseau peut être limitée en zone montagneuse." },
  ],
  "Open Data Street": [
    { type: "recommendation", text: "Idéal pour les randonnées urbaines ou péri-urbaines. Les chemins et rues sont très détaillés." },
    { type: "caution", text: "Moins précis pour le relief. Ne vous fiez pas uniquement à cette carte pour les randonnées en montagne." },
    { type: "tip", text: "Profitez-en pour repérer les points d'intérêt (parcs, cafés) à proximité de votre itinéraire." },
  ],
};

const generalRecommendations: RecommendationType[] = [
    { type: "recommendation", text: "Vérifiez toujours la météo avant de partir, même pour une courte randonnée." },
    { type: "caution", text: "Informez un proche de votre itinéraire et de l'heure estimée de votre retour." },
    { type: "tip", text: "Emportez plus d'eau que vous ne pensez en avoir besoin, surtout en été." },
];

function getIcon(type: RecommendationType['type']) {
    switch (type) {
        case "recommendation":
            return <Lightbulb className="h-5 w-5 text-blue-500" />;
        case "caution":
            return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
        case "tip":
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        default:
            return <Lightbulb className="h-5 w-5 text-blue-500" />;
    }
}

export default function HikeRecommendation({ hike }: { hike: Hike }) {
  const hikeRecs = recommendations[hike.type] || generalRecommendations;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conseils pour le circuit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hikeRecs.map((rec, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">{getIcon(rec.type)}</div>
            <p className="text-sm text-muted-foreground">{rec.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
