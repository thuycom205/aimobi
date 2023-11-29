<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Screen; // Assuming your model name is Screen
use Illuminate\Support\Facades\Validator;

class MobileScreenController extends Controller
{
    public function fetch(Request $request)
    {
        $shopName = $request->query('shop');
        $id = $request->query('id');

        if (!$shopName) {
            return response()->json(['error' => 'Shop name is required'], 400);
        }

        $query = Screen::where('shop_name', $shopName)->where('page_type', 'home');

        if ($id) {
            $query->where('id', $id);
        }

        $screen = $query->latest()->first();

        if (!$screen) {
            return response()->json(['error' => 'Screen not found'], 404);
        }

        return response()->json($screen);
    }
    public function save(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'shop_name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'page_type' => 'required|in:home,landing_page',
            'page_content' => 'required|json',
            'status' => 'required|in:draft,active,sent,archived,scheduled',
            'page_title' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if updating an existing screen
        if ($request->id) {
            $screen = Screen::find($request->id);
            if (!$screen) {
                return response()->json(['error' => 'Screen not found'], 404);
            }
        } else {
            // Create a new screen instance
            $screen = new Screen;
        }

        // Assign the validated data to the screen model
        $screen->shop_name = $request->shop_name;
        $screen->title = $request->title;
        $screen->page_type = $request->page_type;
        $screen->page_content = $request->page_content;
        $screen->status = $request->status;
        $screen->page_title = $request->page_title;

        // Save the screen
        $screen->save();

        return response()->json(['message' => 'Screen saved successfully', 'screen' => $screen], 200);
    }

}
