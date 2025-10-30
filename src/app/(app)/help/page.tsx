import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { LifeBuoy } from "lucide-react";

const faqs = [
    { 
        question: "Comment puis-je créer une sortie ?", 
        answer: "Pour créer une sortie, allez dans la section 'S'inscrire à une rando' et cliquez sur le bouton 'Créer une sortie'. Vous pouvez soit partir d'un circuit existant, soit créer votre événement manuellement."
    },
    {
        question: "Comment fonctionnent les modes d'inscription ?",
        answer: "Automatique : le premier arrivé est le premier servi. Manuelle : vous devez approuver chaque participant. Liste d'attente : les utilisateurs peuvent s'inscrire sur une liste d'attente si l'événement est complet."
    },
    {
        question: "Qui peut voir les notes que je donne ?",
        answer: "Seuls les administrateurs et les modérateurs de la plateforme peuvent voir les notes attribuées aux sorties et aux organisateurs. Votre anonymat est préservé vis-à-vis des autres membres."
    },
    {
        question: "Comment puis-je devenir ami avec un autre membre ?",
        answer: "La fonctionnalité d'ajout d'amis sera disponible prochainement. Pour le moment, vous pouvez interagir avec tous les membres sur le forum de discussion."
    }
]

export default function HelpPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <LifeBuoy className="h-10 w-10 text-accent"/>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Centre d'aide</h1>
          <p className="text-muted-foreground">Trouvez des réponses à vos questions.</p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent>
                {faq.answer}
                </AccordionContent>
            </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
