export default function Layout({ children, count }) {
    return (
        <div className={'p-[100px]'}>
            <nav>
                <h1 className="text-center text-5xl font-bold pb-[10px] opacity-50">Tiny URL</h1>
                <h3 className={'text-center text-xl pb-[50px] opacity-50'}>Shorten any URL with ease</h3>
            </nav>
            <main className="flex justify-center">
                {children}
            </main>
            <footer className="absolute bottom-0 left-0 w-full">
                <div className="container mx-auto my-8 flex justify-between items-center">
                    <a href={'https://kezhall.dev'} target={'_blank'} className="flex items-center">
                        <p className="text-center text-black opacity-50">Kez Hall</p>
                    </a>

                    <p className="text-center text-black opacity-50">Last updated Feb, 2025.</p>
                </div>
            </footer>
        </div>
    );
}
