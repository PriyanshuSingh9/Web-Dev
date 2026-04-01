import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import Table from './Table'

import { useDispatch } from "react-redux"
import type { AppDispatch } from "../redux/store"
import { addEntry } from "../redux/passwordEntry/passwordEntrySlice"



type Inputs = {
    url: string,
    username: string,
    password: string
}

const Manager = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(addEntry(data))
        reset()
    }

    return (
        <div className='min-h-screen bg-green-100'>
            <div className="pt-32 px-4 max-w-7xl mx-auto my-2">
                <div className='text-3xl font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    <span className='text-black'>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </div>
                <div className='flex justify-center text-black'>Your own Password Manager</div>
            </div>

            <div className='m-auto max-w-6xl'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div>
                        <input
                            type="url"
                            placeholder='Enter the website url'
                            className='bg-amber-50 text-black p-1.5 rounded-full min-w-full border border-green-400'
                            {...register("url", { required: "Website URL is missing" })}
                        />
                        {errors.url && <span className="text-red-500 text-sm px-2">{errors.url.message}</span>}
                    </div>

                    <div className='grid grid-cols-12 gap-2'>
                        <div className="col-span-7">
                            <input
                                type="text"
                                placeholder='Enter username'
                                className='bg-amber-50 text-black p-1.5 rounded-full w-full border border-green-400'
                                {...register("username", { required: "Username missing" })}
                            />
                            {errors.username && <span className="text-red-500 text-sm px-2">{errors.username.message}</span>}
                        </div>
                        <div className="col-span-5">
                            <input
                                type="password"
                                placeholder='Enter password'
                                className='bg-amber-50 text-black p-1.5 rounded-full w-full border border-green-400'
                                {...register("password", { required: "Password missing" })}
                            />
                            {errors.password && <span className="text-red-500 text-sm px-2">{errors.password.message}</span>}
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='bg-green-500 px-4 py-2 flex items-center gap-2 rounded-full border border-green-700 hover:bg-green-400 transition-all font-bold'
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
            {/* {value.loading ? <p>loading</p> : <Table />} */}
            <Table />
        </div>
    )
}

export default Manager
