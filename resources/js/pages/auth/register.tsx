import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nik: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
    return (
        <AuthLayout title="Create an account" description="Enter your email and password to create an account.">
            <Head title="Register" />
            <form onSubmit={submit} className="mt-6 flex flex-col gap-6">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="nik">No Induk Karyawan</Label>
                        <Input
                            id="nik"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            value={data.nik}
                            onChange={(e) => setData('nik', e.target.value.trim())}
                            placeholder="email@example.com"
                        />
                        {errors.nik && <p className="text-sm text-red-500">{errors.nik}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Masukkan Password"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Masukkan Konfirmasi Password"
                        />
                        {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                    </div>
                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Daftar
                    </Button>
                </div>
                <div className="text-muted-foreground text-center text-sm">
                    Sudah punya akun?{' '}
                    <Link href={route('login')} tabIndex={6} className="font-bold">
                        Masuk Disini
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
