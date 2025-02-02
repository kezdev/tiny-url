<?php

namespace App\Http\Controllers;

use App\Models\ShortUrl;
use App\Services\UrlService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShortUrlController extends Controller
{
    protected $urlService;

    public function __construct(UrlService $urlService)
    {
        $this->urlService = $urlService;
    }

    /**
     * Store the provided URL and return the shortened version.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        sleep(1); // Simulate a slow request

        $validated = $request->validate([
            'url' => 'required|url',
        ]);

        try {
            $shortUrl = $this->urlService->shortenUrl($validated['url']);

            return response()->json([
                'message' => 'URL shortened successfully',
                'short_url' => $shortUrl
            ]);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Redirect the user to the original URL based on the short code.
     *
     * @param string $shortCode
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirect(string $shortCode)
    {
        $shortUrl = ShortUrl::where('short_code', $shortCode)->firstOrFail();

        return redirect($shortUrl->original_url);
    }
}
