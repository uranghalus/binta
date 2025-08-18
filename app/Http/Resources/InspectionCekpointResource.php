<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InspectionCekpointResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cekpoint' => [
                'id' => $this->cekpoint?->id,
                'nama' => $this->cekpoint?->nama,
                'lokasi' => $this->cekpoint?->lokasi,
            ],
            'user' => [
                'id' => $this->user?->id,
                'karyawan' => [
                    'nama' => $this->user?->karyawan?->nama,
                ]
            ],
            'regu' => $this->regu,
            'tanggal_patroli' => $this->tanggal_patroli,
            'kondisi' => $this->kondisi,
            'bocoran' => $this->bocoran,
            'penerangan_lampu' => $this->penerangan_lampu,
            'kerusakan_fasum' => $this->kerusakan_fasum,
            'potensi_bahaya_api' => $this->potensi_bahaya_api,
            'potensi_bahaya_keorang' => $this->potensi_bahaya_keorang,
            'orang_mencurigakan' => $this->orang_mencurigakan,

            // foto dengan accessor otomatis url
            'foto_kondisi_url' => $this->foto_kondisi_url,
            'foto_bocoran_url' => $this->foto_bocoran_url,
            'foto_penerangan_lampu_url' => $this->foto_penerangan_lampu_url,
            'foto_kerusakan_fasum_url' => $this->foto_kerusakan_fasum_url,
            'foto_potensi_bahaya_api_url' => $this->foto_potensi_bahaya_api_url,
            'foto_potensi_bahaya_keorang_url' => $this->foto_potensi_bahaya_keorang_url,
            'foto_orang_mencurigakan_url' => $this->foto_orang_mencurigakan_url,
        ];
    }
}
