type PriceDisplayProps = {
    price: number
    text: string
}

export default function PriceDisplay({price, text} : PriceDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
        <span className="font-black text-4xl text-orange">{price}</span>
        {text}
    </p>
  )
}
