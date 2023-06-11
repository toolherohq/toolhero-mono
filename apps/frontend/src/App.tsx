import './App.css'
import Navigation from "./components/Navigation"
import HeroTool from './components/HeroTool'
import { IHeroToolSeralised } from 'toolhero/src/main/valueObjects/HeroTool';
declare global {
  interface Window { TOOL: IHeroToolSeralised; }
}

function App() {

  return (
    <>
      <div className="mx-auto max-w-7xl sm:py-0 lg:py-4">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-4xl">{/* Content goes here */}
          <Navigation></Navigation>
          <div className="overflow-hidden rounded-sm bg-gray-200 border-t-[16px] border-gray-600 my-4">
            <HeroTool tool={window.TOOL} />
          </div>
        </div>
      </div>

    </>
  )
}

export default App
