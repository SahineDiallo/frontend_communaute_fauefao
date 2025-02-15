import { ChevronRight } from "lucide-react";

import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/Accordion";
import { HeroSection } from "../home/Hero-section";

export default function RechercheMembre() {
  return (
    <>
    <HeroSection title="Membres de nos Communautés" />

    <div className="container mx-auto p-6">
      {/* Fil d'Ariane */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link to="/" className="text-[#ef8450] hover:underline">
          Connect
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600">Recherche de membres</span>
      </nav>

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

        {/* Contenu de la recherche de membres - À droite */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-semibold text-[#ef8450] mb-4">Recherche de membres</h1>
          <p className="text-gray-600 mb-8">Parcourez nos membres enregistrés</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Cartes des membres */}
            <div className="border border-[#ef8450] p-4 flex items-start gap-4">
              <Avatar className="w-16 h-16 rounded-none">
                <AvatarFallback className="rounded-none bg-[#f3f3f3]">BR</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[#ef8450] font-medium hover:underline">
                  <Link to="#">Bab Rowe</Link>
                </h3>
                <p className="text-sm text-gray-600">États-Unis</p>
              </div>
            </div>

            <div className="border border-[#ef8450] p-4 flex items-start gap-4">
              <Avatar className="w-16 h-16 rounded-none">
                <AvatarFallback className="rounded-none bg-[#f3f3f3]">AT</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[#ef8450] font-medium hover:underline">
                  <Link to="#">Alemneh Tadele</Link>
                </h3>
                <p className="text-sm text-gray-500">Consultant</p>
                <p className="text-sm text-gray-600">Éthiopie</p>
              </div>
            </div>
            <div className="border border-[#ef8450] p-4 flex items-start gap-4">
              <Avatar className="w-16 h-16 rounded-none">
                <AvatarFallback className="rounded-none bg-[#f3f3f3]">AT</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[#ef8450] font-medium hover:underline">
                  <Link to="#">Alemneh Tadele</Link>
                </h3>
                <p className="text-sm text-gray-500">Consultant</p>
                <p className="text-sm text-gray-600">Ethiopia</p>
              </div>
            </div>

            <div className="border border-[#ef8450] p-4 flex items-start gap-4">
              <Avatar className="w-16 h-16 rounded-none">
                <AvatarFallback className="rounded-none bg-[#f3f3f3]">SM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[#ef8450] font-medium hover:underline">
                  <Link to="#">Safa Messaoud</Link>
                </h3>
                <p className="text-sm text-gray-500">Humanitarian Professional</p>
                <p className="text-sm text-gray-600">Tunisia</p>
              </div>
            </div>

            <div className="border border-[#ef8450] p-4 flex items-start gap-4">
              <Avatar className="w-16 h-16 rounded-none">
                <AvatarFallback className="rounded-none bg-[#f3f3f3]">ZH</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[#ef8450] font-medium hover:underline">
                  <Link to="#">Zara Hadijah</Link>
                </h3>
                <p className="text-sm text-gray-500">Student / Intern / Volunteer</p>
                <p className="text-sm text-gray-600">Indonesia</p>
              </div>
            </div>

            <div className="border border-[#ef8450] p-4 flex items-start gap-4">
              <Avatar className="w-16 h-16 rounded-none">
                <AvatarFallback className="rounded-none bg-[#f3f3f3]">TR</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[#ef8450] font-medium hover:underline">
                  <Link to="#">Tiary Ray</Link>
                </h3>
                <p className="text-sm text-gray-500">Associate</p>
                <p className="text-sm text-gray-600">Israel</p>
              </div>
            </div>
            <div className="border border-[#ef8450] p-4 flex items-start gap-4">
              <Avatar className="w-16 h-16 rounded-none">
                <AvatarFallback className="rounded-none bg-[#f3f3f3]">SA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[#ef8450] font-medium hover:underline">
                  <Link to="#">Seam Anower</Link>
                </h3>
                <p className="text-sm text-gray-500">Consultant</p>
                <p className="text-sm text-gray-600">Bangladesh</p>
              </div>
            </div>

            <div className="border border-[#ef8450] p-4 flex items-start gap-4">
              <Avatar className="w-16 h-16 rounded-none">
                <AvatarFallback className="rounded-none bg-[#f3f3f3]">YN</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[#ef8450] font-medium hover:underline">
                  <Link to="#">YN Nagamine</Link>
                </h3>
                <p className="text-sm text-gray-500">Student / Intern / Volunteer</p>
                <p className="text-sm text-gray-600">Japan</p>
              </div>
            </div>

            <div className="border border-[#ef8450] p-4 flex items-start gap-4">
              <Avatar className="w-16 h-16 rounded-none">
                <AvatarFallback className="rounded-none bg-[#f3f3f3]">HK</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[#ef8450] font-medium hover:underline">
                  <Link to="#">Hamza Khalfallah</Link>
                </h3>
                <p className="text-sm text-gray-500">Consultant</p>
                <p className="text-sm text-gray-600">Libya</p>
              </div>
            </div>

            {/* Répéter les autres cartes des membres avec la traduction appropriée */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
