
import ModuleHeader from '@/themes/components/module-header/module-header'
import NavBar from '@/themes/components/nav-bar/nav-bar'
import ProfilePreview from '@/themes/components/profile-preview/profile-preview'
import React from 'react'

export default function page() {
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
       <NavBar />
       <ModuleHeader isBackButtonNeeded={true} title='Dashboard'/>
    </div>
  )
}
