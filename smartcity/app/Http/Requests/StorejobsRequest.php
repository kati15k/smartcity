<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorejobsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'salary' => 'nullable|string|max:100',
            'job_requirements' => 'nullable|string|max:1000',
            'job_link' => 'required|string|max:255',
        ];
    }
}
