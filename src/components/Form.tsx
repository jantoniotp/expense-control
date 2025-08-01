import { useState, type ChangeEvent, type FormEvent, type Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer"
import { getLocalDate } from "../helpers"

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState,
  categoryName: (category: Activity["category"]) => string
}

const initialState : Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  price: 0,
  date: getLocalDate()
}

export default function Form({dispatch, state, categoryName} : FormProps) {

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if(state.activeId) {
      const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId )[0]
      setActivity(selectedActivity)
    }
  }, [state.activeId])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'price'].includes(e.target.id)

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, price, date } = activity
    const dateValue = new Date(date);
    return name.trim() !== '' && price > 0 && !isNaN(dateValue.getTime())
  }
 
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({type: 'save-activity', payload: {newActivity: activity}}) 
    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form 
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category" className="font-bold">Categoría:</label>
          <select
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name" className="font-bold">Actividad:</label>
          <input
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. Gas, Venta zapatillas, Consulta Medica, Prestamo M"
            value={activity.name}
            onChange={handleChange}
          />
      </div>

      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="price" className="font-bold">Precio:</label>
          <input
            id="price"
            type="number"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Calorias. ej. 300 o 500"
            value={activity.price === 0 ? "" : activity.price}
            onChange={handleChange}
          />
      </div>

      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="date" className="font-bold">Fecha:</label>
          <input
            id="date"
            type="date"
            className="border border-slate-300 p-2 rounded-lg"
            value={activity.date}
            onChange={handleChange}
          />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={`Guardar ${categoryName(+activity.category)}`}
        disabled={!isValidActivity()}
      />

    </form>
  )
}
