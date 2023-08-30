'use client'

import { useState } from 'react'

function TabBar({ content }) {
  return (
    <main className='flex justify-center '>
      <Tab content={content} />
    </main>
  )
}

export default TabBar

interface TabProps {
  content: any
}

function Tab({ content }: TabProps) {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div className=''>
      <div className='flex gap-10'>
        {content.map((cont: any, i: any) => {
          return (
            <div key={i}>
              <button onClick={() => setActiveTab(i)} className={activeTab === i ? 'bg-gray-200' : 'bg-blue-300'}>
                {cont.title}
              </button>
            </div>
          )
        })}
      </div>
      {content[activeTab].content}
    </div>
  )
}
