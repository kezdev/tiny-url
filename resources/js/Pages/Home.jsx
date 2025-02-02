import Layout from '@/Layouts/Layout.jsx';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/24/solid';

export default function Home({ count }) {
    const [data, setData] = useState({ url: 'https://google.com' });
    const [shortUrl, setShortUrl] = useState(null);
    const [copied, setCopied] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({ url: null });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setProcessing(true);
        setErrors({ url: null });

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

        try {
            const response = await fetch('/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({ url: data.url })
            });

            const result = await response.json();

            if (response.ok) {
                setShortUrl(result.short_url);
                setCopied(false);
                setData({ url: '' });
            } else {
                setErrors(result.errors || {});
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setProcessing(false);
        }
    };

    const copyToClipboard = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <Layout>
            <Head title="Create short links" />

            <div>
                <div className="mx-auto py-[50px] px-[100px] mt-10 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-center mb-2">Shorten Your URL</h2>
                    <p className="text-center text-gray-400 mb-4">Total URLs shortened: {count}</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            autoFocus={true}
                            type="url"
                            name="url"
                            id="url"
                            placeholder="Enter URL"
                            value={data.url}
                            onChange={(e) => setData({ ...data, url: e.target.value })}
                            required
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                        />
                        {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                        >
                            {processing ? 'Shortening...' : 'Shorten'}
                        </button>
                    </form>
                </div>

                {shortUrl && (
                    <div className="mx-auto py-[30px] px-[50px] mt-10 bg-white rounded-lg shadow-md flex items-center space-x-4">
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className=" flex-1 text-blue-500 bg-gray-50 px-5  py-2 rounded-md break-all truncate">
                            {shortUrl}
                        </a>
                        <button
                            onClick={copyToClipboard}
                            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                        >
                            <DocumentDuplicateIcon className="w-5 h-5 text-gray-600"/>
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
