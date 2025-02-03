<?php

namespace Tests\Unit;

use App\Services\UrlService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\URL;

class UrlServiceTest extends TestCase
{
    use RefreshDatabase;

    protected UrlService $urlService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->urlService = new UrlService();
    }

    /** @test */
    public function it_generates_a_valid_short_url()
    {
        $originalUrl = 'https://example.com';
        $shortUrl = $this->urlService->shortenUrl($originalUrl);

        $this->assertStringContainsString(URL::to('/'), $shortUrl);

        $this->assertDatabaseHas('short_urls', [
            'original_url' => $originalUrl,
        ]);
    }

    /** @test */
    public function it_generates_unique_short_codes()
    {
        $codes = [];

        for ($i = 0; $i < 10; $i++) {
            $shortUrl = $this->urlService->shortenUrl('https://example.com/' . $i);
            $code = str_replace(URL::to('/'), '', $shortUrl);
            $this->assertNotContains($code, $codes);
            $codes[] = $code;
        }
    }

    /** @test */
    public function it_throws_exception_for_invalid_url()
    {
        $this->expectException(\InvalidArgumentException::class);

        $this->urlService->shortenUrl('invalid-url');
    }
}
