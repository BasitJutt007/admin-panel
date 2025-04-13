import InformationForm from '@/components/forms/InformationForm'
import { Toaster } from 'react-hot-toast'

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#394d7b] flex items-center justify-center px-4">
      <Toaster position="top-center" />
      <InformationForm />
    </main>
  )
}

export default Home;