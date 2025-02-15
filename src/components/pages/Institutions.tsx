
import { PlusCircle, LayoutGrid, List } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/Button"
import { StakeholderCard } from "../InstitutionCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/SelectButton"
import { HeroSection } from "../home/Hero-section"
import { Input } from "../ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/Accordion"

const MOCK_STAKEHOLDERS = [
  {
    id: "1",
    name: "VoxDev",
    type: "Other",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-28%20at%2014.06.25-yCFm3Qm15j9srfaVX27bPuisIHs9cy.png",
    websiteUrl: "#",
  },
  // Add more mock data as needed
]

export default function StakeholderSearch() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <>
        <HeroSection title="Institutions de nos Communautés" />
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Barre latérale de recherche avancée - À gauche */}
            <div className="lg:col-span-1">
                <div className="border-r border-[#ef8450] p-6">
                    <h2 className="text-2xl font-semibold text-[#ef8450] mb-6">Recherche avancée</h2>

                    <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">Rechercher des membres</h3>
                        <Input
                        type="search"
                        placeholder="Rechercher..."
                        className="w-full border-[#ef8450] rounded-none"
                        />
                        <Button className="w-full mt-4 bg-[#ef8450] hover:bg-[#df7440] rounded-none">
                        Appliquer
                        </Button>
                    </div>

                    <div className="border-t border-[#ef8450] pt-6">
                        <h3 className="text-xl font-semibold mb-4">Filtres</h3>
                        <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="social-protection">
                            <AccordionTrigger className="text-[#ef8450]">
                            Programmes de protection sociale
                            </AccordionTrigger>
                            <AccordionContent>{/* Contenu des filtres */}</AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="topics">
                            <AccordionTrigger className="text-[#ef8450]">
                            Thèmes de protection sociale
                            </AccordionTrigger>
                            <AccordionContent>{/* Contenu des filtres */}</AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="crosscutting">
                            <AccordionTrigger className="text-[#ef8450]">
                            Domaines transversaux
                            </AccordionTrigger>
                            <AccordionContent>{/* Contenu des filtres */}</AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="position">
                            <AccordionTrigger className="text-[#ef8450]">
                            Poste professionnel
                            </AccordionTrigger>
                            <AccordionContent>{/* Contenu des filtres */}</AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="regions">
                            <AccordionTrigger className="text-[#ef8450]">
                            Régions d'intérêt
                            </AccordionTrigger>
                            <AccordionContent>{/* Contenu des filtres */}</AccordionContent>
                        </AccordionItem>
                        </Accordion>
                    </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-3">
                <div className="container py-8 space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-medium text-primary">Institutions et Organisations </h1>
                    <p className="text-xl text-muted-foreground">
                        Voir les institutions affiliées et leurs activités sur la plateforme
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <Button className="text-primary-foreground" variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter Institution
                    </Button>

                    <div className="flex gap-4 items-center">
                    <div className="flex gap-2 border rounded-md p-1">
                        <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("grid")}
                        >
                        <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("list")}
                        >
                        <List className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Trier par</span>
                        <Select defaultValue="recent">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">plus récent</SelectItem>
                            <SelectItem value="old">plus ancien</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Éléments par page</span>
                        <Select defaultValue="10">
                        <SelectTrigger className="w-[80px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    </div>
                </div>

                    <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2" : "grid-cols-1"}`}>
                        {MOCK_STAKEHOLDERS.map((stakeholder) => (
                        <StakeholderCard key={stakeholder.id} stakeholder={stakeholder} />
                        ))}
                    </div>
                </div>

            </div>

        </div>
        </div>
    </>
  )
}

