<?php

namespace App\Http\Controllers;
use App\Models\AppSubmission;
use App\Traits\DynamicModelTrait;
use Illuminate\Http\Request;  // Ensure this is the correct path to the Request class

class AppSubmissionController extends Controller {
    use DynamicModelTrait;
    public function __construct() {
        $this->initializeDynamicModelTrait(AppSubmission::class,'/home/thuy/work/temp_remix/mobileappbuilder/vite/ai-mobile-app-builder/web/app/Http/Controllers/app_submission.xml');

        $this->model = AppSubmission::class;
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
