import { Head, useForm } from '@inertiajs/react';
import { Car, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface RegisterForm {
    name: string;
    email: string;
    role: string;
    password: string;
    password_confirmation: string;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        role: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                .page {
                    min-height: 100vh;
                    background: #f9f9f7;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    color: #1a1a1a;
                }

                .logo-wrap {
                    width: 72px;
                    height: 72px;
                    background: #fff3ee;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 24px;
                }

                .heading {
                    font-size: clamp(1.4rem, 5vw, 2rem);
                    font-weight: 800;
                    text-align: center;
                    line-height: 1.2;
                    margin-bottom: 6px;
                }

                .heading-accent { color: #E84C00; }

                .subtext {
                    font-size: 0.9rem;
                    color: #888;
                    text-align: center;
                    margin-bottom: 28px;
                }

                .card {
                    background: #fff;
                    border-radius: 16px;
                    padding: 32px;
                    width: 100%;
                    max-width: 440px;
                    border: 1px solid #ebebeb;
                }

                .row-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .field { margin-bottom: 14px; }

                .field label {
                    display: block;
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: #444;
                    margin-bottom: 6px;
                }

                .field input {
                    width: 100%;
                    padding: 11px 14px;
                    border: 1.5px solid #e5e5e5;
                    border-radius: 10px;
                    font-size: 0.93rem;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    color: #1a1a1a;
                    background: #fafafa;
                    outline: none;
                    transition: border-color 0.18s;
                }

                .field input:focus {
                    border-color: #E84C00;
                    background: #fff;
                }

                .field input::placeholder { color: #bbb; }
                .field input:disabled { opacity: 0.6; cursor: not-allowed; }

                .error {
                    font-size: 0.76rem;
                    color: #e53e3e;
                    margin-top: 4px;
                }

                .divider {
                    height: 1px;
                    background: #f0f0f0;
                    margin: 4px 0 16px;
                }

                .section-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: #bbb;
                    margin-bottom: 12px;
                }

                .btn {
                    width: 100%;
                    padding: 13px;
                    background: #E84C00;
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 6px;
                    transition: background 0.18s, transform 0.15s;
                }

                .btn:hover:not(:disabled) { background: #cc4200; }
                .btn:active:not(:disabled) { transform: scale(0.99); }
                .btn:disabled { opacity: 0.6; cursor: not-allowed; }

                @keyframes spin { to { transform: rotate(360deg); } }
                .spin { animation: spin 0.7s linear infinite; }

                .footer {
                    margin-top: 20px;
                    font-size: 0.85rem;
                    color: #888;
                    text-align: center;
                }

                .footer a {
                    color: #E84C00;
                    font-weight: 600;
                    text-decoration: none;
                }

                .footer a:hover { text-decoration: underline; }

                @media (max-width: 480px) {
                    .row-2 { grid-template-columns: 1fr; }
                    .card { padding: 24px 20px; }
                }
            `}</style>

            <div className="page">
                <div className="logo-wrap">
                    <Car size={32} color="#E84C00" />
                </div>

                <h1 className="heading">
                    Daftar Akun
                    <br />
                    <span className="heading-accent">PT. Sekawan Media</span>
                </h1>
                <p className="subtext">Isi data di bawah untuk membuat akun baru</p>

                <div className="card">
                    <form onSubmit={submit}>
                        {/* Informasi Akun */}
                        <div className="section-label">Informasi Akun</div>

                        <div className="row-2">
                            <div className="field">
                                <label htmlFor="name">Nama Lengkap</label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Nama lengkap"
                                />
                                {errors.name && <div className="error">{errors.name}</div>}
                            </div>

                            <div className="field">
                                <label htmlFor="role">Role / Jabatan</label>
                                <input
                                    id="role"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    disabled={processing}
                                    placeholder="Contoh: Staff"
                                />
                                {errors.role && <div className="error">{errors.role}</div>}
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="email">Alamat Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                tabIndex={3}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@perusahaan.com"
                            />
                            {errors.email && <div className="error">{errors.email}</div>}
                        </div>

                        <div className="divider" />

                        {/* Password */}
                        <div className="section-label">Keamanan</div>

                        <div className="row-2">
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder="••••••••"
                                />
                                {errors.password && <div className="error">{errors.password}</div>}
                            </div>

                            <div className="field">
                                <label htmlFor="password_confirmation">Konfirmasi Password</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="••••••••"
                                />
                                {errors.password_confirmation && <div className="error">{errors.password_confirmation}</div>}
                            </div>
                        </div>

                        <button type="submit" className="btn" tabIndex={6} disabled={processing}>
                            {processing ? <LoaderCircle size={18} className="spin" /> : 'Buat Akun'}
                        </button>
                    </form>

                    <div className="footer">
                        Sudah punya akun?{' '}
                        <a href={route('login')} tabIndex={7}>
                            Masuk di sini
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
