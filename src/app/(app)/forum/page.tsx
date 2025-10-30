import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockForumTopics } from "@/lib/mock-data";
import { PlusCircle, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function ForumPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Forum de discussion</h1>
          <p className="text-muted-foreground">Échangez avec la communauté, posez vos questions et partagez vos conseils.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouveau sujet
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Sujet</TableHead>
                <TableHead className="text-center">Réponses</TableHead>
                <TableHead className="hidden md:table-cell">Dernière activité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockForumTopics.map(topic => (
                <TableRow key={topic.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full">
                           <MessageSquare className="h-5 w-5 text-muted-foreground"/>
                        </div>
                        <div>
                            <Link href={`/forum/${topic.id}`} className="font-semibold hover:underline">{topic.title}</Link>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <User className="h-3 w-3" />
                                <span>{topic.author.identite}</span>
                            </div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{topic.replies}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {topic.lastReply}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
