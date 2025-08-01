import { useReducer, useEffect, useMemo } from 'react'
import Form from './components/Form'
import { activityReducer, initialState } from './reducers/activity-reducer'
import ActivityList from './components/ActivityList'
import PriceTracker from './components/PriceTracker'
import { categories } from './data/categories'
import type { Activity } from './types'

function App() {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    const canRestartApp = () => state.activities.length > 0

    const categoryName = useMemo(() =>
        (category: Activity['category']) =>
            categories.find(cat => cat.id === category)?.name || ''
        , []);
    
    return (
        <>
            <header className="bg-lime-600 py-3">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-center text-lg font-bold text-white uppercase">
                        Control de gastos
                    </h1>

                    <button
                        className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10'
                        disabled={!canRestartApp()}
                        onClick={() => dispatch({type: 'restart-app'})}
                    >
                        Reiniciar App
                    </button>
                </div>
            </header>

            <section className="bg-lime-500 py-20 px-5">
                <div className="max-w-4xl mx-auto">
                    <Form 
                      dispatch={dispatch}
                      state={state}
                      categoryName={categoryName}
                    />
                </div>
            </section>

            <section className='bg-gray-800 py-10'>
                <div className='max-w-4xl mx-auto'>
                    <PriceTracker 
                        activities={state.activities}
                    />
                </div>
            </section>

            <section className="p-10 mx-auto max-w-4xl">
                <ActivityList 
                    activities={state.activities}
                    dispatch={dispatch}
                    categoryName={categoryName}
                />
            </section>
        </>
    )
}

export default App
