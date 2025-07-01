import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';

export default function register() {
    return (
        <AuthLayout title="Create an account" description="Enter your email and password to create an account.">
            <Head title="Register" />
        </AuthLayout>
    );
}
