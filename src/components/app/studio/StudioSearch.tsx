import { Input } from '@/components/ui/Input';

export default function StudioSearch({
    value,
    onChange,
    placeholder = 'Search your favorite studios...',
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    return (
        <div className="mb-4">
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}
