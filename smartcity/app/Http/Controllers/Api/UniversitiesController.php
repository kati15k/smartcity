<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UniversitiesResource;
use App\Models\Universities;
use App\Http\Requests\StoreUniversitiesRequest;
use App\Http\Requests\UpdateUniversitiesRequest;
use Log;

class UniversitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $universities = Universities::orderBy('id', 'desc')->get();
        return UniversitiesResource::collection($universities);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUniversitiesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUniversitiesRequest $request)
    {
        Log::info('Attempting to store a new academic place.', ['data' => $request->all()]);
        $data = $request->validated();
        $place = Universities::create($data);
        Log::info('Academic place created successfully.', ['place_id' => $place->id]);
        return response(new UniversitiesResource($place), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Universities  $universities
     * @return \Illuminate\Http\Response
     */
    public function show(Universities $universities)
    {
        return new UniversitiesResource($universities);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUniversitiesRequest  $request
     * @param  \App\Models\Universities  $universities
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUniversitiesRequest $request, $id)
    {
        // Log the request attempt
        Log::info('Attempting to update amusement place.', ['place_id' => $id, 'data' => $request->all()]);
        // Find the amusement place by ID
        $academicPlaces = Universities::find($id);
        // Check if the place exists
        if (!$academicPlaces) {
            Log::error('Amusement place not found.', ['place_id' => $id]);
            return response()->json(['error' => 'Place not found'], 404);
        }
        // Update the place attributes with the request data
        $academicPlaces->name = $request->input('name');
        $academicPlaces->contact_email = $request->input('contact_email');
        $academicPlaces->established_year = $request->input('established_year');
        $academicPlaces->website = $request->input('website');
        $academicPlaces->location = $request->input('location');
        $academicPlaces->description = $request->input('description');
        $academicPlaces->phone_number = $request->input('phone_number');
        $academicPlaces->img_url = $request->input('img_url');
        // Save the updated place
        $academicPlaces->save();
        // Log the successful update
        Log::info('Amusement place updated successfully.', ['place_id' => $academicPlaces->id]);
        return response()->json($academicPlaces);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Universities  $universities
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Manually retrieve the place by ID
        $academicPlaces = Universities::find($id);
        // Log the full request to see what data is being passed
        Log::info('Request to delete review:', [
            'place_id' => $id, // Log the place ID being passed
        ]);
        // Log the route parameters to see if the review ID is being passed correctly
        Log::info('Route parameters:', request()->route()->parameters());
        // Check if the place exists
        if (!$academicPlaces) {
            Log::error('Failed to find place by ID');
            return response()->json(['error' => 'Place not found'], 404);
        }
        // Proceed with deletion
        Log::info('place deleted', [
            'place_id' => $academicPlaces->id,
            'deleted_at' => now(),
        ]);
        $academicPlaces->delete();
        return response('', 204);
    }
}
