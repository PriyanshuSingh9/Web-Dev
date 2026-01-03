import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    // task name is always required
    title: {
        type: String,
        required: true
    },
    // tasks start out as incomplete so we put the default value on creation as false
    completed: {
        type: Boolean,
        default: false
    }
})

// in mongoose fields are not required by default thus we dont have to use required: false 

const listSchema = new mongoose.Schema({
    list_name: { type: String, required: true },
    list_desc: String,
    list_tasks: [taskSchema]
},
    { timestamps: true }
)

export default mongoose.model("List", listSchema);
