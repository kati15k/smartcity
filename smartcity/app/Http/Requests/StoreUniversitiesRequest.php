<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUniversitiesRequest extends FormRequest
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
            'name' => 'required|string|max:199',
            'img_url' => 'nullable|string|max:255',
            'established_year' => 'required|integer',
            'website' => 'nullable|string|max:199',
            'description'=>'required|string|max:555',
            'contact_email' => 'nullable|email|max:199',
            'phone_number' => 'nullable|string|max:199',
            'location'=>'required|string|max:555',

        ];
    }
}
