import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <FileText className="h-10 w-10 text-accent"/>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Mentions Légales</h1>
          <p className="text-muted-foreground">Informations légales concernant l'application.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Éditeur du site</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-muted-foreground">
          <p className="font-semibold text-foreground">Association Happy People 31</p>
          <p>13, bd Lascrosses</p>
          <p>31000 Toulouse</p>
          <p>France</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Directeur de la publication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>Le représentant légal de l'association Happy People 31.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>Pour toute question, vous pouvez nous contacter à l'adresse email suivante : <a href="mailto:tolosa31@free.fr" className="text-primary hover:underline">tolosa31@free.fr</a>.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hébergeur du site</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-muted-foreground">
          <p>Ce site est hébergé par Firebase, un service de Google LLC.</p>
          <p className="font-semibold text-foreground mt-2">Google LLC</p>
          <p>1600 Amphitheatre Parkway</p>
          <p>Mountain View, CA 94043, USA</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Propriété intellectuelle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Données personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>Les informations recueillies font l'objet d'un traitement informatique destiné à la gestion des comptes utilisateurs et à la mise en relation des membres. Conformément à la loi "informatique et libertés" du 6 janvier 1978 modifiée, vous bénéficiez d'un droit d'accès et de rectification aux informations qui vous concernent, que vous pouvez exercer en nous contactant à l'adresse email mentionnée ci-dessus.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Responsabilité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>Toulouse rando met tout en œuvre pour offrir aux utilisateurs des informations et/ou des outils disponibles et vérifiés mais ne saurait être tenu pour responsable des erreurs, d'une absence de disponibilité des fonctionnalités ou de la présence de virus sur son site. Les événements et annonces sont publiés sous la seule responsabilité de leurs auteurs.</p>
        </CardContent>
      </Card>

    </div>
  );
}
