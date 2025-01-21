<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UniversitiesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return[
            'id' => $this->id,
            'name' => $this->name,
            'img_url' => $this->img_url,
            'established_year' => $this->established_year,
            'website' => $this->website,
            'description' => $this->descrption,
            'contact_email' => $this->contact_email,
            'phone_number' => $this->phone_number,
            'location' => $this->location,
        ];
    }
}
