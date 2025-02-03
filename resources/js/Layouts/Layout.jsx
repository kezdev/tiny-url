import {Toaster} from "react-hot-toast";

export default function Layout({ children, count }) {
    return (
        <div className={'p-[100px] flex-col flex justify-center items-center min-h-screen'}>
            <Toaster />
            <main className="bg-white p-16 rounded-lg bg-opacity-50 shadow-md">
                <h1 className="text-center text-5xl font-bold pb-[10px]">🔗 🤏🏻</h1>
                <h1 className="text-center text-5xl font-bold pb-[10px]">Tiny URL</h1>
                <h3 className={'text-center text-xl pb-[50px]'}>Shortened {count} URLs so far 🚀</h3>
                {children}
            </main>
            <footer className="absolute bottom-0 left-0 w-full">
                <div className="container mx-auto my-8 flex justify-between items-center">
                    <a href={'https://kezhall.dev'} target={'_blank'} className="flex items-center">
                        <p className="text-center text-black font-medium opacity-65">Built by Kez Hall</p>
                    </a>

                    <p className="text-center text-black font-medium opacity-65">Last updated Feb, 2025.</p>
                </div>
            </footer>
        </div>
    );
}
