import React, { useState } from 'react';

export default function LoginPage(props){
    const [form, setForm] = useState({userName: "", password: ""})
    const [check, setCheck] = useState(false)

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const options = {
                method: "POST",
                body: `{"userName":"${form.userName}", "password":"${form.password}"}`
            }
            const response = await fetch(props.loginUrl, options)
            if (response.ok){
                const token = response.headers.get('Authorization') //.split(' ')[1];
                props.onLogon(token)
            } 
            else {
                console.log(response)
            }            
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="userName" onChange={handleChange} value={form.userName} placeholder="Логин" type="text" />
                <br />
                <input name="password" onChange={handleChange} value={form.password} placeholder="Пароль" type={ check ? "text" : "password" } />
                <br />
                <input type="checkbox" id="show" name="show" checked={check} onChange={e => setCheck(prev => !prev)}/>
                <label htmlFor="show">Показать пароль</label>
                <br />
                <button type="submit">Залогиниться</button>
            </form>
        </div>
    )
}