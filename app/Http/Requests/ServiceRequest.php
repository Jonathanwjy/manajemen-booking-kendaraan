<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
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
            'vehicle_id' => 'required|integer|exists:vehicles,id',
            'service_date' => 'required|date',
            'odometer' => 'required|integer|min:0',
            'next_service_date' => 'nullable|date|after_or_equal:service_date',
            'next_service_odometer' => 'nullable|integer|gte:odometer',
            'status' => 'required|in:service,finished',
            'notes' => 'nullable|string',
        ];
    }
}
