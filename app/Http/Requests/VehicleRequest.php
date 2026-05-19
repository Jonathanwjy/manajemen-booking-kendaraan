<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class VehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'office_id' => 'required|integer|exists:offices,id',
            'vehicle_type_id' => 'required|integer|exists:vehicle_types,id',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|digits:4',
            'registration_number' => 'required|string|max:255',
            'ownership' => 'required|in:owned,rent',
            'vendor' => 'nullable|string|max:255',
            'odometer' => 'required|integer|min:0',
            'status' => 'required|in:available,booked,inuse,service',
        ];
    }
}
