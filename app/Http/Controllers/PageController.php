<?php

namespace App\Http\Controllers;

use App\Models\ShortUrl;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        $count = ShortUrl::count();

        return Inertia::render('Home', [
            'count' => $count
        ]);
    }
}
