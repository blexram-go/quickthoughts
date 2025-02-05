function LoginForm() {

    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password"/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default LoginForm;