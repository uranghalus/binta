import { SecurityData } from "@/pages/fire-safety/cekpoint-security/data/SecurityData";
import { User } from "@/types";

export interface CPInspection {
  id: number;
  kode_cp?: number | null; // foreign key ke cek_point_security
  user_id?: number | null; // foreign key ke users
  regu: "PAGI" | "SIANG" | "MALAM"; // sesuai enum
  kondisi?: string | null;
  foto_kondisi?: string | null;
  bocoran?: string | null;
  foto_bocoran?: string | null;
  penerangan_lampu?: string | null;
  foto_penerangan_lampu?: string | null;
  kerusakan_fasum?: string | null;
  foto_kerusakan_fasum?: string | null;
  potensi_bahaya_api?: string | null;
  foto_potensi_bahaya_api?: string | null;
  potensi_bahaya_keorang?: string | null;
  foto_potensi_bahaya_keorang?: string | null;
  orang_mencurigakan?: string | null;
  foto_orang_mencurigakan?: string | null;
  tanggal_patroli: string; // ISO date string (cast datetime di Laravel)

  // Relasi opsional
  cek_point?: SecurityData | null;
  user?: User | null;
}