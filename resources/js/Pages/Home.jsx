import Layout from '@/Layouts/Layout.jsx';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <h1>hello!</h1>
        </Layout>
    );
}
