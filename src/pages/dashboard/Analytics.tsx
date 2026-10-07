import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { analyticsData, orUtilizationTrend } from "@/data/mockData";

const card = "dashboard-card";
const COLORS = ["#0f766e", "#14b8a6", "#f59e0b", "#ef4444"];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Surgical Analytics</h1>
        <p className="text-sm text-muted-foreground">Deep analytics with case duration, utilization, outcome trends and surgeon benchmarking</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Cases (YTD)", value: "1,896" },
          { label: "Avg. OR Utilization", value: "87.3%" },
          { label: "Avg. Case Duration", value: "142 min" },
          { label: "Complication Rate", value: "1.8%" },
        ].map(s => (
          <div key={s.label} className={card}>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Case Duration Trends by Specialty (Monthly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.caseDurationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" unit=" min" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="orthopedic" stroke="#0f766e" strokeWidth={2} dot={false} name="Orthopedic" />
              <Line type="monotone" dataKey="cardiac" stroke="#ef4444" strokeWidth={2} dot={false} name="Cardiac" />
              <Line type="monotone" dataKey="general" stroke="#14b8a6" strokeWidth={2} dot={false} name="General" />
              <Line type="monotone" dataKey="neuro" stroke="#f59e0b" strokeWidth={2} dot={false} name="Neuro" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            {[{ n: "Orthopedic", c: "#0f766e" }, { n: "Cardiac", c: "#ef4444" }, { n: "General", c: "#14b8a6" }, { n: "Neuro", c: "#f59e0b" }].map(l => (
              <span key={l.n} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.c }} /> {l.n}
              </span>
            ))}
          </div>
        </div>

        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Surgical Outcome Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={analyticsData.outcomeDistribution} dataKey="count" nameKey="outcome" cx="50%" cy="50%" outerRadius={110} innerRadius={65} paddingAngle={2}>
                {analyticsData.outcomeDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {analyticsData.outcomeDistribution.map((o, i) => (
              <span key={o.outcome} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} /> {o.outcome} ({o.count})
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={card}>
        <h3 className="text-base font-semibold text-foreground mb-4">OR Utilization — Last 30 Days</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={orUtilizationTrend.slice(0, 15)}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" unit="%" />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="utilization" fill="hsl(173, 78%, 26%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={card}>
        <h3 className="text-base font-semibold text-foreground mb-4">Surgeon Benchmarking</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {["Rank", "Surgeon", "Specialty", "Cases/Month", "Success Rate", "Avg Duration", "Complications", "Satisfaction"].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {analyticsData.surgeonBenchmark.map((s, i) => (
                <tr key={s.name} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-3"><span className="w-6 h-6 rounded-full bg-primary/10 inline-flex items-center justify-center text-xs font-bold text-primary">#{i + 1}</span></td>
                  <td className="py-3 px-3 font-medium text-foreground">{s.name}</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.specialty}</td>
                  <td className="py-3 px-3 font-semibold text-foreground">{s.casesThisMonth}</td>
                  <td className="py-3 px-3 text-success font-semibold">{s.successRate}%</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.avgDuration}</td>
                  <td className="py-3 px-3">{s.complications}</td>
                  <td className="py-3 px-3"><span className="text-warning">★</span> {s.patientSatisfaction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Key Insights</h3>
          <div className="space-y-3">
            {[
              { insight: "OR-3 utilization dropped 12% this week — consider reallocating cardiac cases", type: "warning" },
              { insight: "Dr. Chen's average case duration improved by 8 minutes vs. last quarter", type: "success" },
              { insight: "Complication rate for spinal procedures is trending upward — review protocols", type: "warning" },
              { insight: "Overall patient satisfaction score: 4.8/5.0 — above national benchmark", type: "success" },
            ].map((i, idx) => (
              <div key={idx} className={`p-3 rounded-lg border ${i.type === "warning" ? "border-warning/30 bg-warning/5" : "border-success/30 bg-success/5"}`}>
                <p className="text-sm text-foreground">{i.insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Monthly Trend Summary</h3>
          <div className="space-y-4">
            {[
              { metric: "Total Cases", current: 156, previous: 142, unit: "" },
              { metric: "OR Utilization", current: 87.3, previous: 82.1, unit: "%" },
              { metric: "Avg. Turnover Time", current: 28, previous: 34, unit: " min" },
              { metric: "Patient Satisfaction", current: 4.8, previous: 4.6, unit: "/5" },
            ].map(m => {
              const change = ((m.current - m.previous) / m.previous * 100).toFixed(1);
              const isPositive = m.metric === "Avg. Turnover Time" ? m.current < m.previous : m.current > m.previous;
              return (
                <div key={m.metric} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.metric}</p>
                    <p className="text-xs text-muted-foreground">vs. last month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold font-heading text-foreground">{m.current}{m.unit}</p>
                    <p className={`text-xs font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
                      {isPositive ? "↑" : "↓"} {Math.abs(Number(change))}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
