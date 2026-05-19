import { Head, useForm } from '@inertiajs/react';
import { Car, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

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

                /* ── LOGO ── */
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

                /* ── HEADING ── */
                .heading {
                    font-size: clamp(1.6rem, 5vw, 2.2rem);
                    font-weight: 800;
                    text-align: center;
                    line-height: 1.2;
                    margin-bottom: 6px;
                }

                .heading-accent {
                    color: #E84C00;
                }

                .subtext {
                    font-size: 0.9rem;
                    color: #888;
                    text-align: center;
                    margin-bottom: 36px;
                }

                /* ── CARD ── */
                .card {
                    background: #fff;
                    border-radius: 16px;
                    padding: 32px;
                    width: 100%;
                    max-width: 420px;
                    border: 1px solid #ebebeb;
                }

                /* ── FIELDS ── */
                .field {
                    margin-bottom: 16px;
                }

                .field label {
                    display: block;
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: #444;
                    margin-bottom: 6px;
                }

                .field input[type="email"],
                .field input[type="password"] {
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

                .field input::placeholder {
                    color: #bbb;
                }

                .field-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 6px;
                }

                .forgot {
                    font-size: 0.78rem;
                    color: #E84C00;
                    text-decoration: none;
                    font-weight: 500;
                }

                .forgot:hover { text-decoration: underline; }

                .error {
                    font-size: 0.76rem;
                    color: #e53e3e;
                    margin-top: 4px;
                }

                /* ── REMEMBER ── */
                .remember {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 20px;
                    margin-top: 4px;
                }

                .remember input[type="checkbox"] {
                    width: 16px;
                    height: 16px;
                    accent-color: #E84C00;
                    cursor: pointer;
                }

                .remember label {
                    font-size: 0.85rem;
                    color: #555;
                    cursor: pointer;
                }

                /* ── BUTTON ── */
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
                    transition: background 0.18s, transform 0.15s;
                }

                .btn:hover:not(:disabled) { background: #cc4200; }
                .btn:active:not(:disabled) { transform: scale(0.99); }
                .btn:disabled { opacity: 0.6; cursor: not-allowed; }

                @keyframes spin { to { transform: rotate(360deg); } }
                .spin { animation: spin 0.7s linear infinite; }

                /* ── FOOTER ── */
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

                /* ── STATUS ── */
                .status {
                    background: #fff5f0;
                    border: 1px solid #ffd0b5;
                    border-radius: 8px;
                    padding: 10px 14px;
                    font-size: 0.85rem;
                    color: #c44000;
                    text-align: center;
                    margin-bottom: 16px;
                }
            `}</style>

            <div className="page">
                {/* Logo */}
                <div className="logo-wrap">
                    <Car size={32} color="#E84C00" />
                </div>

                {/* Heading */}
                <h1 className="heading">
                    Sistem Manajemen
                    <br />
                    <span className="heading-accent">PT. Sekawan Media</span>
                </h1>
                <p className="subtext">Masuk untuk mengakses sistem booking kendaraan</p>

                {/* Card */}
                <div className="card">
                    {status && <div className="status">{status}</div>}

                    <form onSubmit={submit}>
                        {/* Email */}
                        <div className="field">
                            <label htmlFor="email">Alamat Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@perusahaan.com"
                            />
                            {errors.email && <div className="error">{errors.email}</div>}
                        </div>

                        {/* Password */}
                        <div className="field">
                            <div className="field-row">
                                <label htmlFor="password">Password</label>
                                {canResetPassword && (
                                    <a href={route('password.request')} className="forgot" tabIndex={5}>
                                        Lupa password?
                                    </a>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            {errors.password && <div className="error">{errors.password}</div>}
                        </div>

                        {/* Remember */}
                        <div className="remember">
                            <input
                                type="checkbox"
                                id="remember"
                                tabIndex={3}
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="remember">Ingat saya</label>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="btn" tabIndex={4} disabled={processing}>
                            {processing ? <LoaderCircle size={18} className="spin" /> : 'Log in'}
                        </button>
                    </form>

                    <div className="footer">
                        Belum punya akun?{' '}
                        <a href={route('register')} tabIndex={6}>
                            Daftar sekarang
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
