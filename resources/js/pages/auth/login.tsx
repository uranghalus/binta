import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle, RotateCcw } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
    captcha: string;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    errors?: Record<string, string>; // optional if passed as prop
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [captchaImg, setCaptchaImg] = useState('');
    const { data, setData, post, processing, reset, errors } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        captcha: '',
        remember: false,
    });

    const refreshCaptcha = () => {
        setCaptchaImg('/captcha/minimal?' + Date.now());
    };

    useEffect(() => {
        refreshCaptcha();
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('post.login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        1{' '}
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <Link href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div className="grid gap-2">
                        <div className="gap- flex items-center">
                            <img src={captchaImg} alt="CAPTCHA code" className="h-9 w-auto rounded border" />
                            <Button type="button" variant="ghost" onClick={refreshCaptcha} className="h-10 w-10 p-0">
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </div>
                        <Input
                            type="text"
                            value={data.captcha}
                            onChange={(e) => setData('captcha', e.target.value)}
                            placeholder="Masukkan kode CAPTCHA"
                            tabIndex={3}
                        />
                        {errors.captcha && <p className="text-sm text-red-500">{errors.captcha}</p>}
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox id="remember" checked={data.remember} onCheckedChange={(checked) => setData('remember', Boolean(checked))} />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
