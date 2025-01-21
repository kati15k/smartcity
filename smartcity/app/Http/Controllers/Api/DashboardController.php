<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AmusementPlaces;
use App\Models\Companies;
use App\Models\Jobs;
use App\Models\Reviews;
use App\Models\Universities;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function getDashboardData()
    {
        try {
            $usersCount = User::count();
            $companiesCount = Companies::count();
            $placesCount = AmusementPlaces::count();
            $universitiesCount = Universities::count();
            $reviewsCount = Reviews::count();
            $jobsCount = Jobs::count();

            // Log the counts
            Log::info('Fetched dashboard data', [
                'usersCount' => $usersCount,
                'companiesCount' => $companiesCount,
                'placesCount' => $placesCount,
                'universitiesCount' => $universitiesCount,
                'reviewsCount' => $reviewsCount,
                'jobsCount' => $jobsCount,
            ]);

            return response()->json([
                'usersCount' => $usersCount,
                'companiesCount' => $companiesCount,
                'placesCount' => $placesCount,
                'universitiesCount' => $universitiesCount,
                'reviewsCount' => $reviewsCount,
                'jobsCount' => $jobsCount,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error fetching dashboard data', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Error fetching dashboard data',
            ], 500);
        }
    }
}
