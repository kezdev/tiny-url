import Layout from '@/Layouts/Layout.jsx';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentDuplicateIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

export default function Home({ count }) {
    const [data, setData] = useState({ url: '' });
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
    }

    const copyToClipboard = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    }

    const navigateToShortUrl = () => {
        if (shortUrl) {
            window.open(shortUrl, '_blank');
        }
    }

    return (
        <Layout count={count}>
            <Head title="Create short links" />
            <div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto py-[50px] px-[50px] w-[600px] text-center bg-white bg-opacity-25 rounded-lg shadow-md"
                >
                    <form onSubmit={handleSubmit} className="w-full flex items-center">
                        <input
                            autoFocus={true}
                            type="url"
                            name="url"
                            id="url"
                            placeholder="Enter your URL"
                            value={data.url}
                            onChange={(e) => setData({ ...data, url: e.target.value })}
                            required
                            className="w-full p-2 border-0 rounded-md focus:outline-none text-center bg-white bg-opacity-25"
                        />
                        {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={processing}
                            className="ml-4 px-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                        >
                            {processing ? 'Shortening...' : 'Shorten'}
                        </motion.button>
                    </form>
                </motion.div>

                {shortUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto py-[30px] px-[50px] mt-10 bg-white rounded-lg shadow-md flex items-center space-x-4 bg-opacity-25"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={copyToClipboard}
                            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition bg-opacity-25"
                        >
                            <DocumentDuplicateIcon className="w-5 h-5 text-gray-600"/>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={navigateToShortUrl}
                            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition bg-opacity-25"
                        >
                            <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-600"/>
                        </motion.button>
                        <p className="flex-1 bg-gray-50 bg-opacity-25 px-5 py-2 rounded-md break-all truncate text-center">
                            {shortUrl}
                        </p>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
}
