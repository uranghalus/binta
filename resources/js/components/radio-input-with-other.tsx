import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (val: string) => void;
  options?: string[];
  error?: string;
}

export default function RadioInputWithOther({
  label,
  name,
  error,
  value,
  onChange,
  options = ['Baik', 'Rusak', 'Tidak Ada'],
}: Props) {
  const isCustom = !options.includes(value);

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>

      <RadioGroup
        value={isCustom ? 'Yang Lain' : value}
        onValueChange={(val) => {
          if (val === 'Yang Lain') {
            onChange(''); // kosongkan dulu agar input muncul
          } else {
            onChange(val);
          }
        }}
        className="flex gap-2 p-2"
      >
        {options.map((opt) => (
          <div key={opt} className="flex items-center space-x-2">
            <RadioGroupItem value={opt} id={`${name}-${opt}`} />
            <Label htmlFor={`${name}-${opt}`}>{opt}</Label>
          </div>
        ))}

        {/* Radio untuk "Yang Lain" */}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Yang Lain" id={`${name}-other`} />
          <Label htmlFor={`${name}-other`}>Yang Lain</Label>
        </div>
      </RadioGroup>

      {/* Input hanya muncul kalau pilih "Yang Lain" */}
      {isCustom && (
        <Input
          type="text"
          placeholder="Masukkan kondisi lain..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
