import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-sm">&copy; {new Date().getFullYear()} ScriptLinkImage. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
