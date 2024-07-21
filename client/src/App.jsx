import { Toaster } from "sonner"

function App({ children }) {

  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
      {children}
      <Toaster richColors />
    </main>
  )
}

export default App
