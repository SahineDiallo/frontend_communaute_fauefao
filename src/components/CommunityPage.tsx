// src/components/CommunityPage.jsx

// function CommunityPage() {
//   const stats = [
//     { label: "Communautés", count: 10, icon: "👥" },
//     { label: "Membres", count: 33, icon: "👤" },
//     { label: "Partenaires", count: 9, icon: "🤝" },
//     { label: "Ressources", count: 25, icon: "📚" },
//   ];

//   return (
//     <>
//       <div className="bg-teal-800 py-16">
//         <h1 className="text-4xl text-white text-center font-bold">
//           Communautés
//         </h1>
//       </div>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <input
//             type="text"
//             placeholder="Search News"
//             className="border p-2 rounded w-64"
//           />
//           <div className="flex space-x-4">
//             <select className="border p-2 rounded">
//               <option>All Types</option>
//             </select>
//             <select className="border p-2 rounded">
//               <option>All Categories</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-bold mb-4">
//               Nos communautés de pratiques
//             </h2>
//             <p className="text-gray-600">
//               Nos communautés de pratiques rassemblent des acteurs variés pour
//               renforcer l'autonomisation économique des femmes en Afrique de
//               l'Ouest
//             </p>
//           </div>
//           <div>
//             <img
//               src="/community-image.jpg"
//               alt="Community"
//               className="w-full rounded-lg"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-4 gap-4 my-12">
//           {stats.map(({ label, count, icon }) => (
//             <div key={label} className="text-center">
//               <div className="text-4xl mb-2">{icon}</div>
//               <div className="text-3xl font-bold text-orange-500">{count}</div>
//               <div className="text-gray-600">{label}</div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </>
//   );
// }

// export default CommunityPage;

import React from "react";
import Header from "./Header";
import Banner from "./Banner";

const CommunitiesPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <Header/>
      {/* Banner */}
      <Banner/>

      {/* Statistics Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-4 gap-6 text-center">
          <StatCard
            icon="👥"
            label="Communauté"
            value={10}
          />
          <StatCard
            icon="👤"
            label="Membres"
            value={33}
          />
          <StatCard
            icon="🤝"
            label="Partenaires"
            value={9}
          />
          <StatCard
            icon="📚"
            label="Ressources"
            value={25}
          />
        </div>
      </div>

      {/* Featured Section */}
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-semibold">Nos communautés de pratiques</h2>
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="col-span-1">
            <img
              src="/"
              alt="Featured"
              className="w-full h-auto rounded-lg"
            />
            <p className="mt-4 text-gray-600">
              Nos communautés de pratiques rassemblent des acteurs variés pour renforcer
              l'autonomisation économique des femmes en Afrique de l’Ouest.
            </p>
          </div>
          <div className="col-span-1">
            {/* Articles */}
            <div className="space-y-4">
              <ArticleCard
                date="15/11/2023"
                title="Deezer, un nouveau logo gonflé pour ceux qui aiment la musique"
                description="Deezer propose un nouveau logo percutant et gonflé, autour d’un cœur vibrant..."
              />
              <ArticleCard
                date="09/05/2023"
                title="Evian x Balmain, une stratégie de co-branding 'eau de gamme'"
                description="Ce surprenant co-branding nous offre l'occasion de revoir leur histoire..."
              />
              <ArticleCard
                date="14/03/2023"
                title="Toblerone change de montagne..."
                description="De Toblerone à Milka en passant par la feta, les marques marquent leur territoire..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* News and Sidebar */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-3 gap-6">
        {/* News */}
        <div className="col-span-2 grid grid-cols-2 gap-6">
          <ArticleCard
            date="06/03/2023"
            title="Burberry se redore le blason..."
            description="Le nouveau logo de Burberry redore le blason de la marque..."
          />
          <ArticleCard
            date="12/10/2022"
            title="Retour vers le futur pour Citroën..."
            description="Retour vers le futur pour Citroën qui dévoile un nouveau logo..."
          />
          <ArticleCard
            date="04/10/2022"
            title="La nouvelle charte graphique des Jeux Olympiques"
            description="Les Jeux Olympiques chantent leur identité, afin d'harmoniser..."
          />
          <ArticleCard
            date="16/06/2022"
            title="McDonalds change de nom en Russie"
            description="Suite à l'invasion de la guerre en Ukraine, McDonalds s'est retiré de Russie..."
          />
        </div>

        {/* Sidebar */}
        <div className="col-span-1 bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold">Les communautés à la une</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <SidebarItem
                author="Clara Carvalho"
                action="added a Community document"
                date="Tue, 25/07/2023 - 11:20"
              />
            </li>
            <li>
              <SidebarItem
                author="Lauren Whitehead"
                action="added a Community event"
                date="Mon, 24/07/2023 - 19:45"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string; label: string; value: number }> = ({
  icon,
  label,
  value,
}) => (
  <div className="bg-white p-6 rounded shadow">
    <span className="text-4xl">{icon}</span>
    <h4 className="text-lg font-semibold mt-4">{label}</h4>
    <p className="text-2xl font-bold text-orange-500">{value}</p>
  </div>
);

const ArticleCard: React.FC<{
  date: string;
  title: string;
  description: string;
}> = ({ date, title, description }) => (
  <div className="p-4 bg-white shadow rounded">
    <p className="text-sm text-gray-400">{date}</p>
    <h4 className="text-lg font-semibold mt-2">{title}</h4>
    <p className="text-sm text-gray-600 mt-2">{description}</p>
  </div>
);

const SidebarItem: React.FC<{
  author: string;
  action: string;
  date: string;
}> = ({ author, action, date }) => (
  <div>
    <p className="text-sm text-gray-700">
      <span className="font-bold">{author}</span> {action}
    </p>
    <p className="text-xs text-gray-400">{date}</p>
  </div>
);

export default CommunitiesPage;

