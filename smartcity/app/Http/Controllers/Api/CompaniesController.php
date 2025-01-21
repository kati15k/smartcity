<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyResource;
use App\Models\Companies;
use App\Http\Requests\StoreCompaniesRequest;
use App\Http\Requests\UpdateCompaniesRequest;
use Log;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CompanyResource::collection(Companies::query()->orderBy('id', 'desc')->paginate(30));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCompaniesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCompaniesRequest $request)
    {
        Log::info('Attempting to store a new company.', ['data' => $request->all()]);
        $data = $request->validated();
        $place = Companies::create($data);
        Log::info('Amusement place created successfully.', ['place_id' => $place->id]);
        return response(new CompanyResource($place), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Companies  $companies
     * @return \Illuminate\Http\Response
     */
    public function show(Companies $companies)
    {
        return new CompanyResource($companies);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCompaniesRequest  $request
     * @param  \App\Models\Companies  $companies
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCompaniesRequest $request, $id)
    {
        // Log the request attempt
        Log::info('Attempting to update amusement place.', ['place_id' => $id, 'data' => $request->all()]);
        // Find the amusement place by ID
        $companies = Companies::find($id);
        // Check if the place exists
        if (!$companies) {
            Log::error('Amusement place not found.', ['place_id' => $id]);
            return response()->json(['error' => 'Place not found'], 404);
        }
        // Update the place attributes with the request data
        $companies->name = $request->input('name');
        $companies->location = $request->input('location');
        $companies->description = $request->input('description');
        $companies->size = $request->input('size');
        $companies->position = $request->input('position');
        $companies->image_path = $request->input('image_path');
        // Save the updated place
        $companies->save();
        // Log the successful update
        Log::info('Amusement place updated successfully.', ['place_id' => $companies->id]);
        return response()->json($companies);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Companies  $companies
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Manually retrieve the place by ID
        $companies = Companies::find($id);
        // Log the full request to see what data is being passed
        Log::info('Request to delete review:', [
            'place_id' => $id, // Log the place ID being passed
        ]);
        // Log the route parameters to see if the ID is being passed correctly
        Log::info('Route parameters:', request()->route()->parameters());
        // Check if the place exists
        if (!$companies) {
            Log::error('Failed to find place by ID');
            return response()->json(['error' => 'Place not found'], 404);
        }
        // Proceed with deletion
        Log::info('place deleted', [
            'place_id' => $companies->id,
            'deleted_at' => now(),
        ]);
        $companies->delete();
        return response('', 204);
    }
}
