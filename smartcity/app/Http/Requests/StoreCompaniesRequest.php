<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompaniesRequest extends FormRequest
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
        'location' => 'required|string|max:255',
        'image_path' => 'nullable|string|max:255',
        'position' => 'nullable|string|max:255',
        'size' => 'nullable|numeric|min:0',
        'description' => 'nullable|string|max:500',

        ];
    }
}
