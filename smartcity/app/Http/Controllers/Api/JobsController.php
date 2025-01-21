<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobResource;
use App\Models\jobs;
use App\Http\Requests\StorejobsRequest;
use App\Http\Requests\UpdatejobsRequest;
use Log;

class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return JobResource::collection(jobs::query()->orderBy('id', 'desc')->paginate(0));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorejobsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorejobsRequest $request)
    {
        Log::info('Attempting to store a new job.', ['data' => $request->all()]);
        $data = $request->validated();
        $place = jobs::create($data);

        Log::info('job created successfully.', ['place_id' => $place->id]);
        return response(new JobResource($place), 201);


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\jobs  $jobs
     * @return \Illuminate\Http\Response
     */
    public function show(jobs $jobs)
    {
        return new JobResource($jobs);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatejobsRequest  $request
     * @param  \App\Models\jobs  $jobs
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatejobsRequest $request, $id)
    {
        Log::info('Attempting to update job.', ['job_id' => $id, 'data' => $request->all()]);
        $jobs = jobs::find($id);
        // Check if the place exists
        if (!$jobs) {
            Log::error('job not found.', ['job_id' => $id]);
            return response()->json(['error' => 'job not found'], 404);
        }
        // Update the place attributes with the request data
        $jobs->name = $request->input('name');
        $jobs->position = $request->input('position');
        $jobs->salary = $request->input('salary');
        $jobs->job_requirements = $request->input('job_requirements');
        $jobs->job_link = $request->input('job_link');
        // Save the updated place
        $jobs->save();
        // Log the successful update
        Log::info('job updated successfully.', ['job_id' => $jobs->id]);
        return response()->json($jobs);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\jobs  $jobs
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Manually retrieve the place by ID
        $jobs = jobs::find($id);
        // Log the full request to see what data is being passed
        Log::info('Request to delete review:', [
            'job_id' => $id, // Log the place ID being passed
        ]);
        // Log the route parameters to see if the review ID is being passed correctly
        Log::info('Route parameters:', request()->route()->parameters());
        // Check if the place exists
        if (!$jobs) {
            Log::error('Failed to find place by ID');
            return response()->json(['error' => 'Place not found'], 404);
        }
        // Proceed with deletion
        Log::info('place deleted', [
            'job_id' => $jobs->id,
            'deleted_at' => now(),
        ]);
        $jobs->delete();
        return response('', 204);
    }
}
