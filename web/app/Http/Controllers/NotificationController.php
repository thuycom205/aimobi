<?php

namespace App\Http\Controllers;
use App\Models\Notification;
use App\Traits\DynamicModelTrait;
use Illuminate\Http\Request;  // Ensure this is the correct path to the Request class

class NotificationController extends Controller {
    use DynamicModelTrait;
    public function __construct() {
        $relativePath = 'app/Http/Controllers/notifications.xml';

        $this->initializeDynamicModelTrait(Notification::class,  base_path($relativePath));

        $this->model = Notification::class;
    }
    public function save(Request $request) {
        return $this->dynamicSave($request);
    }
    public function fetch(Request $request) {
        $id = $request->input('id');
        $shopName = $request->input('shop_name');

        return $this->fetchDataByIdAndShopName($id, $shopName);
    }
    public function fetchList(Request $request) {
        return $this->fetchPagedList($request);
    }
}
