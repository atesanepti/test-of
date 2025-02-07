import TabLayout from '@/components/TabLayout'
import React from 'react'

const WalletLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <TabLayout>
        {children}
    </TabLayout>
  )
}

export default WalletLayout