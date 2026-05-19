import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const C = {
    primary: '#0f62fe',
    success: '#24a148',
    warning: '#f1c21b',
    danger: '#da1e28',
    purple: '#8a3ffc',
    teal: '#009d9a',
    bg: '#f4f4f4',
    surface: '#ffffff',
    border: '#e0e0e0',
    textPrimary: '#161616',
    textSecondary: '#525252',
    textMuted: '#8d8d8d',
};

const STATUS_LABELS: Record<string, string> = {
    available: 'Available',
    booked: 'Booked',
    inuse: 'In Use',
    service: 'Service',
};

const PIE_COLORS = [C.success, C.warning, C.primary, C.danger];

const fmt = (n: any) => Number(n ?? 0).toLocaleString('en-US');

function StatCard({ label, value, sub, color = C.primary }: { label: string; value: string | number; sub?: string; color?: string }) {
    return (
        <div
            style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderTop: `4px solid ${color}`,
                borderRadius: 2,
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
            }}
        >
            <span
                style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: C.textSecondary,
                    fontFamily: "'IBM Plex Mono', monospace",
                }}
            >
                {label}
            </span>
            <span
                style={{
                    fontSize: 32,
                    fontWeight: 300,
                    color: C.textPrimary,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    lineHeight: 1,
                }}
            >
                {value}
            </span>
            {sub && (
                <span
                    style={{
                        fontSize: 11,
                        color: C.textMuted,
                        fontFamily: "'IBM Plex Mono', monospace",
                    }}
                >
                    {sub}
                </span>
            )}
        </div>
    );
}

function ChartTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div
            style={{
                background: C.textPrimary,
                color: '#fff',
                padding: '8px 12px',
                borderRadius: 2,
                fontSize: 12,
                fontFamily: "'IBM Plex Mono', monospace",
            }}
        >
            <div style={{ color: payload[0].payload.fill ?? '#fff' }}>
                {payload[0].name}: {fmt(payload[0].value)}
            </div>
        </div>
    );
}

interface Summary {
    total_vehicles: number;
    available: number;
    in_use: number;
    booked: number;
    in_service: number;
    total_usages: number;
    total_fuel_used: number;
    total_distance: number;
}

interface StatusDistribution {
    labels: string[];
    data: number[];
}

interface ServiceAlert {
    id: number;
    vehicle_label: string;
    next_service_date: string;
    next_service_odometer: number;
    status: string;
}

export default function Dashboard({
    summary,
    statusDistribution,
    serviceAlerts,
}: {
    summary: Summary;
    statusDistribution: StatusDistribution;
    serviceAlerts: ServiceAlert[];
}) {
    if (!summary || !statusDistribution?.labels) {
        return (
            <AppLayout>
                <div style={{ padding: 40, color: C.textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13 }}>
                    Loading dashboard data...
                </div>
            </AppLayout>
        );
    }

    const statusData = statusDistribution.labels.map((s, i) => ({
        name: STATUS_LABELS[s] ?? s,
        value: statusDistribution.data[i],
    }));

    return (
        <>
            <Head title="Vehicle Dashboard" />

            <style>{`
                .dashboard-container {
                    padding: 32px 40px;
                }
                .stat-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 16px;
                    margin-bottom: 32px;
                }
                .content-grid {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 16px;
                }
                .table-responsive {
                    overflow-x: auto;
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .dashboard-container {
                        padding: 16px 20px;
                    }
                    .stat-grid {
                        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    }
                    .content-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <AppLayout>
                <div
                    className="dashboard-container"
                    style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        background: C.bg,
                        minHeight: '100vh',
                        color: C.textPrimary,
                    }}
                >
                    {/* Header */}
                    <div style={{ marginBottom: 32 }}>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 11,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: C.textMuted,
                                fontFamily: "'IBM Plex Mono', monospace",
                            }}
                        >
                            Fleet Management
                        </p>
                        <h1
                            style={{
                                margin: '4px 0 0',
                                fontSize: 28,
                                fontWeight: 300,
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Vehicle Usage Dashboard
                        </h1>
                    </div>

                    {/* Stat Cards */}
                    <div className="stat-grid">
                        <StatCard label="Total Vehicles" value={fmt(summary.total_vehicles)} color={C.primary} />
                        <StatCard label="Available" value={fmt(summary.available)} color={C.success} />
                        <StatCard label="In Use" value={fmt(summary.in_use)} color={C.primary} />
                        <StatCard label="Booked" value={fmt(summary.booked)} color={C.warning} />
                        <StatCard label="In Service" value={fmt(summary.in_service)} color={C.danger} />
                        <StatCard label="Total Trips" value={fmt(summary.total_usages)} color={C.teal} sub="all time" />
                        <StatCard label="Total Fuel" value={fmt(summary.total_fuel_used)} color={C.purple} sub="liters" />
                        <StatCard label="Total Distance" value={fmt(summary.total_distance)} color={C.teal} sub="kilometers" />
                    </div>

                    {/* Chart + Table */}
                    <div className="content-grid">
                        {/* Pie chart */}
                        <div
                            style={{
                                background: C.surface,
                                border: `1px solid ${C.border}`,
                                borderRadius: 2,
                                padding: 24,
                            }}
                        >
                            <p
                                style={{
                                    margin: '0 0 16px',
                                    fontSize: 11,
                                    fontWeight: 600,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    color: C.textSecondary,
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    borderBottom: `1px solid ${C.border}`,
                                    paddingBottom: 8,
                                }}
                            >
                                Vehicle Status
                            </p>
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                                        {statusData.map((_, i) => (
                                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<ChartTooltip />} />
                                    <Legend
                                        iconSize={8}
                                        wrapperStyle={{
                                            fontSize: 11,
                                            fontFamily: "'IBM Plex Mono', monospace",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Service alerts table */}
                        <div
                            style={{
                                background: C.surface,
                                border: `1px solid ${C.border}`,
                                borderRadius: 2,
                                padding: 24,
                            }}
                        >
                            <p
                                style={{
                                    margin: '0 0 16px',
                                    fontSize: 11,
                                    fontWeight: 600,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    color: C.textSecondary,
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    borderBottom: `1px solid ${C.border}`,
                                    paddingBottom: 8,
                                }}
                            >
                                Service Alerts
                            </p>

                            {serviceAlerts.length === 0 ? (
                                <p style={{ color: C.textMuted, fontSize: 13, margin: 0 }}>No upcoming service schedules.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 450 }}>
                                        <thead>
                                            <tr>
                                                {['Vehicle', 'Next Service Date', 'Odometer', 'Status'].map((h) => (
                                                    <th
                                                        key={h}
                                                        style={{
                                                            textAlign: 'left',
                                                            padding: '0 8px 10px 0',
                                                            fontFamily: "'IBM Plex Mono', monospace",
                                                            fontSize: 10,
                                                            letterSpacing: '0.08em',
                                                            textTransform: 'uppercase',
                                                            color: C.textMuted,
                                                            borderBottom: `1px solid ${C.border}`,
                                                        }}
                                                    >
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {serviceAlerts.map((s) => (
                                                <tr key={s.id}>
                                                    <td
                                                        style={{
                                                            padding: '10px 8px 10px 0',
                                                            borderBottom: `1px solid ${C.border}`,
                                                            fontWeight: 500,
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                    >
                                                        {s.vehicle_label}
                                                    </td>

                                                    <td
                                                        style={{
                                                            padding: '10px 8px 10px 0',
                                                            borderBottom: `1px solid ${C.border}`,
                                                            fontFamily: "'IBM Plex Mono', monospace",
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                    >
                                                        {s.next_service_date}
                                                    </td>

                                                    <td
                                                        style={{
                                                            padding: '10px 8px 10px 0',
                                                            borderBottom: `1px solid ${C.border}`,
                                                            fontFamily: "'IBM Plex Mono', monospace",
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                    >
                                                        {fmt(s.next_service_odometer)} km
                                                    </td>

                                                    <td
                                                        style={{
                                                            padding: '10px 0 10px 0',
                                                            borderBottom: `1px solid ${C.border}`,
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                display: 'inline-block',
                                                                padding: '2px 8px',
                                                                borderRadius: 2,
                                                                fontSize: 10,
                                                                fontFamily: "'IBM Plex Mono', monospace",
                                                                letterSpacing: '0.06em',
                                                                textTransform: 'uppercase',
                                                                background: s.status === 'service' ? '#fff1f1' : '#defbe6',
                                                                color: s.status === 'service' ? C.danger : C.success,
                                                                border: `1px solid ${s.status === 'service' ? '#ffd7d9' : '#a7f0ba'}`,
                                                            }}
                                                        >
                                                            {s.status === 'service' ? 'Service' : 'Completed'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
