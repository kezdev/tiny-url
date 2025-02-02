export default function Layout({ children }) {
    return (
        <div>
            <nav className={'absolute top-0 left-0 w-full p-4 bg-white shadow-md bg-opacity-25'}>
                <h1 className="text-center text-2xl font-bold">Tiny URL</h1>
            </nav>
            <main className="min-h-screen flex items-center justify-center">
                {children}
            </main>
        </div>
    );
}
