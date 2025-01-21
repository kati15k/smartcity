<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class DetailsController extends Controller
{
    public function getDetails($tableName, $id)
    {
        // Log the request details
        Log::info("Request received for table: {$tableName}, ID: {$id}");

        // Make sure the table name is valid to prevent SQL injection
        $validTables = ['companies', 'amusement_places', 'jobs', 'universities'];

        if (!in_array($tableName, $validTables)) {
            Log::warning("Invalid table name: {$tableName} requested");
            return response()->json(['error' => 'Invalid table name'], 400);
        }

        // Log the valid table name
        Log::info("Fetching data from table: {$tableName} for ID: {$id}");

        // Retrieve the data from the specific table
        $data = DB::table($tableName)->find($id);

        if ($data) {
            Log::info("Data found for ID: {$id}");
            return response()->json($data);
        } else {
            Log::warning("Data not found for ID: {$id} in table: {$tableName}");
            return response()->json(['error' => 'Data not found'], 404);
        }
    }
}
