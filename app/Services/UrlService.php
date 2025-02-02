<?php

namespace App\Services;

use App\Models\ShortUrl;
use Illuminate\Support\Str;
use RuntimeException;

class UrlService
{
    const MAX_RETRIES = 15;

    /**
     * Shorten the provided URL and store it in the database.
     *
     * @param string $url
     * @return string
     * @throws RuntimeException
     */
    public function shortenUrl(string $url): string
    {
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            throw new \InvalidArgumentException('The provided URL is invalid');
        }

        $shortCode = $this->generateUniqueShortCode();

        ShortUrl::create([
            'original_url' => $url,
            'short_code' => $shortCode
        ]);

        return url($shortCode);
    }

    /**
     * Generate a unique short code that has not been used before.
     *
     * @return string
     * @throws RuntimeException
     */
    private function generateUniqueShortCode(): string
    {
        $attempts = 0;

        while ($attempts < self::MAX_RETRIES) {
            $shortCode = Str::random(6);

            if (!ShortUrl::where('short_code', $shortCode)->exists()) {
                return $shortCode;
            }

            $attempts++;
        }

        throw new RuntimeException('Unable to generate a unique short code after ' . self::MAX_RETRIES . ' attempts.');
    }
}
