<?php

namespace App\Traits;
use Illuminate\Http\Request;  // Ensure this is the correct path to the Request class
use \Illuminate\Http\Response;
use SimpleXMLElement;

trait DynamicModelTrait {
    protected $model;
    protected $tableSchema;

    public function initializeDynamicModelTrait($model, $schemaFilePath) {
        $this->model = $model;
        $this->loadModelSchema($schemaFilePath);
    }

    protected function loadModelSchema($schemaFilePath) {
        if (!file_exists($schemaFilePath)) {
            throw new \Exception("Schema file not found: {$schemaFilePath}");
        }

        $xml = simplexml_load_file($schemaFilePath);
        if ($xml === false) {
            throw new \Exception("Failed to load XML file: {$schemaFilePath}");
        }

        $this->tableSchema = [];
        foreach ($xml->column as $column) {
            $colData = [
                'name' => (string)$column['name'],
                'type' => (string)$column['type'],
                'required' => ((string)$column['required']) === 'true',
                'default' => isset($column['default']) ? (string)$column['default'] : null,
            ];
            $this->tableSchema[] = $colData;
        }
    }
    public function dynamicSave(Request $request) {
        // Check if an ID is provided. If so, find the existing record; otherwise, create a new instance.
        $modelInstance = isset($request->id) && $request->id ? $this->model::find($request->id) : new $this->model;

        foreach ($this->tableSchema as $column) {
            $columnName = $column['name'];

            // Skip the ID field for new records
            if ($columnName === 'id' && !isset($modelInstance->id)) {
                continue;
            }

            // If the column value is present in the request, use it.
            // Otherwise, use the default value if it is defined in the schema.
            if ($request->has($columnName)) {
                $modelInstance->$columnName = $request->$columnName;
            } else if (isset($column['default']) && !isset($modelInstance->$columnName)) {
                $modelInstance->$columnName = $column['default'];
            }
        }

        // Save the model
        $modelInstance->save();

        return response()->json(['message' => 'Data saved successfully', 'data' => $modelInstance], 200);
    }
    public function fetchDataByIdAndShopName($id, $shopName) {
        $query = $this->model::where('shop_name', $shopName);

        // First, try to find the record with the given ID and shop name
        $record = $query->where('id', $id)->first();

        if (!$record) {
            // If not found, get the latest record with the same shop name
            $query2 = $this->model::where('shop_name', $shopName);

            $record = $query2->latest()->first();
        }

        if ($record) {
            return response()->json($record);
        } else {
            // Return a 404 response if no record is found
            return response()->json(['message' => 'Record not found'], Response::HTTP_NOT_FOUND);
        }
    }

    public function fetchPagedList(Request $request) {
        $shopName = $request->input('shop_name');
        $currentPage = $request->input('page', 1);
        $itemsPerPage = $request->input('items_per_page', 10);

        $query = $this->model::where('shop_name', $shopName);

        $totalItemCount = $query->count();
        $items = $query->forPage($currentPage, $itemsPerPage)->get();

        return response()->json([
            'items' => $items,
            'totalItemCount' => $totalItemCount,
            'currentPage' => $currentPage,
            'itemsPerPage' => $itemsPerPage
        ]);
    }
}
