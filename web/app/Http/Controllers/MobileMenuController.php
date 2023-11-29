<?php

// app/Http/Controllers/MobileMenuController.php

namespace App\Http\Controllers;

use App\Models\Menu; // Assuming you have a Menu model
use Illuminate\Http\Request;

class MobileMenuController extends Controller
{
    public function fetch(Request $request)
    {
        $shopName = $request->shop;
        $id = $request->id;

        $query = Menu::where('shop_name', $shopName);

        if ($id) {
            $query->where('id', $id);
        }

        $menu = $query->latest()->first();

        if (!$menu) {
            return response()->json([
                'message' => 'Menu not found'
            ], 404);
        }

        return response()->json($menu);
    }
    public function save(Request $request)
    {
        $request->validate([
            'shop_name' => 'required|string',
            'title' => 'required|string',
            'menu_type' => 'required|in:drawer,tab_bar',
            'menu_items' => 'required|json',
            'id' => 'sometimes|nullable|integer'
        ]);

        $menu = Menu::updateOrCreate(
            ['id' => $request->id],
            [
                'shop_name' => $request->shop_name,
                'title' => $request->title,
                'menu_type' => $request->menu_type,
                'menu_items' => $request->menu_items
            ]
        );

        return response()->json($menu);
    }
}
