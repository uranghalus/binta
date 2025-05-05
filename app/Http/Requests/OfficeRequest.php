<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OfficeRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'office_code' => 'required|string|unique:tbl_offices,office_code',
            'name' => 'required|string|unique:tbl_offices,name',
            'address' => 'nullable|string',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'Nama kantor wajib diisi.',
            'name.unique' => 'Nama kantor sudah digunakan.',
            'office_code.required' => 'Kode kantor wajib diisi.',
            'office_code.unique' => 'Kode kantor sudah digunakan.',
        ];
    }
}
