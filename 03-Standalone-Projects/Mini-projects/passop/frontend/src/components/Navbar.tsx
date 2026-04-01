import githubInvertocat from '../assets/GitHub_Invertocat_Black_Clearspace.png';
import githubLogo from '../assets/GitHub_Logo.png';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-black text-white z-10 p-2">
            <div className="flex justify-between items-center px-4 py-5 h-14 max-w-7xl mx-auto">
                <div className='text-xl font-bold'>
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </div>
                <div className='github'>
                    <button className='flex items-center border-b-amber-50 border gap-2 bg-green-700 hover:bg-green-600 px-3 py-1 rounded-full transition-colors'>
                        <img className='invert w-8' src={githubInvertocat} alt="github invertocat" />
                        <img className='invert w-12' src={githubLogo} alt="github logo" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar