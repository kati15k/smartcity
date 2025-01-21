<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAmusementPlacesRequest extends FormRequest
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
            'name'=>'required|string|max:55',
            'img_url'=>'required|string|max:555',
            'description'=>'required|string|max:255',
            'phone_number'=>'required|string|max:255',
            'location'=>'required|string|max:255',

        ];
    }
}
