import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { dashboardService } from "../services/dashboardService";
import "../styles/global.css";

const COLORS = ["#00ff9f", "#00cc7d", "#009f5f", "#007346", "#004d2f"];

const StyledCard = ({ children }) => (
  <div style={{
    background: "rgba(26, 26, 26, 0.9)",
    border: "1px solid #00ff9f",
    padding: "24px",
    borderRadius: "4px",
    height: "100%",
    boxShadow: "0 0 20px rgba(0, 255, 159, 0.1)",
  }}>
    {children}
  </div>
);

const StatValue = ({ children }) => (
  <Typography
    variant="h3"
    sx={{
      color: "#00ff9f",
      fontFamily: "'Share Tech Mono', monospace",
      textShadow: "0 0 10px #00ff9f",
    }}
  >
    {children}
  </Typography>
);

export function Dashboard() {
  const [data, setData] = useState({
    totalCustomers: 0,
    newCustomers: 0,
    totalDomains: 0,
    customerGrowth: [],
    domainStats: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getDashboardData();

      // Formata os dados para o gráfico de crescimento mensal
      const customerGrowth = response.customersByMonth?.map(item => ({
        month: item.month || item.date, // verifica os dois possíveis nomes
        total: parseInt(item.total || item.count || 0)
      })) || [];

      // Formata os dados para o gráfico de domínios
      const domainStats = response.topDomains?.map(item => ({
        domain: item.domain,
        count: parseInt(item.total || 0)
      })) || [];

      setData({
        totalCustomers: response.totalCustomers || 0,
        newCustomers: response.newCustomers || 0,
        totalDomains: response.topDomains?.length || 0,
        customerGrowth,
        domainStats
      });

      console.log("Formatted data:", {
        customerGrowth,
        domainStats
      });
    } catch (err) {
      console.error("Error loading dashboard:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="cyber-container internal">
        <div className="cyber-box" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress sx={{ color: "#00ff9f" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="cyber-container internal">
      <div className="cyber-box" style={{ maxWidth: "1200px" }}>
        <h1 className="cyber-title" style={{ margin: 0 }}>{`>`} SYSTEM DASHBOARD_</h1>
        
        <Box sx={{ padding: "20px" }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              color: "#00ff9f", 
              textShadow: "0 0 10px #00ff9f",
              marginBottom: "40px",
              fontFamily: "'Share Tech Mono', monospace",
            }}
          >
            {`>`} SYSTEM STATUS_
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#b3b3b3" }}>
                  TOTAL CUSTOMERS
                </Typography>
                <StatValue>{data?.totalCustomers || 0}</StatValue>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#b3b3b3" }}>
                  NEW CUSTOMERS (30d)
                </Typography>
                <StatValue>{data?.newCustomers || 0}</StatValue>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#b3b3b3" }}>
                  ACTIVE DOMAINS
                </Typography>
                <StatValue>{data?.totalDomains || 0}</StatValue>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={8}>
              <StyledCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#b3b3b3" }}>
                  CUSTOMER GROWTH
                </Typography>
                <Box sx={{ height: 300, width: '100%', padding: "20px" }}>
                  <ResponsiveContainer>
                    <LineChart data={data.customerGrowth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 159, 0.1)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#00ff9f"
                        tick={{ fill: '#00ff9f' }}
                      />
                      <YAxis 
                        stroke="#00ff9f"
                        tick={{ fill: '#00ff9f' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(26, 26, 26, 0.9)',
                          border: '1px solid #00ff9f',
                          color: '#00ff9f'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#00ff9f" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#b3b3b3" }}>
                  EMAIL DOMAINS
                </Typography>
                <Box sx={{ height: 300, width: '100%', padding: "20px" }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={data.domainStats}
                        dataKey="count"
                        nameKey="domain"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#00ff9f"
                      >
                        {data.domainStats.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(26, 26, 26, 0.9)',
                          border: '1px solid #00ff9f',
                          color: '#00ff9f'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </StyledCard>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
} 