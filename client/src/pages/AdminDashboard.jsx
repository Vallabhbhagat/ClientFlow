import React, { useState } from 'react'

const AdminDashboard = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [search, setSearch] = useState("");

    const handleAddClient = (e) => {
        e.preventDefault();
        //post api

        setName("");
        setEmail("");
    }

    return (
        <div>
            <nav>
                <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder='search here...' />
            </nav>
            <h1>Enter Client Detail</h1>
            <form >
                <label >Client Name</label>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='name' />
                <br />
                <label >Client Email</label>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='you@example.com' />
                <br />
                <button type='submit'>Add</button>
            </form>
            <h1>Client Detail</h1>
            <div className='card'>
                <ul>
                    <li>c1</li>
                    <li>c2</li>
                    <li>c3</li>
                </ul>
            </div>
        </div>
    )
}

export default AdminDashboard
