import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { PermissionSchema } from './data/permissionSchema';

interface Props {
    // Define any props if needed
    permissions?: PermissionSchema[];
}

export default function index({ permissions }: Props) {
    return (
        <AppLayout title="Manajemen Hak Akses">
            <Head title="Manajemen Hak Akses" />
            {/* Add your content here */}
            test
        </AppLayout>
    );
}
