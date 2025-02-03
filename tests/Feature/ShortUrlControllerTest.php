<?php

namespace Tests\Feature;

use App\Models\ShortUrl;
use App\Services\UrlService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Mockery;

class ShortUrlControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_shorten_a_valid_url()
    {
        $urlService = Mockery::mock(UrlService::class);
        $this->app->instance(UrlService::class, $urlService);

        $urlService->shouldReceive('shortenUrl')
            ->once()
            ->with('https://example.com')
            ->andReturn('http://short.ly/abc123');

        $response = $this->postJson(route('shorten.store'), [
            'url' => 'https://example.com',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'URL shortened successfully',
                'short_url' => 'http://short.ly/abc123',
            ]);
    }

    /** @test */
    public function it_returns_an_error_for_invalid_url()
    {
        $response = $this->postJson(route('shorten.store'), [
            'url' => 'invalid-url',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['url']);
    }

    /** @test */
    public function it_redirects_to_the_original_url()
    {
        $shortUrl = ShortUrl::factory()->create([
            'short_code' => 'abc123',
            'original_url' => 'https://example.com',
        ]);

        $response = $this->get(route('shorten.redirect', ['shortCode' => 'abc123']));

        $response->assertRedirect('https://example.com');
    }

    /** @test */
    public function it_returns_404_for_nonexistent_short_code()
    {
        $response = $this->get(route('shorten.redirect', ['shortCode' => 'nonexistent']));

        $response->assertStatus(404);
    }
}
