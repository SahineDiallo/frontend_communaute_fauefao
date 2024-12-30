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
import CommunityPractices from "./CommunityPractices";

const CommunitiesPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <Header/>
      {/* Banner */}
      <Banner/>
      {/* Community */}
      <CommunityPractices/>
    </div>
  );
};


export default CommunitiesPage;

