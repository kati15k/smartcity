<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Reviews;
use App\Http\Requests\StoreReviewsRequest;
use App\Http\Requests\UpdateReviewsRequest;
use Log;

class ReviewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ReviewResource::collection(Reviews::query()->orderBy('id', 'desc')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreReviewsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReviewsRequest $request)
    {
        $data = $request->validated();
        $data['content'] = $data['review']; // Map review to content
    
        $review = Reviews::create(['content' => $data['content']]);
    
        return response()->json(['message' => 'Review created successfully', 'review' => $review], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reviews  $reviews
     * @return \Illuminate\Http\Response
     */
    public function show(Reviews $reviews)
    {
        return new ReviewResource($reviews);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateReviewsRequest  $request
     * @param  \App\Models\Reviews  $reviews
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReviewsRequest $request, Reviews $reviews)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reviews  $reviews
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Manually retrieve the review by ID
        $review = Reviews::find($id);

        // Log the full request to see what data is being passed
        Log::info('Request to delete review:', [
            'review_id' => $id, // Log the review ID being passed
        ]);

        // Log the route parameters to see if the review ID is being passed correctly
        Log::info('Route parameters:', request()->route()->parameters());

        // Check if the review exists
        if (!$review) {
            Log::error('Failed to find review by ID');
            return response()->json(['error' => 'Review not found'], 404);
        }

        // Proceed with deletion
        Log::info('Review deleted', [
            'review_id' => $review->id,
            'deleted_at' => now(),
        ]);
        $review->delete();

        return response('', 204);
    }
}
