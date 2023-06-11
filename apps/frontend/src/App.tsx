import './App.css'
import Navigation from "./components/Navigation"

function App() {

  return (
    <>
      <div className="mx-auto max-w-7xl sm:py-0 lg:py-4">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-4xl">{/* Content goes here */}
          <Navigation></Navigation>
          <div className="overflow-hidden rounded-sm bg-gray-300 p-4 border-t-[16px] border-gray-600 my-4">
            <div className="py-4">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Back End Developer
              </h2>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
