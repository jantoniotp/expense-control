import { useMemo, type Dispatch } from "react"
import type { Activity } from "../types"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import type { ActivityActions } from "../reducers/activity-reducer"
import { formatDate } from "../helpers"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>,
    categoryName: (category: Activity["category"]) => string
}

export default function ActivityList({activities, dispatch, categoryName} : ActivityListProps) {

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">
                Detalle de Ingresos/Egresos
            </h2>
        
            {isEmptyActivities ? 
                <p className="text-center my-5">No hay registros aún...</p> : 
                activities.map( activity => (
                    <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
                        <div className="space-y-2 relative"> 
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                            ${activity.category === 1 ? 'bg-red-500' :
                              activity.category === 2 ? 'bg-lime-500' :
                              activity.category === 3 ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                {categoryName(+activity.category)}
                            </p>
                            <p className="text-2xl font-bold pt-5">{activity.name}</p>
                            <p className="font-black text-4xl text-lime-500">
                                ${activity.price}
                            </p>
                            <p className="font-medium text-gray-500">
                                {formatDate(activity.date)}
                            </p>
                        </div>

                        <div className="flex gap-5 items-center">
                            <button
                                onClick={() => dispatch({type: "set-activeId", payload: {id: activity.id}})}
                            >
                                <PencilSquareIcon
                                    className="h-8 w-8 text-gray-800"
                                />
                            </button>

                            <button
                                onClick={() => dispatch({type: "delete-activity", payload: {id: activity.id}})}
                            >
                                <XCircleIcon
                                    className="h-8 w-8 text-red-500"
                                />
                            </button>
                        </div>
                    </div>
                ))}
        </>
    )
}
