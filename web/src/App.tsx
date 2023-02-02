import './styles/global.css'
import './lib/daysjs'
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'

// window.Notification.requestPermission(permission => {
//   if (permission === 'granted') {
//     new window.Notification('Habits', {
//       body: 'Texto de exemplo',
//     })
//   }
// })

export function App() {
  return (
    <div className='bg-background text-white w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}