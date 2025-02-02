export default function Layout({ children }) {
    return (
        <div>
            <nav className={'absolute top-0 left-0 w-full p-[50px] bg-white shadow-md'}>
                <h1 className="text-center text-4xl font-bold">Tiny URL</h1>
            </nav>
            <main className="min-h-screen flex items-center justify-center">
                {children}
            </main>
        </div>
    );
}
