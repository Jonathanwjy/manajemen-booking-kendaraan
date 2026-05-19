import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CarFront, MapPin, ShieldCheck } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />

            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-100/50 blur-3xl dark:bg-orange-900/20"></div>
                <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-orange-100/50 blur-3xl dark:bg-orange-900/20"></div>

                <div className="z-10 w-full max-w-3xl px-6 text-center">
                    <div className="mt-10 mb-8 flex justify-center">
                        <div className="rounded-2xl bg-orange-50 p-4 ring-1 ring-orange-100 dark:bg-orange-950/30 dark:ring-orange-900">
                            <CarFront className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>

                    <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                        Sistem Manajemen Booking Kendaraan
                        <br className="hidden sm:block" />
                        <span className="text-orange-600 dark:text-orange-400">PT.Sekawan Media</span>
                    </h1>

                    <p className="mx-auto mb-10 max-w-xl text-[#706f6c] md:text-lg dark:text-[#A1A09A]">
                        Platform terpadu untuk mengelola dan memantau persetujuan peminjaman kendaraan operasional perusahaan dengan mudah dan
                        efisien.
                    </p>

                    <div className="flex justify-center">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            >
                                Masuk ke Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-10 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-orange-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            >
                                Log in
                            </Link>
                        )}
                    </div>
                </div>

                <div className="z-10 mt-24 grid w-full max-w-4xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
                    <div className="rounded-xl border border-[#e3e3e0] bg-white/50 p-6 backdrop-blur-sm dark:border-[#3E3E3A] dark:bg-[#161615]/50">
                        <MapPin className="mb-3 h-6 w-6 text-orange-500" />
                        <h3 className="mb-1 font-medium">Tracking Terpusat</h3>
                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">Pantau lokasi dan ketersediaan kendaraan dari semua kantor.</p>
                    </div>
                    <div className="rounded-xl border border-[#e3e3e0] bg-white/50 p-6 backdrop-blur-sm dark:border-[#3E3E3A] dark:bg-[#161615]/50">
                        <ShieldCheck className="mb-3 h-6 w-6 text-orange-500" />
                        <h3 className="mb-1 font-medium">Persetujuan Berlapis</h3>
                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">Sistem multi-approval untuk memastikan validitas peminjaman.</p>
                    </div>
                    <div className="rounded-xl border border-[#e3e3e0] bg-white/50 p-6 backdrop-blur-sm dark:border-[#3E3E3A] dark:bg-[#161615]/50">
                        <CarFront className="mb-3 h-6 w-6 text-orange-500" />
                        <h3 className="mb-1 font-medium">Manajemen Armada</h3>
                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">Kelola data supir dan kendaraan secara efisien dan rapi.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
