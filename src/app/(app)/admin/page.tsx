
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockEvents, mockUsers } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, FilePen, Trash2, Ban } from "lucide-react"
import Image from "next/image"

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Administration</h1>
        <p className="text-muted-foreground">Gestion des utilisateurs et des événements de la plateforme.</p>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:w-[400px]">
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <CardWithTable>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Avatar</span>
                </TableHead>
                <TableHead>Identité</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Rôle</TableHead>
                <TableHead className="hidden lg:table-cell">Statut</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="hidden sm:table-cell">
                    {user.avatarUrl && <Image
                      alt="Avatar"
                      className="aspect-square rounded-full object-cover"
                      height="40"
                      src={user.avatarUrl}
                      width="40"
                    />}
                  </TableCell>
                  <TableCell className="font-medium">{user.identite}</TableCell>
                  <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={user.role === 'Admin' ? 'destructive' : user.role === 'Modérateur' ? 'default' : 'outline'}>{user.role}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant={user.status === 'active' ? 'secondary' : 'destructive'} className={user.status === 'active' ? 'text-green-700 border-green-300' : ''}>
                      {user.status === 'active' ? 'Actif' : 'Suspendu'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <AdminActionMenu type="user" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </CardWithTable>
        </TabsContent>
        <TabsContent value="events">
          <CardWithTable>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead className="hidden sm:table-cell">Organisateur</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden lg:table-cell">Participants</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEvents.map(event => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell className="hidden sm:table-cell">{event.organizer.identite}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(event.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{event.participants.length} / {event.maxParticipants}</TableCell>
                  <TableCell>
                    <AdminActionMenu type="event" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </CardWithTable>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CardWithTable({ children }: { children: React.ReactNode }) {
    return (
        <div className="border shadow-sm rounded-lg overflow-x-auto">
            <Table>
                {children}
            </Table>
        </div>
    )
}

function AdminActionMenu({ type }: { type: 'user' | 'event' }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem><FilePen className="mr-2 h-4 w-4" />Modifier</DropdownMenuItem>
                {type === 'user' && (
                    <>
                        <DropdownMenuItem><Ban className="mr-2 h-4 w-4" />Suspendre</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Changer le rôle</DropdownMenuLabel>
                        <DropdownMenuItem>Passer Admin</DropdownMenuItem>
                        <DropdownMenuItem>Passer Modérateur</DropdownMenuItem>
                        <DropdownMenuItem>Passer Membre</DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />Supprimer
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
