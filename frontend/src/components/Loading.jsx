import React from 'react'

function Loading() {
  return (
    <div className="flex items-center justify-center gap-5 fixed z-1000 top-0 left-0 w-full h-screen bg-neutral-900/90">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-400"></div>
        <p className="text-neutral-400">Loading...</p>
    </div>
  )
}

export default Loading