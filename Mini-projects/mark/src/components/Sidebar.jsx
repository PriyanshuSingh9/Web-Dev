import { useState } from 'react'
import "./Sidebar.css"

const Sidebar = () => {
    const [form, setForm] = useState({ name: "", desc: "" })

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className="sidebar">
            <div className="new">
                <h3>Create a new list :</h3>
                <form action="post">
                    <div className="form-item">
                        <label htmlFor="list-name">List name:</label>
                        <input type="text" name="name" id="list-name" value={form.name} onChange={handleForm} />
                    </div>
                    <div className="form-item desc">
                        <label htmlFor="list-description">Enter a description for the list :</label>
                        <textarea name="desc" id="list-description" value={form.desc} onChange={handleForm}></textarea>
                    </div>
                    <button className="create">Create</button>
                </form>
            </div>
        </div>
    )
}

export default Sidebar
