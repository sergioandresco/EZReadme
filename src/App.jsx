import PrincipalLayout from '@/views';
import { useTour } from './hooks/useTour';

function App() {
  
  useTour();

  return (
    <PrincipalLayout />
  )
}

export default App
