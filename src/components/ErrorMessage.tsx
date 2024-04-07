type ErrorMessageProps = {
  children: React.ReactNode
}

const ErrorMessage = ({children}: ErrorMessageProps) => {
  return (
    <div className="bg-red-600 p-2">
      <p className="text-white text-center font-bold">{children}</p>
    </div>
  )
}

export default ErrorMessage
