'use client';

import { Button } from "@/components/ui/button"
import { Apple, Facebook, Linkedin, Twitter } from "lucide-react"
import GoogleIcon from "../icons/GoogleIcon"
import MicrosoftIcon from "../icons/MicrosoftIcon"
import SpotifyIcon from "../icons/SpotifyIcon"
import YahooIcon from "../icons/YahooIcon"

const socialProviders = [
    { name: 'Google', icon: GoogleIcon, color: "text-red-600" },
    { name: 'Facebook', icon: Facebook, color: "text-blue-600" },
    { name: 'Apple', icon: Apple, color: "text-black dark:text-white" },
    { name: 'X', icon: Twitter, color: "text-sky-500" },
    { name: 'LinkedIn', icon: Linkedin, color: "text-blue-700" },
    { name: 'Microsoft', icon: MicrosoftIcon, color: "text-orange-500" },
    { name: 'Spotify', icon: SpotifyIcon, color: "text-green-500" },
    { name: 'Yahoo', icon: YahooIcon, color: "text-purple-600" },
]

export default function SocialLoginButtons() {
    return (
        <div className="grid grid-cols-4 gap-2">
            {socialProviders.map((provider) => (
                <Button key={provider.name} variant="outline" className="w-full" aria-label={`Continue with ${provider.name}`}>
                    <provider.icon className={`w-5 h-5 ${provider.color}`} />
                </Button>
            ))}
        </div>
    )
}
