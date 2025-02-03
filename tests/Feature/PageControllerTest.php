<?php

namespace Tests\Feature;

use App\Models\ShortUrl;
use Tests\TestCase;

class PageControllerTest extends TestCase
{
    /** @test */
    public function it_returns_the_home_page_with_short_url_count()
    {
        ShortUrl::factory()->count(5)->create();

        $response = $this->get('/');
        $response->assertInertia(fn ($page) => $page->component('Home')->where('count', 5));
    }
}
