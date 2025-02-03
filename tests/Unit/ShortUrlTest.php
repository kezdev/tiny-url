<?php

namespace Tests\Unit;

use App\Models\ShortUrl;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShortUrlTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_short_url()
    {
        $shortUrl = ShortUrl::factory()->create([
            'original_url' => 'https://example.com',
            'short_code' => 'abc123',
        ]);

        $this->assertDatabaseHas('short_urls', [
            'original_url' => 'https://example.com',
            'short_code' => 'abc123',
        ]);
    }

    /** @test */
    public function it_has_a_valid_short_code()
    {
        $shortUrl = ShortUrl::factory()->create();

        $this->assertNotEmpty($shortUrl->short_code);
        $this->assertEquals(6, strlen($shortUrl->short_code));
    }
}
