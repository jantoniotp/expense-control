import { useMemo } from "react"
import type { Activity } from "../types"
import PriceDisplay from "./PriceDisplay"

type PriceTrackerProps = {
    activities: Activity[]
}

export default function PriceTracker({activities} : PriceTrackerProps) {

    const consumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.price : total, 0), [activities])
    const revenue = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.price : total, 0), [activities])
    const loan = useMemo(() => activities.reduce((total, activity) => activity.category === 3 ? total + activity.price : total, 0), [activities])
    const repayment = useMemo(() => activities.reduce((total, activity) => activity.category === 4 ? total + activity.price : total, 0), [activities])
    const balance = useMemo(() => revenue - consumed, [activities])
    const netBalance = useMemo(() => (revenue+repayment) - (consumed+loan), [activities])
    
    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Gastos</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-10 mt-10">
                <PriceDisplay
                    price={consumed}
                    text="Gastos"
                />
                <PriceDisplay
                    price={revenue}
                    text="Ingresos"
                />
                <PriceDisplay
                    price={loan}
                    text="Prestamos"
                />
                <PriceDisplay
                    price={repayment}
                    text="Devoluciones"
                />
                <PriceDisplay
                    price={balance}
                    text="Balance"
                />
                <PriceDisplay
                    price={netBalance}
                    text="Balance Global"
                />
            </div>
 
        </>
    )
}
