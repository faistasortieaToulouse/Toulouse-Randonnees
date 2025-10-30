
import { mockUsers } from "@/lib/mock-data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

export default function MessagesPage() {
  const currentUser = mockUsers[0]
  const friend = mockUsers[2]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)]">
      {/* Friends List */}
      <Card className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col">
        <CardHeader className="p-4">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un ami..." className="pl-8" />
            </div>
        </CardHeader>
        <CardContent className="p-2 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {mockUsers.filter(u => u.id !== currentUser.id).map((user, index) => (
              <Button key={user.id} variant={index === 1 ? "secondary" : "ghost"} className="w-full justify-start h-auto p-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.identite} />}
                    <AvatarFallback>{user.identite.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold">{user.identite}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-32 sm:max-w-full">{index === 1 ? "Ok, ça marche pour moi !" : "Tu es dispo pour la rando de..."}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Window */}
      <div className="md:col-span-2 lg:col-span-3 h-full flex-col hidden md:flex">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex flex-row items-center gap-3 p-4 border-b">
              <Avatar>
                {friend.avatarUrl && <AvatarImage src={friend.avatarUrl} alt={friend.identite} />}
                <AvatarFallback>{friend.identite.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="font-semibold text-lg">{friend.identite}</h2>
          </CardHeader>
          <CardContent className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            {/* Messages */}
            <div className="flex items-end gap-2 sm:gap-3">
              <Avatar className="h-8 w-8">
                {friend.avatarUrl && <AvatarImage src={friend.avatarUrl} alt={friend.identite} />}
                <AvatarFallback>{friend.identite.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg rounded-bl-none max-w-[80%] sm:max-w-xs lg:max-w-md">
                <p className="text-sm">Salut ! Super la dernière rando. Prêt pour la prochaine ?</p>
                <p className="text-xs text-muted-foreground text-right mt-1">10:30</p>
              </div>
            </div>
            <div className="flex items-end gap-2 sm:gap-3 justify-end">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-br-none max-w-[80%] sm:max-w-xs lg:max-w-md">
                <p className="text-sm">Hey ! Carrément, j'ai adoré. Je regarde justement les prochaines sorties sur Toulouse rando.</p>
                <p className="text-xs text-primary-foreground/70 text-right mt-1">10:31</p>
              </div>
              <Avatar className="h-8 w-8">
                {currentUser.avatarUrl && <AvatarImage src={currentUser.avatarUrl} alt={currentUser.identite} />}
                <AvatarFallback>{currentUser.identite.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
             <div className="flex items-end gap-2 sm:gap-3">
              <Avatar className="h-8 w-8">
                {friend.avatarUrl && <AvatarImage src={friend.avatarUrl} alt={friend.identite} />}
                <AvatarFallback>{friend.identite.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg rounded-bl-none max-w-[80%] sm:max-w-xs lg:max-w-md">
                <p className="text-sm">Ok, ça marche pour moi ! Tiens-moi au courant si tu t'inscris à celle de Bouconne.</p>
                <p className="text-xs text-muted-foreground text-right mt-1">10:32</p>
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t bg-card">
            <div className="relative">
                <Textarea placeholder="Écrivez votre message..." className="pr-12 sm:pr-16" rows={1}/>
                <Button size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8">
                    <Send className="h-4 w-4" />
                </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
