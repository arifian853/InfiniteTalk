import { Button } from "flowbite-react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"

export const NotFound = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return (
        <div className="h-screen flex flex-col justify-center items-center gap-4 forms text-center">
            <Helmet>
                <title>Page not Found!</title>
            </Helmet>
            <h1 className="text-4xl font-semibold">Oops! <span className="text-blue-400"> Page </span><span className="text-green-400">Not Found!</span></h1>
            <p>Looks like the page you want to access is not exist.</p>
            <Button className="btn-dark" onClick={goBack}>
                Go back
            </Button>
        </div>
    )
}
