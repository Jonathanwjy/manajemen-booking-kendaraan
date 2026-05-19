<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
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
            'driver_id' => 'required|integer|exists:drivers,id',
            'office_id' => 'required|integer|exists:offices,id',
            'approver_ids'   => 'required|array|min:2',
            'approver_ids.*' => 'exists:users,id',
            'purpose' => 'required|string',
            'start_date' => 'required|date|before_or_equal:end_date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:pending,ongoing,finished,declined',
        ];
    }
}
