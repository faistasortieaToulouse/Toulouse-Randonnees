
"use client";

import Link from "next/link"
import {
  Bell,
  Home,
  Search,
  User,
  LogOut,
  Settings,
  UserPlus,
  CalendarCheck,
  MessageSquarePlus,
  Languages,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useRouter } from "next/navigation"
import { useState } from "react"

function LanguageSelector() {
    const [language, setLanguage] = useState("fr");
    const languages = [
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Allemand' },
        { code: 'en', name: 'Anglais' },
        { code: 'ar', name: 'Arabe' },
        { code: 'zh-CN', name: 'Chinois' },
        { code: 'hi', name: 'Hindi' },
        { code: 'it', name: 'Italien' },
        { code: 'ja', name: 'Japonais' },
        { code: 'pt', name: 'Portugais' },
        { code: 'ru', name: 'Russe' },
        { code: 'tr', name: 'Turc' },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Languages className="h-5 w-5 mr-2" />
                    <span>Choisis ta langue :</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                    {languages.map(lang => (
                        <DropdownMenuRadioItem key={lang.code} value={lang.code}>{lang.name}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default function AppHeader() {
    const router = useRouter();
    const userAvatar = PlaceHolderImages.find(img => img.id === 'avatar-1');

    const handleLogout = () => {
        // In a real app, you'd clear session/auth state here
        router.push('/');
    };

  return (
    <>
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
      <SidebarTrigger />
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher des randonnées, des événements..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center">
        <LanguageSelector />
      </div>
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-start gap-3 cursor-pointer">
                <UserPlus className="mt-1 h-4 w-4 text-accent" />
                <div>
                    <p className="font-semibold">Nouvelle demande d'ami</p>
                    <p className="text-xs text-muted-foreground">CharlieMarche veut vous ajouter.</p>
                </div>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex items-start gap-3 cursor-pointer">
                <CalendarCheck className="mt-1 h-4 w-4 text-accent" />
                <div>
                    <p className="font-semibold">Inscription confirmée</p>
                    <p className="text-xs text-muted-foreground">Vous êtes inscrit à "Sortie conviviale en Forêt de Bouconne".</p>
                </div>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex items-start gap-3 cursor-pointer">
                <MessageSquarePlus className="mt-1 h-4 w-4 text-accent" />
                <div>
                    <p className="font-semibold">Nouveau message</p>
                    <p className="text-xs text-muted-foreground">SamAventure vous a envoyé un message.</p>
                </div>
            </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-center text-sm text-muted-foreground">
             <Link href="#" className="w-full">Voir toutes les notifications</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            {userAvatar && <Image src={userAvatar.imageUrl} alt="User avatar" width={36} height={36} className="rounded-full" />}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
             <Link href="/profile">
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
             </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
    </>
  )
}
