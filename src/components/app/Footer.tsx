import Link from "next/link";

const footerLinks = [
    { name: 'À propos', href: '/about' },
    { name: 'Politique de confidentialité', href: '/privacy' },
    { name: 'Mentions légales', href: '/legal' },
    { name: 'Charte d\'utilisation', href: '/terms' },
    { name: 'Nous contacter', href: '/contact' },
]

export default function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
            <nav className="mb-10 flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
                {footerLinks.map((link) => (
                    <div key={link.name} className="px-5 py-2">
                        <Link href={link.href} className="text-sm leading-6 text-muted-foreground hover:text-primary">
                            {link.name}
                        </Link>
                    </div>
                ))}
            </nav>
            <p className="text-center text-xs leading-5 text-muted-foreground">
                &copy; {new Date().getFullYear()} Toulouse rando. Tous droits réservés.
            </p>
            </div>
      </footer>
    )
}
