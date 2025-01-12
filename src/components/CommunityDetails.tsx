import React from 'react'
import  Banner  from "../assets/femme.jpg"
import MenuPageDetail from './MenuPageDetail'
import { DetailPageMenuItems } from '../utils/Menus'
import CommunityDetailContent from './CommunityDetailsContent'

const CommunityDetails = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#ffcaa1] to-white-500">
        <div className="container mx-auto md:px-4">
          <div className="w-full">
            <img src={Banner} alt="" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
      <div className="communaute-header-info container w-full mx-auto px-2 md:px-8 py-2 md:py-4">
        <div className="border-b-2 border-gray-100 pb-4">
          <h1 className="h1">Autonomisation économique des femmes</h1>
          <span className="text-gray-500">Sante, Economie</span>
        </div>
        <MenuPageDetail MenuItems={DetailPageMenuItems} />
      </div>
      <CommunityDetailContent />
    </>
  )
}

export default CommunityDetails