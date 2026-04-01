import { useState } from 'react'
import "./Sidebar.css"

const Sidebar = ({ onListCreated }) => {
    // form for creating a new list
    const [form, setForm] = useState({ name: "", desc: "" })

    // function to handle changes in the form
    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // function to handle from submission
    function handleSubmit(e) {
        e.preventDefault();

        // NO CREATION OF LIST WITHOUT A NAME
        if (!form.name.trim()) return;

        onListCreated(form.name, form.desc);
        setForm({ name: "", desc: "" });
    }

    return (
        <div className="sidebar">
            <div className="new">
                <h3>Create a new list :</h3>
                {/* Form for creating a new list */}
                <form action="post" onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label htmlFor="list-name">List name:</label>
                        <input type="text" name="name" id="list-name" value={form.name} onChange={handleForm} />
                    </div>
                    <div className="form-item desc">
                        <label htmlFor="list-description">Enter a description for the list :</label>
                        <textarea name="desc" id="list-description" value={form.desc} onChange={handleForm}></textarea>
                    </div>
                    <button className="create" type='submit'>Create</button>
                </form>
            </div>
        </div>
    )
}

export default Sidebar
