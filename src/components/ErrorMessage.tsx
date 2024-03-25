import { ReactNode } from "react"

type ErrorMessagesProps = {
  children: ReactNode
}

// Tambien se puede usar PropsWithChildren

export default function ErrorMessage({children}: ErrorMessagesProps) {
  return (
    <div>
      <p className="bg-red-600 p-2 text-white font-bold text-xl text-center">{children}</p>
    </div>
  )
}
