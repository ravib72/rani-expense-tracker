import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"


const Login = () => {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }
    return (
        <center>
        <form className="login" onSubmit={handleSubmit}>
            <h3>Sign In</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <br></br>
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <br></br>
            <button disabled={isLoading}>Enter</button>
            {error && <div className="error">{error}</div>}
        </form>
        </center>
    )
}

export default Login