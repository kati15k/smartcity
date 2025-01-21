<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlaceResource;
use App\Models\AmusementPlaces;
use App\Http\Requests\StoreAmusementPlacesRequest;
use App\Http\Requests\UpdateAmusementPlacesRequest;
use Illuminate\Support\Facades\Log; // Add the Log facade

class PlacesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        Log::info('Fetching list of amusement places.');

        $places = AmusementPlaces::query()->orderBy('id','desc')->paginate(20);

        Log::info('Places fetched successfully.', ['places_count' => $places->count()]);

        return PlaceResource::collection($places);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAmusementPlacesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAmusementPlacesRequest $request)
    {
        Log::info('Attempting to store a new amusement place.', ['data' => $request->all()]);

        $data = $request->validated();
        $place = AmusementPlaces::create($data);

        Log::info('Amusement place created successfully.', ['place_id' => $place->id]);

        return response(new PlaceResource($place), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AmusementPlaces  $amusementPlaces
     * @return \Illuminate\Http\Response
     */
    public function show(AmusementPlaces $amusementPlaces)
    {
        Log::info('Fetching amusement place details.', ['place_id' => $amusementPlaces->id]);

        return new PlaceResource($amusementPlaces);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAmusementPlacesRequest  $request
     * @param  \App\Models\AmusementPlaces  $amusementPlaces
     * @return \Illuminate\Http\Response
     */
    

     public function update(UpdateAmusementPlacesRequest $request, $id)
{
    // Log the request attempt
    Log::info('Attempting to update amusement place.', ['place_id' => $id, 'data' => $request->all()]);

    // Find the amusement place by ID
    $amusementPlaces = AmusementPlaces::find($id);
    // Check if the place exists
    if (!$amusementPlaces) {
        Log::error('Amusement place not found.', ['place_id' => $id]);
        return response()->json(['error' => 'Place not found'], 404);
    }
    // Update the place attributes with the request data
    $amusementPlaces->name = $request->input('name');
    $amusementPlaces->location = $request->input('location');
    $amusementPlaces->description = $request->input('description');
    $amusementPlaces->phone_number = $request->input('phone_number');
    $amusementPlaces->img_url = $request->input('img_url');
    // Save the updated place
    $amusementPlaces->save();
    // Log the successful update
    Log::info('Amusement place updated successfully.', ['place_id' => $amusementPlaces->id]);

    return response()->json($amusementPlaces);
}


    
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AmusementPlaces  $amusementPlaces
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Manually retrieve the place by ID
        $amusementPlaces = AmusementPlaces::find($id);
        // Log the full request to see what data is being passed
        Log::info('Request to delete review:', [
            'place_id' => $id, // Log the place ID being passed
        ]);
        // Log the route parameters to see if the review ID is being passed correctly
        Log::info('Route parameters:', request()->route()->parameters());
        // Check if the place exists
        if (!$amusementPlaces) {
            Log::error('Failed to find place by ID');
            return response()->json(['error' => 'Place not found'], 404);
        }
        // Proceed with deletion
        Log::info('place deleted', [
            'place_id' => $amusementPlaces->id,
            'deleted_at' => now(),
        ]);
        $amusementPlaces->delete();
        return response('', 204);
    }






}
